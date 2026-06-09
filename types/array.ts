export type ArrayBar = {
    id: string
    value: number
    state?: BarState
}

export type BarState =
    | "default"
    | "pivot"
    | "target"
    | "comparing"
    | "swapping"
    | "sorted"
    | "active"
