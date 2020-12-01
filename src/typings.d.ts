export type DayExecutor = (input: string) => string;

export interface IDay {
  executePart1: DayExecutor;
  executePart2: DayExecutor;
}
