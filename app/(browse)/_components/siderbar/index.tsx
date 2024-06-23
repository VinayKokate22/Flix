import { getRecommended } from "@/lib/recommended-service";
import { Toggle, ToggleSkeleton } from "./Toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Wrapper } from "./wrapper";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SiderbarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] x-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
