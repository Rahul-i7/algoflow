import { SortEvent } from "@/types/events"
import { ArrayBar, BarState } from "@/types/array"

export const algorithms = [
  {
    "name": "Bubble Sort",
    "description": "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    "complexity": {
      "best": "O(n)",
      "average": "O(n²)",
      "worst": "O(n²)",
    },
    "stable": true,
    "spaceComplexity": "O(1)",
    "spaceComplexityInfo": "Bubble Sort is an inplace algorithm and only uses constant amount of extra space.",
    "function": bubbleSortFunction
  },
  {
    "name": "Selection Sort",
    "description": "Selection Sort is a simple sorting algorithm that repeatedly finds the minimum element from the unsorted part of the array and puts it at the beginning.",
    "complexity": {
      "best": "O(n²)",
      "average": "O(n²)",
      "worst": "O(n²)",
    },
    "stable": false,
    "spaceComplexity": "O(1)",
    "spaceComplexityInfo": "Selection Sort is an inplace algorithm and only uses constant amount of extra space.",
    "function": selectionSortFunction
  },
  {
    "name": "Heap Sort",
    "description": "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It is an inplace algorithm and has a time complexity of O(n log n).",
    "complexity": {
      "best": "O(n log n)",
      "average": "O(n log n)",
      "worst": "O(n log n)",
    },
    "stable": false,
    "spaceComplexity": "O(1)",
    "spaceComplexityInfo": "Heap Sort is an inplace algorithm and only uses constant amount of extra space.",
    "function": heapSortFunction
  },
  {
    "name": "Quick Sort",
    "description": "Quick Sort is a comparison based sorting algorithm that uses divide and conquer algorithm to sort an array. It is an inplace algorithm and has a time complexity of O(n log n).",
    "complexity": {
      "best": "O(n log n)",
      "average": "O(n log n)",
      "worst": "O(n log n)",
    },
    "stable": false,
    "spaceComplexity": "O(1)",
    "spaceComplexityInfo": "Quick Sort is an inplace algorithm and only uses constant amount of extra space.",
    "function": quickSortFunction
  }
]

function partition(arr: ArrayBar[], events: SortEvent[], low: number, high: number) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    events.push({
      type: "compare",
      indices: { i: j, j: high },
      array: arr.map((bar, index) => ({
        ...bar,
        state: index === j || index === high ? "comparing" : bar.state
      })),
      message: `Comparing ${arr[j].value} with pivot ${arr[high].value}`,
    })
    if (arr[j].value < pivot.value) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      events.push({
        type: "swap",
        indices: { i: i, j: j },
        array: arr.map((bar, index) => ({
          ...bar,
          state: index === i || index === j ? "swapping" : bar.state
        })),
        message: `Swapping ${arr[j].value} with ${arr[i].value}`,
      })
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  return i + 1;
}

function quickSortHelper(arr: ArrayBar[], events: SortEvent[], low: number, high: number) {
  if (low < high) {
    let pi = partition(arr, events, low, high)
    
    arr[pi] = { ...arr[pi], state: "sorted" }
    events.push({
      type: "sorted",
      indices: [pi],
      array: arr.map(bar => ({ ...bar })),
      message: `${arr[pi].value} is now sorted`,
    })

    quickSortHelper(arr, events, low, pi - 1);
    quickSortHelper(arr, events, pi + 1, high)
  } else if (low === high) {
    arr[low] = { ...arr[low], state: "sorted" }
    events.push({
      type: "sorted",
      indices: [low],
      array: arr.map(bar => ({ ...bar })),
      message: `${arr[low].value} is now sorted`,
    })
  }
}

function quickSortFunction(input: ArrayBar[]) {
  const arr = input.map(bar => ({...bar, state: 'default' as BarState}));
  const events: SortEvent[] = []
  quickSortHelper(arr, events, 0, arr.length - 1)
  return events;
}

