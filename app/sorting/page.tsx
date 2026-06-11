"use client"
import Controller from "./components/Controller"
import { useState, useEffect, useCallback, useRef } from "react"
import { algorithms } from "@/algorithms/algorithms"
import { generateRandomArray } from "@/utils/generateRandomArray"
import { algorithm } from "@/types/algorithm"
import ArrayVisual from "./components/ArrayVisual"
import { useVisualizerStore } from "../store/visualizerStore"
import LiveLog from "./components/LiveLog"
import { motion, AnimatePresence } from "motion/react"
import { Trophy, ArrowDownUp, GitCompare, Clock } from "lucide-react"

const BASE_DELAY_MS = 300

export default function SortingPage() {
    const [liveLog, setLiveLog] = useState(false)
    const [value, setValue] = useState(20)
    const [play, setPlay] = useState(false)
    const [selectedAlgo, setSelectedAlgo] = useState<algorithm>(algorithms[0])
    const [comparisons, setComparisons] = useState<number>(0)
    const [swaps, setSwaps] = useState<number>(0)
    const [sortingComplete, setSortingComplete] = useState(false)
    const store = useVisualizerStore()
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const randomize = useCallback(() => {
        // Stop playback and clear old events
        setPlay(false)
        setSortingComplete(false)
        store.clearEvents()
        store.setArray(generateRandomArray(value))
        setComparisons(0)
        setSwaps(0)
    }, [value, store])

    const startSorting = useCallback(() => {
        // Read the current array directly from the store to avoid stale closures
        const currentArray = useVisualizerStore.getState().array
        if (currentArray.length === 0) return

        const events = selectedAlgo.function(currentArray)
        store.setEvents(events)
        store.reset()
        store.setStatus("running")
        setSortingComplete(false)
    }, [selectedAlgo, store])

    // Auto-generate array on mount
    // useEffect(() => {
    //     store.setArray(generateRandomArray(value))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // Playback loop
    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        if (play) {
            const state = useVisualizerStore.getState()
            if (state.events.length === 0) {
                startSorting()
                return // useEffect will re-run when events change
            }

            const delay = BASE_DELAY_MS / state.playbackSpeed
            intervalRef.current = setInterval(() => {
                const s = useVisualizerStore.getState()
                if (s.currentStep < s.events.length - 1) {
                    s.nextStep()
                } else {
                    // Sorting complete
                    setPlay(false)
                    setSortingComplete(true)
                    useVisualizerStore.getState().setStatus("complete")
                }
            }, delay)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [play, store.events.length, store.playbackSpeed, startSorting])

    // Track comparisons and swaps
    useEffect(() => {
        if (store.events.length > 0 && store.currentStep < store.events.length) {
            const currentEvents = store.events.slice(0, store.currentStep + 1)
            setComparisons(currentEvents.filter(e => e.type === 'compare').length)
            setSwaps(currentEvents.filter(e => e.type === 'swap').length)
        } else if (store.events.length === 0) {
            setComparisons(0)
            setSwaps(0)
            setSortingComplete(false)
        }
    }, [store.currentStep, store.events])

    // Determine what array to display
    const displayArray = store.events.length > 0 && store.currentStep < store.events.length
        ? store.events[store.currentStep].array
        : store.array

    const progress = store.events.length > 0
        ? ((store.currentStep + 1) / store.events.length) * 100
        : 0

    return (
        <div className="flex flex-col min-h-[calc(100vh-50px)]">
            <Controller
                selectedAlgo={selectedAlgo} setSelectedAlgo={setSelectedAlgo}
                liveLog={liveLog} setLiveLog={setLiveLog}
                value={value} setValue={setValue}
                play={play} setPlay={setPlay}
                randomize={randomize}
            />

            {/* Main visualization area */}
            <div className="flex w-full gap-4 px-5 flex-1 mt-4">
                <div className="flex flex-col grow">
                    {/* Stats bar */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-text-primary">{selectedAlgo.name}</h2>
                            {selectedAlgo.stable && (
                                <span className="text-[10px] font-bold tracking-wider uppercase bg-sorted/15 text-sorted px-2 py-0.5 rounded">
                                    Stable
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-bg-secondary px-3 py-1.5 rounded-lg">
                                <GitCompare size={13} className="text-comparing" />
                                <span className="text-[10px] font-semibold tracking-wider text-text-tertiary uppercase">Comparisons</span>
                                <span className="text-sm font-bold text-primary font-mono">{comparisons}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-bg-secondary px-3 py-1.5 rounded-lg">
                                <ArrowDownUp size={13} className="text-swapping" />
                                <span className="text-[10px] font-semibold tracking-wider text-text-tertiary uppercase">Swaps</span>
                                <span className="text-sm font-bold text-primary font-mono">{swaps}</span>
                            </div>
                        </div>
                    </div>

                    {/* Visualization container */}
                    <div className="glass-card flex flex-col flex-1 relative overflow-hidden min-h-[65vh]">
                        {/* Progress bar */}
                        {store.events.length > 0 && (
                            <div className="w-full h-1 bg-bg-tertiary">
                                <motion.div
                                    className={`h-full bg-primary rounded-r-full ${play ? 'progress-active' : ''}`}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.15, ease: "linear" }}
                                />
                            </div>
                        )}

                        {/* Array visualization */}
                        <div className="flex-1 flex items-end">
                            {displayArray.length > 0 ? (
                                <ArrayVisual array={displayArray} />
                            ) : (
                                <div className="flex-1 flex flex-col my-auto items-center justify-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center">
                                        <ArrowDownUp size={24} className="text-primary" />
                                    </div>
                                    <p className="text-text-tertiary text-sm">Click <span className="text-primary font-medium">Randomize</span> to generate an array</p>
                                </div>
                            )}
                        </div>

                        {/* Sorting complete overlay */}
                        <AnimatePresence>
                            {sortingComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-sorted/15 border border-sorted/30 text-sorted px-5 py-2.5 rounded-xl shadow-lg backdrop-blur-sm"
                                >
                                    <Trophy size={18} />
                                    <span className="text-sm font-semibold">Sorting Complete!</span>
                                    <span className="text-xs opacity-75">({comparisons} comparisons, {swaps} swaps)</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Live Log Panel */}
                <AnimatePresence>
                    {liveLog && <LiveLog />}
                </AnimatePresence>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 mt-4 pb-6">
                {/* Time Complexity */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={14} className="text-primary" />
                        <p className="text-[10px] font-bold tracking-wider text-text-tertiary uppercase">Time Complexity</p>
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Best Case</span>
                            <span className="text-sm font-mono font-semibold text-sorted bg-sorted/10 px-3 py-1 rounded-md">{selectedAlgo.complexity.best}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Average Case</span>
                            <span className="text-sm font-mono font-semibold text-primary bg-primary-muted px-3 py-1 rounded-md">{selectedAlgo.complexity.average}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Worst Case</span>
                            <span className="text-sm font-mono font-semibold text-warning bg-warning/10 px-3 py-1 rounded-md">{selectedAlgo.complexity.worst}</span>
                        </div>
                    </div>
                </div>

                {/* Space Complexity */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-sm bg-primary" />
                        <p className="text-[10px] font-bold tracking-wider text-text-tertiary uppercase">Space Complexity</p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-text-secondary">Stack Space</span>
                        <span className="text-sm font-mono font-semibold text-primary bg-primary-muted px-3 py-1 rounded-md">{selectedAlgo.spaceComplexity}</span>
                    </div>
                    <p className="text-xs text-text-tertiary leading-relaxed">{selectedAlgo.spaceComplexityInfo}</p>
                </div>

                {/* Color Legend */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-comparing" />
                        <p className="text-[10px] font-bold tracking-wider text-text-tertiary uppercase">Color Legend</p>
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded bg-primary" />
                            <span className="text-sm text-text-secondary">Pivot / Target</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded bg-comparing shadow-[var(--glow-comparing)]" />
                            <span className="text-sm text-text-secondary">Comparing</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded bg-swapping shadow-[var(--glow-swapping)]" />
                            <span className="text-sm text-text-secondary">Swapping</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded bg-sorted shadow-[var(--glow-sorted)]" />
                            <span className="text-sm text-text-secondary">Sorted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Algorithm Description */}
            <div className="px-5 pb-8">
                <div className="glass-card p-5">
                    <p className="text-[10px] font-bold tracking-wider text-text-tertiary uppercase mb-2">About {selectedAlgo.name}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{selectedAlgo.description}</p>
                </div>
            </div>
        </div>
    )
}