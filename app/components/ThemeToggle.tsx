"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function ThemeToggle({ expand }: { expand: boolean }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    if (!mounted) return <div className="h-9 w-9" />

    const isLight = theme === "light"
    const toggleTheme = () => setTheme(isLight ? "dark" : "light")

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg
                text-text-secondary hover:text-text-primary bg-transparent hover:bg-bg-tertiary
                transition-colors duration-200 cursor-pointer"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                {isLight ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun size={18} strokeWidth={1.75} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon size={18} strokeWidth={1.75} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}