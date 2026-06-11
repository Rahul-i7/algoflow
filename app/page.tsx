"use client"
import Link from "next/link";
import { motion } from "motion/react";
import { Circle } from "lucide-react";

export default function Home() {

  const array = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="mt-10 mb-8 text-primary text-sm bg-primary/10 border border-border-primary px-4 py-2 rounded-full">V1.0 Live Now</p>
      <h1 className="text-6xl font-bold text-center">Visualize the Logic Behind <br /> Every Sort</h1>
      <h1 className="mt-7 text-md text-center text-text-secondary">Experience algorithms in motion. A high-precision playground for <br /> understanding complexity, data structures, and the beauty of sorted array</h1>

      <div className="flex mt-10 justify-center items-center gap-5">
        <Link href="/sorting" className="w-50 cursor-pointer mt-5 text-center inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium">Start Visualizing</Link>
        <Link href="https://github.com/rahul-i7" className="w-50 cursor-pointer mt-5 text-center inline-block px-6 py-3 bg-text-primary border-none text-bg-primary rounded-lg font-medium">Code</Link>
      </div>

      <div className="relative flex justify-center pb-10 items-end gap-2 mt-20 mb-500 border border-border-primary px-6 py-3 w-[65vw] h-96 mx-auto rounded-2xl">
        {array.map((num, index) => (
          <motion.span
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: `${3 * num}px` }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, type: "spring" }}
            className={`w-10 rounded-lg`}
            style={{ background: "linear-gradient(to bottom, var(--primary), var(--primary-muted))" }}
            key={index}
          />
        ))}
        <div className="flex absolute bottom-1">
          <div className="flex items-center px-3 py-2 gap-2 bg-white rounded-full">
            <Circle strokeWidth={0} fill="var(--primary)" size={15}/>
            <p className="text-text-primary text-sm font-medium">Comparisons: 121</p>

          </div>
          <div className="flex items-center px-3 py-2 gap-2 bg-white rounded-full">
            <Circle strokeWidth={0} fill="var(--primary)" size={15}/>
            <p className="text-text-primary text-sm font-medium">Swaps: 59</p>

          </div>
        </div>
      </div>
    </div>
  );
}
