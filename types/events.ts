import { ArrayBar } from "./array"

export type SortEvent =
        | CompareEvent
        | SwapEvent
        | SortedEvent

export type CompareEvent = {
        type: 'compare',
        indices: { i: number, j: number }
        array: ArrayBar[]
        message: string
}

export type SwapEvent = {
        type: 'swap',
        indices: { i: number, j: number }
        array: ArrayBar[]
        message: string
}

export type SortedEvent = {
        type: 'sorted',
        indices: number[]
        array: ArrayBar[]
        message: string
}