"use client"
import {
    RotateCw,
    SkipBack,
    SkipForward,
    Play,
    Pause,
} from "lucide-react"
import Toggle from "./Toggle"
import { algorithm } from "@/types/algorithm"
import { motion } from "motion/react"
import { useVisualizerStore } from "../../store/visualizerStore"
import AlgorithmDropdown from "./AlgorithmDropdown"

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

    const handleAlgoChange = (algo: algorithm) => {
        setPlay(false)
        store.clearEvents()
        setSelectedAlgo(algo)
    }

    const handleArraySizeChange = (newSize: number) => {
        setValue(newSize)
    }

    const handleSpeedChange = (speed: number) => {
        setPlaybackSpeed(speed)
    }

    return (
        <div className="glass-card flex flex-col gap-4 w-[96vw] mx-auto mt-6 px-3 sm:px-5 py-4">
            {/* Top row: Algorithm + Actions */}
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                {/* Algorithm Selector */}
                <div className="relative border border-border-primary rounded-lg px-3 py-2.5 w-full sm:w-auto sm:min-w-[180px] z-20">
                    <span className="absolute -top-2 left-2 bg-bg-elevated px-1.5 text-xs font-semibold tracking-wider text-text-tertiary uppercase">
                        Algorithm
                    </span>
                    <AlgorithmDropdown
                        selectedAlgo={selectedAlgo}
                        handleAlgoChange={handleAlgoChange}
                    />
                </div>

                {/* Randomize */}
                <motion.button
                    id="randomize-btn"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto border border-primary/40 bg-primary-muted px-4 py-2.5 rounded-lg cursor-pointer hover:bg-primary/15 transition-colors text-sm font-medium text-primary"
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
                <div className="w-full h-px sm:w-px sm:h-9 bg-border-primary mx-1 sm:hidden block" />

                <div className="flex items-center gap-4 sm:gap-5 flex-wrap w-full lg:w-auto justify-center sm:justify-start">
                    {/* Array Size */}
                    <div className="flex items-center gap-2 flex-1 min-w-[140px] max-w-[400px]">
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
                    <div className="flex items-center gap-2 flex-1 min-w-[280px] max-w-[350px]">
                        <span className="text-[10px] font-semibold tracking-wider text-text-tertiary uppercase whitespace-nowrap">
                            Speed
                        </span>
                        <div className="flex items-center gap-1 flex-wrap">
                            {SPEED_OPTIONS.map((speed) => (
                                <button
                                    key={speed}
                                    onClick={() => handleSpeedChange(speed)}
                                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${playbackSpeed === speed
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
                <div className="w-full h-px sm:w-px sm:h-9 bg-border-primary mx-1 sm:ml-auto block sm:hidden" />
                <div className="w-px h-9 bg-border-primary ml-auto hidden sm:block" />

                {/* Live Log Toggle */}
                <div className="flex items-center gap-2 sm:ml-0 mx-auto sm:mx-0">
                    <span className="text-xs font-semibold tracking-wider text-text-tertiary uppercase">Live Log</span>
                    <Toggle value={liveLog} toggle={() => setLiveLog(!liveLog)} />
                </div>
            </div>

        </div>
    )
}