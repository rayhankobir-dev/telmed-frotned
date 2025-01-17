import Link from "next/link";
import {
  ShoppingCart,
  Calendar,
  Users,
  UserIcon as UserMd,
  Pill,
  User,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { name: "Appointments", icon: Calendar, href: "/admin/appointments" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Doctors", icon: UserMd, href: "/admin/doctors" },
  { name: "Medicines", icon: Pill, href: "/admin/medicines" },
  { name: "Profile", icon: User, href: "/admin/profile" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <nav className="flex-grow">
        <ul className="flex flex-col py-1.5">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-6 py-3 text-gray-700 hover:bg-primary/20",
                  pathname === item.href && "bg-primary/20"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
