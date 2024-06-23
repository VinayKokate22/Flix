// import { currentUser } from "@clerk/nextjs/server";
// "use-clinet";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getSelf = async () => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });
  console.log("inside auth-service ", self);

  if (!user) {
    throw new Error("Not Found");
  }
  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }
  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }
  return user;
};
