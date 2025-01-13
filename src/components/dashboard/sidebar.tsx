"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingCart,
  Calendar,
  Settings,
  HelpCircle,
  PersonStanding,
  Book,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const doctorItems = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "My Paitents", href: "/dashboard/paitents", icon: PersonStanding },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Prescriptions", href: "/dashboard/prescriptions", icon: Book },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
];

const userItems = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Prescriptions", href: "/dashboard/prescriptions", icon: Book },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = user?.role == "DOCTOR" ? doctorItems : userItems;

  return (
    <nav className="w-64 shadow-md border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p>Your dashboard navigation goes here.</p>
      </div>
      <ul className="space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg p-2 hover:bg-primary/20 ${
                  isActive ? "bg-primary/20 font-semibold" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
