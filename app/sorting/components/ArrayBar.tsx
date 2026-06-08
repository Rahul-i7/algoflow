import { motion } from "motion/react"

export default function ArrayBar({value}: {value: number}) {
    return (
        <motion.div 
        layout
        className="w-12 bg-primary rounded-t-md flex flex-col items-center justify-end"
        animate={{
            height: value*3
        }}
        transition={{duration: 0.3, ease: "easeInOut"}}
        >
        </motion.div>
    )
}