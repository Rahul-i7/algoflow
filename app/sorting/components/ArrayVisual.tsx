"use client"
import ArrayBar from "./ArrayBar"
import { ArrayBar as ArrayBarType } from "@/types/array"
import { useMemo } from "react"

export default function ArrayVisual({ array }: { array: ArrayBarType[] }) {
    const maxValue = useMemo(() => {
        if (array.length === 0) return 100
        return Math.max(...array.map(bar => bar.value))
    }, [array])

    const gap = array.length <= 15 ? 6 : array.length <= 30 ? 4 : array.length <= 50 ? 2 : 1

    return (
        <div className="flex items-end justify-center w-full h-full px-4 pb-6 pt-2 mb-10" style={{ gap }}>
            {array.map((bar) => (
                <ArrayBar
                    key={bar.id}
                    value={bar.value}
                    state={bar.state}
                    maxValue={maxValue}
                    totalBars={array.length}
                />
            ))}
        </div>
    )
}