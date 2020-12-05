const partition = (min: number, max: number, instructions: boolean[]): number => {
  const [isUpper, ...newInstructions] = instructions;
  if (min + 1 === max || isUpper === undefined) {
    return isUpper ? max : min;
  }

  const middle = Math.ceil((min + max) / 2);

  return isUpper
    ? partition(middle, max, newInstructions)
    : partition(min, middle, newInstructions);
}

const toBools = (ins: string, forward: string) => ins.split('').map((l) => l === forward)

export const parseInput = (input: string) => input.split('\n').map((instructions) =>
  partition(0, 127, toBools(instructions.slice(0, 7), 'B')) * 8
  + partition(0, 7, toBools(instructions.slice(7, 10), 'R')));

export const executePart1 = (input: number[]) => Math.max(...input);

export const executePart2 = (input: number[]) => input
  .sort((a, b) => a - b)
  .find((curr, i, sorted) => curr + 2 === sorted[i + 1]) + 1;
