import { create } from "zustand"
import { SortEvent } from "../../types/events"
import { ArrayBar } from "@/types/array"

type VisualizerState = {
    array: ArrayBar[]
    events: SortEvent[]
    currentStep: number
    isPlaying: boolean
    playbackSpeed: number
    
    setArray: (array: ArrayBar[]) => void
    setEvents: (events: SortEvent[]) => void
    nextStep: () => void
    prevStep: () => void
    togglePlay: () => void
    reset: () => void
    
    setPlaybackSpeed: (speed: number) => void
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
    array: [],
    events: [],
    currentStep: 0,
    isPlaying: false,
    playbackSpeed: 1,
    
    setArray: (array) => set({ array }),
    setEvents: (events) => set({ events }),
    nextStep: () => {
        const { currentStep, events } = get()
        if (currentStep < events.length) {
            set({ currentStep: currentStep + 1 })
        }
    },
    prevStep: () => {
        const { currentStep } = get()
        if (currentStep > 0) {
            set({ currentStep: currentStep - 1 })
        }
    },
    togglePlay: () => {
        set({ isPlaying: !get().isPlaying })
    },
    reset: () => {
        set({ currentStep: 0, isPlaying: false })
    },
    setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
}))