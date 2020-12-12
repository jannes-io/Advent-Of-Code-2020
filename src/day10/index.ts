export const parseInput = (input: string) => input.split('\n').map((i) => parseInt(i, 10));

export const executePart1 = (input: number[]) => {
  const sorted = input.sort((a, b) => a - b);
  const chainDiff = sorted.reduce((acc, curr, i) => {
    const diff = curr - acc.jolts;

    return {
      jolts: curr,
      one: diff === 1 ? acc.one + 1 : acc.one,
      three: diff === 3 ? acc.three + 1 : acc.three,
    }
  }, { one: 0, three: 1, jolts: 0 });

  return chainDiff.one * chainDiff.three;
};

const isValidChain = (chain: number[]) => {
  for (let i = 1; i < chain.length - 1; i++) {
    if (chain[i + 1] - chain[i] > 3) {
      return false;
    }
  }
  return true;
}

export const executePart2 = (input: number[]) => {
  const sorted = input.sort((a, b) => a - b);
  const allUsed = [0, ...sorted, sorted[sorted.length - 1] + 3];

  const possibilities: number[][] = [];
  for (let drop = 1; drop < sorted.length; drop++) {
    const curr = [...allUsed];
    curr.splice(drop, 1);
  }
};
