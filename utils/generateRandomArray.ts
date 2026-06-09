import { ArrayBar } from "@/types/array"

export const generateRandomArray = (size: number, min = 10, max = 100): ArrayBar[] => {
    return Array.from({ length: size }, () => ({
        id: crypto.randomUUID(),
        value: Math.floor(Math.random() * (max - min + 1)) + min,
        state: "default"
    }))
}