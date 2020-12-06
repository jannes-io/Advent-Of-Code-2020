export const parseInput = (input: string) => input.split('\n\n');

const unique = (str: string) => str.split('\n').join('').split('')
  .filter((char, i, str) => str.indexOf(char) === i);

const lengthSum = (a: number, b: any[]) => a + b.length;

export const executePart1 = (input: string[]) => input
  .map(unique)
  .reduce(lengthSum, 0);

const occurrences = (str: string) => str
  .split('\n').join('').split('')
  .reduce<Record<string, number>>((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1}), {});

export const executePart2 = (input: string[]) => input
  .map(occurrences)
  .map((answers, i) => Object
    .values(answers)
    .filter((count) => count === input[i].split('\n').length))
  .reduce(lengthSum, 0);
