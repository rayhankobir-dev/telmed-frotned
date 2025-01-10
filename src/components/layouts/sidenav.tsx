import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const links = [
  {
    label: "Medicines",
    icon: "/icons/medicines.png",
    to: "/medicines",
  },
  {
    label: "Doctors",
    icon: "/icons/doctor.png",
    to: "/doctors",
  },
];

function SideNav() {
  return (
    <aside className="h-[80vh] w-full sticky top-[4.5rem] flex flex-col justify-between rounded-2xl bg-primary-foreground border border-primary/20 shadow-sm overflow-hidden">
      <div className="flex flex-col">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.to}
            className="flex items-center gap-3 py-2.5 px-3 text-md bg-primary/5 hover:bg-primary/10 border-b border-primary/20 font-medium text-lg"
          >
            <Image
              className="h-10 w-10 rounded-full"
              src={link.icon}
              alt={link.label}
              width={30}
              height={30}
            />
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-2 bg-primary-foreground p-5">
        <Image
          className="max-w-[150px] mx-auto"
          src="/vectors/doctor.svg"
          alt="Vector"
          width={150}
          height={150}
        />
        <h1 className="font-medium text-lg">Free Consultation</h1>
        <p className="font-medium light text-sm text-center opacity-70">
          Take free Consultation with our doctors for free firt time.
        </p>

        <Link href="/doctors">
          <Button>Appoinment</Button>
        </Link>
      </div>
    </aside>
  );
}

export default SideNav;
