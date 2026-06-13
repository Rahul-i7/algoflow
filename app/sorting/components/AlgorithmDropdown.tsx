"use client"
import { algorithms } from "@/algorithms/algorithms"
import { motion, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { algorithm } from "@/types/algorithm"

export default function AlgorithmDropdown({
    selectedAlgo,
    handleAlgoChange
}: {
    selectedAlgo: algorithm,
    handleAlgoChange: (algo: algorithm) => void
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-text-primary text-sm font-medium bg-transparent outline-none cursor-pointer"
            >
                {selectedAlgo.name}
                <ChevronDown size={16} className={`text-text-tertiary transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-4 w-full min-w-[200px] glass-card p-2 rounded-lg shadow-xl z-50 flex flex-col gap-1"
                    >
                        {algorithms.map((algo) => (
                            <button
                                key={algo.name}
                                onClick={() => { 
                                    handleAlgoChange(algo); 
                                    setIsOpen(false); 
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                                    selectedAlgo.name === algo.name 
                                        ? "bg-primary text-white" 
                                        : "hover:bg-primary-muted text-text-primary"
                                }`}
                            >
                                {algo.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}