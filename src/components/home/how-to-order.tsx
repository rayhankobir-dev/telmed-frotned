import Image from "next/image";
import { Play } from "lucide-react";

export default function HowToOderder() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-5 mt-5 p-6 md:p-10 bg-primary/10 rounded-2xl">
      <div className="">
        <h1 className="font-semibold text-4xl">কিভাবে ঔষধ অর্ডার করবেন?</h1>

        <div className="px-2.5 mt-6">
          <ol className="relative grid border-s border-dashed border-primary text-md font-medium">
            <li className="ms-6 order-first">
              <div className="absolute bg-primary rounded-full w-5 h-5 -start-2.5"></div>
              <h4>প্রেসক্রিপশন ছবি আপলোড করুন অথবা ঔষধ সার্চ করে কিনুন।</h4>
            </li>
            <li className="ms-6 mt-4">
              <div className="absolute w-4 h-4 bg-primary rounded-full -start-2"></div>
              <h4>
                আমাদের ফার্মাসিস্ট আপনার প্রদানকৃত প্রেসক্রিপশন ভেরিফাইড করে
                আপনাকে ফোন করে অর্ডার কনফার্ম করবেন।
              </h4>
            </li>
            <li className="ms-6 mt-4 order-last">
              <div className="absolute bg-primary rounded-full w-5 h-5 -start-2.5"></div>
              <h4>১২-২৪ ঘন্টার মধ্য আপনার ডেলিভারি বুঝে নিন।</h4>
            </li>
          </ol>
        </div>
      </div>

      <div className="flex justify-end items-center">
        <div className="relative max-w-sm rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-700/60"></div>
          <img
            className="w-full h-full object-cover object-top"
            src="/images/demo.png"
            alt="Medify"
            width={1920}
            height={1080}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-20 h-20 rounded-full bg-primary/50 animate-ping duration-700"></span>
              <span className="absolute w-24 h-24 rounded-full bg-primary/60 animate- duration-700"></span>
              <button className="relative z-10 cursor-pointer w-16 h-16 flex items-center justify-center bg-primary text-white rounded-full">
                <Play size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
