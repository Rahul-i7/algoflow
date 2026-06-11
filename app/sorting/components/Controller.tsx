"use client"
import { algorithms } from "@/algorithms/algorithms"
import {
    RotateCw,
    SkipBack,
    SkipForward,
    Play,
    Pause,
    Gauge,
} from "lucide-react"
import Toggle from "./Toggle"
import { algorithm } from "@/types/algorithm"
import { motion } from "motion/react"
import { useVisualizerStore } from "../../store/visualizerStore"

const SPEED_OPTIONS = [0.25, 0.5, 1, 1.5, 2, 3, 4]

export default function Controller({
    selectedAlgo,
    setSelectedAlgo,
    liveLog,
    setLiveLog,
    value,
    setValue,
    play,
    setPlay,
    randomize
}: {
    selectedAlgo: algorithm
    setSelectedAlgo: (value: algorithm) => void
    liveLog: boolean
    setLiveLog: (value: boolean) => void
    value: number
    setValue: (value: number) => void
    play: boolean
    setPlay: (value: boolean) => void
    randomize: () => void
}) {
    const store = useVisualizerStore()
    const { events, currentStep, playbackSpeed, setPlaybackSpeed } = store

    const hasEvents = events.length > 0
    const isAtStart = currentStep <= 0
    const isAtEnd = hasEvents && currentStep >= events.length - 1
    const totalSteps = events.length

    const handlePrev = () => {
        if (play) setPlay(false)
        store.prevStep()
    }

    const handleNext = () => {
        if (!hasEvents) return
        if (play) setPlay(false)
        store.nextStep()
    }

    const handleAlgoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const found = algorithms.find(a => a.name === e.target.value)
        if (found) {
            setPlay(false)
            store.clearEvents()
            setSelectedAlgo(found)
        }
    }

    const handleArraySizeChange = (newSize: number) => {
        setValue(newSize)
    }

    const handleSpeedChange = (speed: number) => {
        setPlaybackSpeed(speed)
    }

    return (
        <div className="glass-card flex flex-col gap-4 w-[96vw] mx-auto mt-6 px-5 py-4">
            {/* Top row: Algorithm + Actions */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Algorithm Selector */}
                <div className="relative border border-border-primary rounded-lg px-3 py-2.5 min-w-[180px]">
                    <span className="absolute -top-2.5 left-3 bg-bg-elevated px-1.5 text-[10px] font-semibold tracking-wider text-text-tertiary uppercase">
                        Algorithm
                    </span>
                    <select
                        value={selectedAlgo.name}
                        onChange={handleAlgoChange}
                        id="algorithm-select"
                        className="text-text-primary cursor-pointer w-full outline-none text-sm font-medium bg-transparent"
                    >
                        {algorithms.map((algo) => (
                            <option key={algo.name} value={algo.name}>{algo.name}</option>
                        ))}
                    </select>
                </div>

                {/* Randomize */}
                <motion.button
                    id="randomize-btn"
                    className="flex items-center gap-2 border border-primary/40 bg-primary-muted px-4 py-2.5 rounded-lg cursor-pointer hover:bg-primary/15 transition-colors text-sm font-medium text-primary"
                    onClick={randomize}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                >
                    <RotateCw size={16} />
                    Randomize
                </motion.button>

                {/* Divider */}
                <div className="w-px h-9 bg-border-primary mx-1 hidden sm:block" />

                {/* Playback Controls */}
                <div className="flex items-center gap-1.5">
                    <motion.button
                        id="prev-step-btn"
                        className="flex items-center justify-center h-9 w-9 rounded-lg border border-border-primary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={handlePrev}
                        disabled={isAtStart || !hasEvents}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Previous step"
                    >
                        <SkipBack size={16} />
                    </motion.button>

                    <motion.button
                        id="play-pause-btn"
                        className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-white cursor-pointer hover:bg-primary-hover transition-colors shadow-md"
                        onClick={() => setPlay(!play)}
                        whileTap={{ scale: 0.9 }}
                        aria-label={play ? "Pause" : "Play"}
                    >
                        {play ? (
                            <Pause size={18} fill="white" strokeWidth={0} />
                        ) : (
                            <Play size={18} fill="white" strokeWidth={0} className="ml-0.5" />
                        )}
                    </motion.button>

                    <motion.button
                        id="next-step-btn"
                        className="flex items-center justify-center h-9 w-9 rounded-lg border border-border-primary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={handleNext}
                        disabled={isAtEnd || !hasEvents}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Next step"
                    >
                        <SkipForward size={16} />
                    </motion.button>
                </div>

                {/* Step Counter */}
                {hasEvents && (
                    <div className="text-xs font-mono text-text-tertiary bg-bg-secondary px-3 py-1.5 rounded-md">
                        {currentStep + 1} / {totalSteps}
                    </div>
                )}

                {/* Divider */}
                <div className="w-px h-9 bg-border-primary mx-1 hidden sm:block" />

                <div className="flex items-center gap-5 flex-wrap">
                {/* Array Size */}
                <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-[400px]">
                    <span className="text-[10px] font-semibold tracking-wider text-text-tertiary uppercase whitespace-nowrap">
                        Size
                    </span>
                    <input
                        id="array-size-slider"
                        type="range"
                        min={5}
                        max={100}
                        value={value}
                        onChange={(e) => handleArraySizeChange(Number(e.target.value))}
                        className="flex-1"
                    />
                    <input
                        id="array-size-input"
                        value={value}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                            const numericVal = e.target.value.replace(/\D/g, '');
                            const num = numericVal === '' ? 5 : Math.min(100, Math.max(5, Number(numericVal)));
                            handleArraySizeChange(num);
                        }}
                        className="w-10 px-1.5 py-0.5 outline-none border border-border-primary rounded-md text-center text-sm font-mono text-primary bg-transparent focus:border-primary transition-colors"
                    />
                </div>

                {/* Speed Control */}
                <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-[350px]">
                    <Gauge size={14} className="text-text-tertiary" />
                    <span className="text-[10px] font-semibold tracking-wider text-text-tertiary uppercase whitespace-nowrap">
                        Speed
                    </span>
                    <div className="flex items-center gap-1">
                        {SPEED_OPTIONS.map((speed) => (
                            <button
                                key={speed}
                                onClick={() => handleSpeedChange(speed)}
                                className={`px-2 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                                    playbackSpeed === speed
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary"
                                }`}
                            >
                                {speed}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-px h-9 bg-border-primary ml-10 hidden sm:block" />

                {/* Live Log Toggle */}
                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs font-semibold tracking-wider text-text-tertiary uppercase">Live Log</span>
                    <Toggle value={liveLog} toggle={() => setLiveLog(!liveLog)} />
                </div>
            </div>
            
        </div>
    )
}