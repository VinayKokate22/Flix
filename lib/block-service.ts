import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("User not Found");
    }
    if (otherUser.id === self.id) {
      return false;
    }
    const exisitingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });
    return !!exisitingBlock;
  } catch (error) {
    return false;
  }
};
export const blockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot block youself");
  }
  const otherUser = await db.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error("user Not Found");
  }
  const exisitingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (exisitingBlock) {
    throw new Error("Already Blocked");
  }
  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
};
export const unblockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot unblock Yourself");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error("user not found");
  }
  const exisitingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (!exisitingBlock) {
    throw new Error("Not blocked");
  }
  const unblock = await db.block.delete({
    where: {
      id: exisitingBlock.id,
    },
    include: {
      blocked: true,
    },
  });
  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blockedUsers;
};
