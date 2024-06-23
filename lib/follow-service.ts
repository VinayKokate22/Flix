import { db } from "./db";
import { getSelf } from "./auth-service";

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();
    const followedUser = db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });
    return followedUser;
  } catch (error) {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("user Not found");
    }
    if (otherUser.id === self.id) {
      return true;
    }
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  if (existingFollow) {
    throw new Error("Already following");
  }
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
};
export const unfollowUser = async (id: string) => {
  const self = await getSelf();
  const ohterUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!ohterUser) {
    throw new Error("User Not Found");
  }
  if (ohterUser.id === self.id) {
    throw new Error("Cannot unfollow Yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: ohterUser.id,
    },
  });
  if (!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });
  return follow;
};
