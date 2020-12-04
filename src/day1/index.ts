export const parseInput = (input: string) => input.split('\n').map((v: string) => parseInt(v, 10));

export const executePart1 = (input: number[]) => {
  const small = input.filter((elem) => elem <= 1010);
  const big = input.filter((elem) => elem > 1010);

  for (const sn of small) {
    for (const bn of big) {
      if (sn + bn === 2020) {
        return sn * bn;
      }
    }
  }
  return 0;
};


export const executePart2 = (input: number[]) => {
  for (const n1 of input) {
    for (const n2 of input) {
      if (n1 + n2 > 2020) {
        continue;
      }
      for (const n3 of input) {
        if (n1 + n2 + n3 === 2020) {
          return n1 * n2 * n3;
        }
      }
    }
  }

  return 0;
};
