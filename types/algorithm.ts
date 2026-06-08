import { SortEvent } from "./events"

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
  "function": (input: number[]) => SortEvent[]
}