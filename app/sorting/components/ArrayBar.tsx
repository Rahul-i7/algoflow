import { motion } from "motion/react"
import { BarState } from "@/types/array"

const stateColors: Record<BarState, string> = {
    default: "bg-default", // Retaining original default color unless changed by user
    pivot: "bg-primary",
    target: "bg-primary",
    comparing: "bg-comparing",
    swapping: "bg-swapping",
    sorted: "bg-sorted",
    active: "bg-primary"
}

export default function ArrayBar({value, state = "default"}: {value: number, state?: BarState}) {
    return (
        <motion.div 
        layout
        className={`w-12 ${stateColors[state]} flex flex-col items-center justify-end`}
        animate={{
            height: value*3
        }}
        transition={{duration: 0.3, ease: "easeInOut"}}
        >
        </motion.div>
    )
}