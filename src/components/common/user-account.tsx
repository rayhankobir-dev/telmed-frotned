"use client";
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
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAccount() {
  const { user, logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex items-center gap-2 py-1 px-1.5 md:py-1 md:px-1.5 hover:bg-primary/10 border hover:border-primary/30 rounded-xl duration-200">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-primary/20 text-primary">
              {user?.firstName?.charAt(0) || "U"}
            </AvatarFallback>
            <AvatarImage src={user?.image} />
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
              <Link href="/dashboard/profile">Dashboard</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={logout}>Logout</button>
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
              <Link href="/signup">Sign up</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default UserAccount;
