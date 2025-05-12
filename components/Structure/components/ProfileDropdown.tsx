import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { useState } from "react";

export const ProfileDropdown = () => (
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="/avatar.jpeg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
        <DropdownMenuItem>Modifier le Mot de Passe</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="my-auto w-[350px] p-0"></DialogContent>
    </Dialog>
  </div>
);
