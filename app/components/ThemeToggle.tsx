"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle({ expand }: { expand: boolean }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    if (!mounted) return <div className="h-12 w-full" />

    const isLight = theme === "light"
    const toggleTheme = () => setTheme(isLight ? "dark" : "light")

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center w-full h-12 p-2 rounded-lg gap-3
                text-text-primary bg-bg-primary hover:bg-bg-tertiary
                transition-colors duration-200 cursor-pointer overflow-hidden"
            aria-label="Toggle theme"
        >
            <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-md">
                <AnimatePresence mode="wait">
                    {isLight ? (
                        <motion.div
                            key="sun"
                            initial={{ rotate: -45, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 45, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <Sun size={20} strokeWidth={1.75} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ rotate: -45, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 45, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <Moon size={20} strokeWidth={1.75} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {expand && (
                    <motion.span
                        key="label"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap text-sm font-medium"
                    >
                        {isLight ? "Light Mode" : "Dark Mode"}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    )
}