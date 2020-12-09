export const parseInput = (input: string) => input.split('\n').map((i) => parseInt(i, 10));

const PREAMBLE_SIZE = 25;

const filterNumbers = (currN: number, i: number, numbers: number[]) => {
  if (i < PREAMBLE_SIZE) {
    return false;
  }

  const preamble = numbers.slice(i - PREAMBLE_SIZE, i);

  for (let preamble1 = 0; preamble1 < preamble.length; preamble1++) {
    for (let preamble2 = 0; preamble2 < preamble.length; preamble2++) {
      if (preamble1 === preamble2) {
        continue;
      }
      if (preamble[preamble1] + preamble[preamble2] === currN) {
        return false;
      }
    }
  }
  return true;
};

export const executePart1 = (input: number[]) => input.find(filterNumbers);

const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b);
const minMax = (numbers: number[]) => numbers.reduce((acc, n) => ({
  min: acc.min < n ? acc.min : n,
  max: acc.max > n ? acc.max : n,
}), {
  min: Infinity,
  max: 0
});

export const executePart2 = (input: number[]) => {
  const target = input.find(filterNumbers);

  for (let preambleStart = 0; preambleStart < input.length; preambleStart++) {
    for (let preambleEnd = preambleStart + 2; preambleEnd < input.length; preambleEnd++) {
      const preamble = input.slice(preambleStart, preambleEnd);
      if (sum(preamble) === target) {
        const { min, max } = minMax(preamble);
        return min + max;
      }
    }
  }
};
