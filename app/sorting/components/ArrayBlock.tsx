import { motion } from "motion/react"

export default function ArrayBlock({value, active}: {value: number, active: boolean}) {
    return (
        <motion.div 
        className="w-12 bg-primary text-white flex flex-col items-center justify-end"
        transition={{duration: 0.3, ease: "easeInOut"}}
        >
            {value}
        </motion.div>
    )
}