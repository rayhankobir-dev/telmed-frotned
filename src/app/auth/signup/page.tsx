import Image from "next/image";
import SignupForm from "./signup-form";

function Singup() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="hidden w-full h-full lg:flex flex-col justify-center">
        <Image
          className="mx-auto"
          src="/vectors/checkout.svg"
          alt="login"
          width={500}
          height={500}
        />
        <div className="flex flex-col items-center gap-2.5">
          <h1 className="font-bold text-2xl text-center">
            Quick & Easy Ordering Process
          </h1>
          <p className="font-light text-sm text-center">
            Now you can order your medicine from Medinfo. We provide all the
            medicines you need.
          </p>
        </div>
      </div>
      <SignupForm />;
    </main>
  );
}

export default Singup;
