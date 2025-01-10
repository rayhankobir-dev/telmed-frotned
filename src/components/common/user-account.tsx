"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";

function UserAccount() {
  const { user } = useUser();

  const handleClick = () => {
    if (!user) {
      redirect("/login");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          onClick={handleClick}
          className="flex items-center gap-2 py-1 px-1.5 md:py-1 md:px-1.5 hover:bg-primary/10 border hover:border-primary/30 rounded-xl duration-200"
        >
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-primary/20 text-primary">
              {user?.firstName?.charAt(0) || "U"}
            </AvatarFallback>
            <AvatarImage src={user?.imageUrl} />
          </Avatar>

          <div className="flex flex-col items-start text-xs md:text-sm text-nowrap">
            <p className="tracking-tighter">Hi, {user?.firstName ?? "User"}</p>
            <p className="font-medium tracking-tighter">Accounts & Orders</p>
          </div>
        </button>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent className="w-56 z-[100]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing">Prescriptions</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/appointments">Appointments</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/security">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton component="button" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}

      {!user && (
        <DropdownMenuContent className="w-56 z-[100]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">Sign up</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default UserAccount;
