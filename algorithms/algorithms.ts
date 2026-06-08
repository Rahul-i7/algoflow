import { SortEvent } from "@/types/events"

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
  }
]

function selectionSortFunction(input: number[]) {
  const arr = [...input]

  const events: SortEvent[] = []

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      events.push({
        type: "compare",
        indices: { i: j, j: minIndex },
        array: [...arr],
        message: `Comparing ${arr[j]} with current minimum ${arr[minIndex]}`,
      })
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
      events.push({
        type: "swap",
        indices: { i: i, j: minIndex },
        array: [...arr],
        message: `Swapping ${arr[minIndex]} with ${arr[i]}`,
      })
    }
    events.push({
      type: "sorted",
      indices: [i],
      array: [...arr],
      message: `${arr[i]} is now sorted`,
    })
  }
  return events
}

function bubbleSortFunction(input: number[]) {
  const arr = [...input]

  const events: SortEvent[] = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      events.push({
        type: "compare",
        indices: { i: j, j: j + 1 },
        array: [...arr],
        message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      })

      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

        events.push({
          type: "swap",
          indices: { i: j, j: j + 1 },
          array: [...arr],
          message: `Swapping ${arr[j + 1]} and ${arr[j]}`,
        })
      }
    }

    events.push({
      type: "sorted",
      indices: [arr.length - i - 1],
      array: [...arr],
      message: `${arr[arr.length - i - 1]} is now sorted`,
    })
  }

  return events
}