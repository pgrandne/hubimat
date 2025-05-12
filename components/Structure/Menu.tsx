import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutPanelLeft, MonitorPlay, PieChart } from "lucide-react";
import { CalendarButton } from "./components/Calendar";
import { Datetime } from "./components/Datetime";
import { ProfileDropdown } from "./components/ProfileDropdown";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Menu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="h-full background-menu z-50">
      <div className="h-1/2 flex flex-col p-5 justify-start items-center">
        <ProfileDropdown />
        <p className="text-center text-xs">Hi Mathieu</p>
        <div className="flex flex-col items-center gap-6 mt-10">
          <Link href="/">
            <Button
              className={cn(
                "border-0 hover:bg-transparent",
                isActive("/") ? "bg-selectedMenu" : "bg-transparent"
              )}
              variant="outline"
            >
              <LayoutPanelLeft
                color="white"
                className="opacity-50 hover:opacity-100"
              />
            </Button>
          </Link>
          <Link href="/">
            <Button
              className={cn(
                "border-0 hover:bg-transparent",
                isActive("/video") ? "bg-selectedMenu" : "bg-transparent"
              )}
              variant="outline"
            >
              <MonitorPlay
                color="white"
                className="opacity-50 hover:opacity-100"
              />
            </Button>
          </Link>

          <Link href="/">
            <Button
              className={cn(
                "border-0 hover:bg-transparent",
                isActive("/dashboard") ? "bg-selectedMenu" : "bg-transparent"
              )}
              variant="outline"
            >
              <PieChart
                color="white"
                className="opacity-50 hover:opacity-100"
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className="h-1/2 flex flex-col justify-end items-center p-5 gap-5">
        <CalendarButton />
        <Datetime />
        <Image
          src="hubiquiti/black_logo_H_white.svg"
          alt="Hubiquiti"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};
