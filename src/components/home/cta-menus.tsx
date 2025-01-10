import Image from "next/image";
import { cn } from "@/lib/utils";
import Doctor from "@/assets/icons/doctor.png";
import Prescription from "@/assets/icons/prescription.png";
import HealthResport from "@/assets/icons/health-report.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ctaMenus = [
  {
    title: "Upload Prescriptions",
    icon: Prescription,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    bgColor: "bg-green-700/10",
    onClick: () => alert("Uploading prescriptions..."),
  },
  {
    title: "Health Report",
    icon: HealthResport,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    bgColor: "bg-orange-700/10",
    url: "/health-report",
  },
  {
    title: "Book Appointment",
    icon: Doctor,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    bgColor: "bg-primary/10",
    onClick: () => console.log("Booking appointment..."),
  },
  {
    title: "Get Help",
    icon: Doctor,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    bgColor: "bg-purple-700/10",
    url: "/help",
  },
];

function CtaMenuSection() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3 mt-5">
      {ctaMenus.map((menu, index) => (
        <CtaMenuCard key={index} {...menu} />
      ))}
    </section>
  );
}

function CtaMenuCard({
  title,
  description,
  icon,
  bgColor,
  onClick,
  url,
}: {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  onClick?: () => void;
  url?: string;
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (url) {
      navigate(url);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      onClick={handleAction}
      className={cn(
        "flex flex-col justify-between cursor-pointer hover:shadow-md border border-primary/10",
        bgColor
      )}
    >
      <CardHeader className="p-2.5 pt-4">
        <Image className="w-9 h-auto mx-auto" src={icon} alt={title} />
      </CardHeader>
      <CardContent className="p-2.5 text-center">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="font-light text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

export default CtaMenuSection;
