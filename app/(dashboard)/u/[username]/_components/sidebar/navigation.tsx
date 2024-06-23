"use client";

import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { Fullscreen, Key, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: Key,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];
  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => {
          return <NavItemSkeleton key={i} />;
        })}
      </ul>
    );
  }
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => {
        return (
          <NavItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathname === route.href}
          />
        );
      })}
    </ul>
  );
};
