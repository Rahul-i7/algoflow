"use client"
import { algorithms } from "@/algorithms/algorithms"
import { RotateCw, SquarePen, ArrowRightToLine, ArrowLeftToLine, Play, Pause } from "lucide-react"
import Toggle from "./Toggle"
import { algorithm } from "@/types/algorithm"
import { motion } from "motion/react"

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
    return (
        <div className="flex items-center gap-3 border border-border-primary px-4 py-5 w-[95vw] mx-auto rounded-lg mt-10">
        <>
          <div className="flex justify-center relative border border-border-primary w-45 p-3 rounded-lg">
            <p className="text-text-tertiary absolute left-3 -top-3 bg-bg-primary px-0.5 text-sm">ALGORITHM</p>
            <select value={selectedAlgo.name} onChange={(e) => setSelectedAlgo(algorithms.find(a => a.name === e.target.value) || algorithms[0])} name="algorithm" id="algorithm" className="text-text-secondary cursor-pointer w-full outline-none">
              {algorithms.map((algo) => (
                <option key={algo.name} value={algo.name}>{algo.name}</option>
              ))}
            </select>
          </div>
          <motion.div
            className="flex items-center justify-center gap-2 border border-primary w-45 p-3 rounded-lg cursor-pointer hover:bg-bg-secondary transition-colors"
            onClick={() => randomize()}
            whileTap={{scale: 0.95}}
            transition={{duration: 0.2, ease: "easeInOut"}}
          >
            <RotateCw size={20} className="text-primary" />
            <p className="text-primary">Randomize</p>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-2 border border-border-primary w-45 p-3 rounded-lg cursor-pointer hover:bg-bg-secondary transition-colors"
            whileTap={{scale: 0.95}}
            transition={{duration: 0.05, ease: "easeInOut"}}
          >
            <SquarePen className="text-text-secondary" size={20} />
            <p className="text-text-secondary">Custom Array</p>
          </motion.div>
        </>
        <div className="border-2 border-border-primary rounded-lg h-10 mx-2" />

        <div className="flex grow gap-13 justify-between px-18">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <p className="text-text-tertiary">ARRAY SIZE</p>
              <input
                value={value}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(e) => {
                  const numericVal = e.target.value.replace(/\D/g, '');
                  setValue(numericVal === '' ? 0 : Number(numericVal));
                }}
                className="w-9 px-1 outline-none border border-border-primary/0 focus:border-border-primary/50 rounded-md text-right text-primary"
              />
            </div>
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-runnable-track]:bg-gray-300 [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600
            [&::-webkit-slider-thumb]:shadow-lg"
              min={5}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <ArrowLeftToLine className="h-8 w-8 text-text-secondary border border-border-primary p-1.5 rounded-lg cursor-pointer" />
            <div className="flex items-center gap-2 bg-primary p-1.5 rounded-lg">
              {play ? <Pause size={40} fill="white" strokeWidth={0} onClick={() => setPlay(false)} className="p-1.5 rounded-lg cursor-pointer" /> : <Play size={40} fill="white" strokeWidth={0} onClick={() => setPlay(true)} className="text-text-secondary p-1.5 rounded-lg cursor-pointer" />}
            </div>
            <ArrowRightToLine className="h-8 w-8 text-text-secondary border border-border-primary p-1.5 rounded-lg cursor-pointer" />
          </div>
        </div>

        <div className="border-2 border-border-primary rounded-lg h-10 mx-2" />

        <div className="flex items-center gap-2">
          <p>LIVE LOG</p>
          <Toggle value={liveLog} toggle={() => setLiveLog(!liveLog)} />
        </div>
      </div>
    )
}