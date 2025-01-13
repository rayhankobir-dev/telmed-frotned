import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  return (
    <section className="max-w-7xl flex items-center justify-center px-6 lg:px-0 py-12 mx-auto">
      <Card className="max-w-xl w-full px-3 text-2xl font-semibold border-dashed lg:border-none shadow-none">
        <CardHeader>
          <Image
            src="/images/images.png"
            className="max-w-sm mx-auto"
            alt=""
            width={290}
            height={290}
            priority={true}
          />
        </CardHeader>
        <CardContent className="pt-3 px-2">
          <div className="max-w-sm mx-auto">
            <CardTitle className="text-center text-2xl font-medium">
              Order Successfully Placed, Thank you
            </CardTitle>
            <p className="text-center text-sm font-medium py-1.5">
              Payment was successfullly done.
            </p>
            <p className="mt-4 font-light text-sm text-center lg:text-left">
              Your orders you&apos;ll found in your profile
              <Link href="/orders" className="px-2 font-semibold text-primary">
                Orders
              </Link>
              . If you need customer support please go to support center
              (162554).
            </p>
          </div>
        </CardContent>
        <CardFooter className="px-2 mt-4">
          <Button
            variant="outline"
            asChild
            className="w-full md:w-fit lg:px-10 py-3 text-primary border-primary hover:bg-primary hover:text-white mx-auto"
          >
            <Link href="/">Go home</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
