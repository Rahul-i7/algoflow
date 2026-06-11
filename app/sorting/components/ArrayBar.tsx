"use client"
import { motion } from "motion/react"
import { BarState } from "@/types/array"

const stateColorMap: Record<BarState, string> = {
    default: "var(--default-bar)",
    pivot: "var(--primary)",
    target: "var(--primary)",
    comparing: "var(--comparing)",
    swapping: "var(--swapping)",
    sorted: "var(--sorted)",
    active: "var(--primary)"
}

const stateGlowMap: Record<BarState, string> = {
    default: "none",
    pivot: "none",
    target: "none",
    comparing: "var(--glow-comparing)",
    swapping: "var(--glow-swapping)",
    sorted: "var(--glow-sorted)",
    active: "none"
}

const MAX_BAR_HEIGHT = 350

export default function ArrayBar({
    value,
    state = "default",
    maxValue,
    totalBars
}: {
    value: number,
    state?: BarState,
    maxValue: number,
    totalBars: number
}) {
    const barHeight = Math.max((value / maxValue) * MAX_BAR_HEIGHT, 6)
    const showLabel = totalBars <= 35
    const barWidth = totalBars <= 15 ? 48 : totalBars <= 30 ? 32 : totalBars <= 50 ? 16 : totalBars <= 75 ? 8 : 5
    const borderRadius = totalBars <= 30 ? 6 : totalBars <= 50 ? 4 : 2

    return (
        <div className="flex flex-col items-center justify-end gap-1" style={{ width: barWidth }}>
            {showLabel && (
                <motion.span
                    className="text-text-tertiary font-medium select-none"
                    style={{
                        fontSize: totalBars <= 15 ? 11 : 9,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {value}
                </motion.span>
            )}
            <motion.div
                layout
                className="w-full"
                style={{
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2,
                }}
                animate={{
                    height: barHeight,
                    backgroundColor: stateColorMap[state],
                    boxShadow: stateGlowMap[state],
                }}
                transition={{
                    height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                    backgroundColor: { duration: 0.2, ease: "easeOut" },
                    boxShadow: { duration: 0.2, ease: "easeOut" },
                }}
            />
        </div>
    )
}