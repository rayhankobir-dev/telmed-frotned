import Link from "next/link";
import CartBag from "../common/cart-bag";
import { AppLogoIcon } from "@/assets/icons";
import UserAccount from "../common/user-account";
import SearchInput from "../common/search-input";
import { ChevronDown, MapPin } from "lucide-react";

function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 py-1.5 bg-white border-b ">
      <nav className="container flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 mx-auto">
        <div className="w-full md:w-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AppLogoIcon />
            <span className="hidden md:block lg:hidden xl:block font-bold text-2xl text-primary">
              MedInfo
            </span>
          </Link>

          <div className="md:hidden flex items-center gap-2">
            <UserAccount />
            <CartBag />
          </div>
        </div>

        <button className="max-w-xs h-12 hidden lg:flex items-center gap-1.5 px-2.5 font-medium text-sm xl:text-base text-nowrap hover:bg-primary/10 border border-transparent hover:border-primary/20 rounded-xl duration-200">
          <MapPin size={20} /> Delivery to Choose Location
          <ChevronDown size={20} />
        </button>

        <SearchInput />

        <div className="hidden md:flex items-center gap-3.5">
          <CartBag />
          <UserAccount />
        </div>
      </nav>
    </header>
  );
}

export default Header;
