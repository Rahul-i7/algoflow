import { ArrayBar } from "@/types/array"

export const generateRandomArray = (size: number, min = 10, max = 100): ArrayBar[] => {
    return Array.from({ length: size }, () => ({
        id: Math.random().toString(36).substring(2, 11),
        value: Math.floor(Math.random() * (max - min + 1)) + min,
        state: "default"
    }))
}