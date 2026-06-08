import clsx from "clsx"
import { motion } from "framer-motion"
export default function Toggle({ value, toggle }: { value: boolean, toggle: () => void }) {
    return (
        <div
            className={clsx(
                "cursor-pointer p-1 rounded-3xl flex items-center w-14 transition-colors ease-in-out duration-300",
                value ? "bg-primary" : "bg-gray-300"
            )}
            onClick={() => toggle()}
        >
            <motion.div
                animate={{
                    x: value ? 28 : 0,
                    scale: value ? [1, 0.6, 1] : [1, 0.6, 1]
                }}
                className="bg-white rounded-full w-5 h-5 shadow-sm"
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
            />
        </div>
    )
}