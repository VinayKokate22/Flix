import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src="/spooky.svg" alt="Flix" height="80" width="80" />
      </div>
      <div className="flex flex-col items-center">
        <p className={cn("text-xl font-semibold", font.className)}>Flix</p>
        <p className="text-sm text-muted-foreground">Let&apos;s go</p>
      </div>
    </div>
  );
};
