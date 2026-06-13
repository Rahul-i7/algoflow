"use client"

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Circle, ArrowRight, Activity, Zap, Layout } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const features = [
  {
    title: "Real-time Visualization",
    description: "Watch algorithms in action with frame-by-frame precision. Understand the inner workings of complex operations.",
    icon: <Activity className="w-6 h-6 text-primary" />
  },
  {
    title: "Interactive Controls",
    description: "Pause, play, step backwards or forwards. Control the speed to match your learning pace.",
    icon: <Zap className="w-6 h-6 text-primary" />
  },
  {
    title: "Clean & Modern UI",
    description: "A beautiful, distraction-free environment designed to keep you focused on what matters.",
    icon: <Layout className="w-6 h-6 text-primary" />
  }
];

export default function Home() {
  const [array, setArray] = useState<number[]>([]);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Generate initial array
    setArray(Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 20));
    
    // Simulate some sorting-like animation periodically
    const interval = setInterval(() => {
        setArray(prev => {
            const next = [...prev];
            const i = Math.floor(Math.random() * next.length);
            const j = Math.floor(Math.random() * next.length);
            [next[i], next[j]] = [next[j], next[i]];
            return next;
        });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-primary overflow-hidden" ref={containerRef}>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-primary opacity-20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-sorted opacity-20 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="relative flex flex-col justify-center items-center w-full min-h-[90vh] pt-20 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary font-medium shadow-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          V1.0 is now live
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-center tracking-tight text-text-primary leading-[1.1]"
        >
          Visualize the Logic <br className="hidden md:block" /> 
          Behind <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Every Sort</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-center text-text-secondary max-w-2xl font-light leading-relaxed"
        >
          Experience algorithms in motion. A high-precision playground for understanding complexity, data structures, and the beauty of logic.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row mt-10 justify-center items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/sorting" className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Visualizing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="https://github.com/rahul-i7/algoflow" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass-card text-text-primary hover:bg-bg-secondary transition-all duration-300 font-medium rounded-xl">
            <Image src="/github-svgrepo-com.svg" className="dark:invert transition-colors duration-300" alt="GitHub" width={20} height={20} />
            View Source
          </Link>
        </motion.div>
      </motion.section>

      {/* Demo Visualization Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl mx-auto px-6 mb-32 -mt-10 relative z-10"
      >
        <div className="glass-card p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Inner background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[80px] -z-10" />
            
            <div className="flex justify-between items-center mb-12">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning/80" />
                    <div className="w-3 h-3 rounded-full bg-comparing/80" />
                    <div className="w-3 h-3 rounded-full bg-sorted/80" />
                </div>
                <div className="text-xs font-mono text-text-tertiary glass-card px-3 py-1 rounded-md">Live Preview</div>
            </div>

            <div className="relative flex justify-center items-end gap-1 sm:gap-2 h-64 sm:h-80 w-full">
                {array.map((num, index) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: `${num}%` }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    className="w-full max-w-[40px] rounded-t-md sm:rounded-t-lg"
                    style={{ 
                        background: "linear-gradient(to bottom, var(--primary), var(--primary-muted))",
                    }}
                    key={index}
                />
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <div className="flex items-center px-4 py-2 gap-2 glass-card rounded-full">
                    <Circle strokeWidth={0} className="text-comparing fill-current" size={12}/>
                    <p className="text-text-primary text-xs font-medium">Comparisons</p>
                </div>
                <div className="flex items-center px-4 py-2 gap-2 glass-card rounded-full">
                    <Circle strokeWidth={0} className="text-swapping fill-current" size={12}/>
                    <p className="text-text-primary text-xs font-medium">Swaps</p>
                </div>
            </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-24 mb-20">
        <div className="text-center mb-16">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
                Designed for Understanding
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-text-secondary max-w-2xl mx-auto"
            >
                Every element is crafted to help you grasp complex sorting logic instantly.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl"
                >
                    <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center mb-6">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-sm">
                        {feature.description}
                    </p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">Ready to dive in?</h2>
            <p className="text-text-secondary mb-10 max-w-xl">
                Start visualizing sorting algorithms today. Completely open source and free.
            </p>
            <Link href="/sorting" className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </motion.section>

    </div>
  );
}
