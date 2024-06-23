import { WifiOff } from "lucide-react";

interface OffineVideoProps {
  username: string;
}
export const OffineVideo = ({ username }: OffineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offine</p>
    </div>
  );
};
