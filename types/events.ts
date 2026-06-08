export type SortEvent =
        | CompareEvent
        | SwapEvent
        | SortedEvent

export type CompareEvent = {
        type: 'compare',
        indices: { i: number, j: number }
        array: number[]
        message: string
}

export type SwapEvent = {
        type: 'swap',
        indices: { i: number, j: number }
        array: number[]
        message: string
}

export type SortedEvent = {
        type: 'sorted',
        indices: number[]
        array: number[]
        message: string
}