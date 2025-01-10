import { Fragment } from "react";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header />
      <div className="pt-[7rem] md:pt-[4.5rem] lg:pt-16 w-full h-fit flex flex-col">
        <main className="container w-full flex flex-1 gap-4 mx-auto py-2.5">
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
}

export default RootLayout;
