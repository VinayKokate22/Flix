import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const loggedInUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream || loggedInUser?.id !== user.externalUserId) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
};

export default CreatorPage;

// import { StreamPlayer } from "@/components/stream-player";
// import { getUserByUsername } from "@/lib/user-service";
// import { currentUser } from "@clerk/nextjs/server";

// interface CreatorPageProps {
//   params: {
//     username: string;
//   };
// }

// const CreaterPage = async ({ params }: CreatorPageProps) => {
//   const externalUser = await currentUser();
//   const user = await getUserByUsername(params.username);

//   if (!user || user.externalUserId !== externalUser?.id || !user.stream)
//     return (
//       <div className="h-full">
//         <StreamPlayer user={user} stream={user?.stream} isFollowing={true} />
//       </div>
//     );
// };
// export default CreaterPage;
