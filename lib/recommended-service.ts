import { db } from "@/lib/db";
import { getSelf } from "./auth-service";
import { log } from "console";
export const getRecommended = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  let userId;
  try {
    console.log("helloooooo");
    const self = await getSelf();
    console.log("self is  ", self.id);
    userId = self.id;
  } catch {
    userId = null;
  }
  console.log("userid is", userId);
  let users = [];
  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};
