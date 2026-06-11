import { create } from "zustand"
import { SortEvent } from "../../types/events"
import { ArrayBar } from "@/types/array"

type VisualizerStatus = "idle" | "running" | "paused" | "complete"

type VisualizerState = {
    array: ArrayBar[]
    events: SortEvent[]
    currentStep: number
    isPlaying: boolean
    playbackSpeed: number
    status: VisualizerStatus
    
    setArray: (array: ArrayBar[]) => void
    setEvents: (events: SortEvent[]) => void
    nextStep: () => void
    prevStep: () => void
    setCurrentStep: (step: number) => void
    togglePlay: () => void
    reset: () => void
    clearEvents: () => void
    
    setPlaybackSpeed: (speed: number) => void
    setStatus: (status: VisualizerStatus) => void
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
    array: [],
    events: [],
    currentStep: 0,
    isPlaying: false,
    playbackSpeed: 1,
    status: "idle",
    
    setArray: (array) => set({ array }),
    setEvents: (events) => set({ events }),
    nextStep: () => {
        const { currentStep, events } = get()
        if (currentStep < events.length - 1) {
            set({ currentStep: currentStep + 1 })
        }
    },
    prevStep: () => {
        const { currentStep } = get()
        if (currentStep > 0) {
            set({ currentStep: currentStep - 1 })
        }
    },
    setCurrentStep: (step) => {
        const { events } = get()
        if (step >= 0 && step < events.length) {
            set({ currentStep: step })
        }
    },
    togglePlay: () => {
        set({ isPlaying: !get().isPlaying })
    },
    reset: () => {
        set({ currentStep: 0, isPlaying: false, status: "idle" })
    },
    clearEvents: () => {
        set({ events: [], currentStep: 0, isPlaying: false, status: "idle" })
    },
    setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
    setStatus: (status) => set({ status }),
}))