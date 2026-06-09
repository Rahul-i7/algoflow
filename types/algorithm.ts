import { SortEvent } from "./events"
import { ArrayBar } from "./array"

export type algorithm = {
  "name": string,
  "description": string,
  "complexity": {
    "best": string,
    "average": string,
    "worst": string,
  },
  "stable": boolean,
  "spaceComplexity": string,
  "spaceComplexityInfo": string,
  "function": (input: ArrayBar[]) => SortEvent[]
}