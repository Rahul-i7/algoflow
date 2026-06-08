"use client"
import Controller from "./components/Controller"
import { useState, useEffect } from "react"
import { algorithms } from "@/algorithms/algorithms"
import { generateRandomArray } from "@/utils/generateRandomArray"
import { algorithm } from "@/types/algorithm"
import ArrayVisual from "./components/ArrayVisual"
import { useVisualizerStore } from "../store/visualizerStore"

export default function SortingPage() {
  const [liveLog, setLiveLog] = useState(true)
  const [value, setValue] = useState(10)
  const [play, setPlay] = useState(false)
  const [selectedAlgo, setSelectedAlgo] = useState<algorithm>(algorithms[0])
  const [comparisons, setComparisons] = useState<number>(0)
  const [swaps, setSwaps] = useState<number>(0)
  const array = useVisualizerStore()
  const randomize = () => {
    array.setArray(generateRandomArray(value))
    array.reset()
    setPlay(false)
    setComparisons(0)
    setSwaps(0)
  }

  const startSorting = () => {
    const events = selectedAlgo.function(array.array)
    array.setEvents(events)
    array.reset()
    setPlay(true)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (play) {
      if (array.events.length === 0) {
        startSorting();
      } else {
        interval = setInterval(() => {
          const state = useVisualizerStore.getState();
          if (state.currentStep < state.events.length - 1) {
            state.nextStep();
          } else {
            setPlay(false);
          }
        }, 100);
      }
    }
    return () => clearInterval(interval);
  }, [play, array.events.length]);

  useEffect(() => {
    if (array.events.length > 0 && array.currentStep < array.events.length) {
       const currentEvents = array.events.slice(0, array.currentStep + 1);
       setComparisons(currentEvents.filter(e => e.type === 'compare').length);
       setSwaps(currentEvents.filter(e => e.type === 'swap').length);
    } else if (array.events.length === 0 || array.currentStep === 0) {
       setComparisons(0);
       setSwaps(0);
    }
  }, [array.currentStep, array.events]);

  useEffect(() => {
    randomize()
  }, [value])
  return (
    <>
      <Controller
        selectedAlgo={selectedAlgo} setSelectedAlgo={setSelectedAlgo}
        liveLog={liveLog} setLiveLog={setLiveLog}
        value={value} setValue={setValue}
        play={play} setPlay={setPlay}
        randomize={randomize}
      />

      <div className="flex relative justify-center items-center border border-border-primary mx-10 rounded-lg h-[60vh] mt-20">
        <div className="absolute right-5 -top-15 flex gap-4">
          <div className="flex items-center gap-4 bg-primary/5 px-5 py-2 rounded-full">
            <p className="text-text-tertiary text-sm font-semibold">COMPARISONS</p>
            <p className="text-primary text-sm font-medium">{comparisons}</p>
          </div>
          <div className="flex items-center gap-4 bg-primary/5 px-5 py-2 rounded-full">
            <p className="text-text-tertiary text-sm font-semibold">SWAPS</p>
            <p className="text-primary text-sm font-medium">{swaps}</p>
          </div>
        </div>
        <ArrayVisual array={array.events.length > 0 && array.currentStep < array.events.length ? array.events[array.currentStep].array : array.array}/>
      </div>


      <div className="grid grid-cols-3 gap-7 px-7 mt-10">
        <div className="border border-border-primary p-5 rounded-lg">
          <p className="text-text-tertiary mb-3">TIME COMPLEXITY</p>
          <div className="my-2 flex justify-between items-center font-medium">
            <p className="text-text-secondary">Best Case</p>
            <p className="text-primary bg-primary/10 px-4 py-2 rounded-sm">{selectedAlgo.complexity.best}</p>
          </div>
          <div className="my-2 flex justify-between items-center font-medium">
            <p className="text-text-secondary">Average Case</p>
            <p className="text-primary bg-primary/10 px-4 py-2 rounded-sm">{selectedAlgo.complexity.average}</p>
          </div>
          <div className="my-2 flex justify-between items-center font-medium">
            <p className="text-text-secondary">Worst Case</p>
            <p className="text-warning bg-warning/10 px-4 py-2 rounded-sm">{selectedAlgo.complexity.average}</p>
          </div>
        </div>

        <div className="border border-border-primary p-5 rounded-lg">
          <p className="text-text-tertiary mb-3">SPACE COMPLEXITY</p>
          <div className="my-2 flex justify-between items-center font-medium">
            <p className="text-text-secondary">Stack Space</p>
            <p className="text-primary bg-primary/10 px-4 py-2 rounded-sm">{selectedAlgo.spaceComplexity}</p>
          </div>
          <p className="text-text-tertiary text-sm mt-10">{selectedAlgo.spaceComplexityInfo}</p>
        </div>

        <div className="border border-border-primary p-5 rounded-lg">
          <p className="text-text-tertiary mb-3">COLOR LEGEND</p>
          <div className="my-2 flex items-center font-medium gap-3">
            <div className="h-5 w-5 bg-primary"/>
            <p className="text-text-secondary">Pivot/Target Element</p>
          </div>
          <div className="my-2 flex items-center font-medium gap-3">
            <div className="h-5 w-5 bg-purple-500"/>
            <p className="text-text-secondary">Comparing</p>
          </div>
          <div className="my-2 flex items-center font-medium gap-3">
            <div className="h-5 w-5 bg-green-500"/>
            <p className="text-text-secondary">Swapping</p>
          </div>
          <div className="my-2 flex items-center font-medium gap-3">
            <div className="h-5 w-5 bg-blue-500"/>
            <p className="text-text-secondary">Sorted</p>
          </div>
        </div>

      </div>
    </>
  )
}