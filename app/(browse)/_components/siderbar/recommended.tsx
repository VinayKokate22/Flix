"use client";
import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./UserItem";

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showlabel = !collapsed && data.length > 0;
  return (
    <div>
      {showlabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommened</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => {
          return (
            <>
              <UserItem
                key={user.id}
                username={user.username}
                imageUrl={user.imageUrl}
                isLive={user.stream?.isLive}
              />
            </>
          );
        })}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => {
        return <UserItemSkeleton key={i} />;
      })}
    </ul>
  );
};