function heapify(arr: ArrayBar[], events: SortEvent[], heapSize: number, i: number) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < heapSize) {
    events.push({
      type: "compare",
      indices: { i: left, j: largest },
      array: arr.map((bar, index) => ({
        ...bar,
        state: index === left || index === largest ? "comparing" : bar.state
      })),
      message: `Comparing ${arr[left].value} and current largest ${arr[largest].value}`,
    })
    if (arr[left].value > arr[largest].value) {
      largest = left
    }
  }

  if (right < heapSize) {
    events.push({
      type: "compare",
      indices: { i: right, j: largest },
      array: arr.map((bar, index) => ({
        ...bar,
        state: index === right || index === largest ? "comparing" : bar.state
      })),
      message: `Comparing ${arr[right].value} and current largest ${arr[largest].value}`,
    })
    if (arr[right].value > arr[largest].value) {
      largest = right
    }
  }

  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    events.push({
      type: "swap",
      indices: { i: i, j: largest },
      array: arr.map((bar, index) => ({
        ...bar,
        state: index === i || index === largest ? "swapping" : bar.state
      })),
      message: `Swapping ${arr[i].value} with ${arr[largest].value}`,
    })
    heapify(arr, events, heapSize, largest)
  }
}

function heapSortFunction(input: ArrayBar[]) {
  const arr = input.map(bar => ({ ...bar, state: "default" as BarState }))
  const events: SortEvent[] = []
  const n = arr.length

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, events, n, i)
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    events.push({
      type: "swap",
      indices: { i: 0, j: i },
      array: arr.map((bar, index) => ({
        ...bar,
        state: index === 0 || index === i ? "swapping" : bar.state
      })),
      message: `Swapping ${arr[0].value} with ${arr[i].value}`,
    })
    
    arr[i] = { ...arr[i], state: "sorted" }
    events.push({
      type: "sorted",
      indices: [i],
      array: arr.map(bar => ({ ...bar })),
      message: `${arr[i].value} is now sorted`,
    })

    heapify(arr, events, i, 0)
  }

  // Mark the final remaining element as sorted
  if (n > 0) {
    arr[0] = { ...arr[0], state: "sorted" }
    events.push({
      type: "sorted",
      indices: [0],
      array: arr.map(bar => ({ ...bar })),
      message: `${arr[0].value} is now sorted`,
    })
  }

  return events
}

function selectionSortFunction(input: ArrayBar[]) {
  const arr = input.map(bar => ({ ...bar, state: "default" as BarState }))

  const events: SortEvent[] = []

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      events.push({
        type: "compare",
        indices: { i: j, j: minIndex },
        array: arr.map((bar, index) => ({
          ...bar,
          state: index === j || index === minIndex ? "comparing" : (index === i ? "pivot" : bar.state)
        })),
        message: `Comparing ${arr[j].value} with current minimum ${arr[minIndex].value}`,
      })
      if (arr[j].value < arr[minIndex].value) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
      events.push({
        type: "swap",
        indices: { i: i, j: minIndex },
        array: arr.map((bar, index) => ({
          ...bar,
          state: index === i || index === minIndex ? "swapping" : bar.state
        })),
        message: `Swapping ${arr[minIndex].value} with ${arr[i].value}`,
      })
    }
    arr[i] = { ...arr[i], state: "sorted" }
    events.push({
      type: "sorted",
      indices: [i],
      array: arr.map(bar => ({ ...bar })),
      message: `${arr[i].value} is now sorted`,
    })
  }
  return events
}

function bubbleSortFunction(input: ArrayBar[]) {
  const arr = input.map(bar => ({ ...bar, state: "default" as BarState }))

  const events: SortEvent[] = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      events.push({
        type: "compare",
        indices: { i: j, j: j + 1 },
        array: arr.map((bar, index) => ({
          ...bar,
          state: index === j || index === j + 1 ? "comparing" : bar.state
        })),
        message: `Comparing ${arr[j].value} and ${arr[j + 1].value}`,
      })

      if (arr[j].value > arr[j + 1].value) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

        events.push({
          type: "swap",
          indices: { i: j, j: j + 1 },
          array: arr.map((bar, index) => ({
            ...bar,
            state: index === j || index === j + 1 ? "swapping" : bar.state
          })),
          message: `Swapping ${arr[j + 1].value} and ${arr[j].value}`,
        })
      }
    }

    arr[arr.length - i - 1] = { ...arr[arr.length - i - 1], state: "sorted" }
    events.push({
      type: "sorted",
      indices: [arr.length - i - 1],
      array: arr.map(bar => ({ ...bar })),
      message: `${arr[arr.length - i - 1].value} is now sorted`,
    })
  }
  
  // Mark the first element as sorted if it's the last one left
  if (arr.length > 0 && arr[0].state !== "sorted") {
      arr[0] = { ...arr[0], state: "sorted" }
      events.push({
          type: "sorted",
          indices: [0],
          array: arr.map(bar => ({ ...bar })),
          message: `${arr[0].value} is now sorted`,
      })
  }

  return events
}