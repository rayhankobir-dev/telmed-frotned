import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { IoIosSad } from "react-icons/io";
import { Button } from "@/components/ui/button";

export default function PaymentCanceled() {
  return (
    <section className="max-w-7xl flex items-center justify-center px-6 lg:px-0 py-12 mx-auto">
      <Card className="max-w-sm w-full px-3 text-2xl font-semibold border-dashed lg:border-none shadow-none">
        <CardHeader>
          <div className="w-24 h-24 flex justify-center items-center bg-primary/10 rounded-full mx-auto">
            <IoIosSad size={80} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent className="pt-3 px-2">
          <div className="max-w-sm mx-auto">
            <CardTitle className="text-center text-2xl font-medium">
              You&apos;re Canceled the Payment
            </CardTitle>
            <p className="text-center text-sm font-medium py-1.5">
              To order your medicine please try again
            </p>
            <p className="mt-4 font-light text-sm text-center lg:text-left">
              Please try again to order medicine. If you faced any problem with
              that please go to support (162554).
            </p>
          </div>
        </CardContent>
        <CardFooter className="px-2 mt-4">
          <Button
            variant="outline"
            asChild
            className="w-full md:w-fit px-12 py-2.5 text-primary border-primary hover:bg-primary-500 hover:text-white mx-auto"
          >
            <Link href="/">Go home</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
