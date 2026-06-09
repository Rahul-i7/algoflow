import { motion } from "motion/react"
import { BarState } from "@/types/array"

const stateColors: Record<BarState, string> = {
    default: "bg-primary",
    pivot: "bg-primary",
    target: "bg-primary",
    comparing: "bg-comparing",
    swapping: "bg-swapping",
    sorted: "bg-sorted",
    active: "bg-primary"
}

export default function ArrayBlock({value, state = "default"}: {value: number, state?: BarState}) {
    return (
        <motion.div 
        className={`w-12 ${stateColors[state]} text-white flex flex-col items-center justify-end`}
        transition={{duration: 0.3, ease: "easeInOut"}}
        >
            {value}
        </motion.div>
    )
}