const parseInput = (input: string) => input.split('\n').map((v: string) => parseInt(v, 10));

export const executePart1 = (input: string) => {
  const elems = parseInput(input);
  const small = elems.filter((elem) => elem <= 1010);
  const big = elems.filter((elem) => elem > 1010);

  for (const sn of small) {
    for (const bn of big) {
      if (sn + bn === 2020) {
        return sn * bn;
      }
    }
  }
  return 0;
};


export const executePart2 = (input: string) => {
  const elems = parseInput(input);

  for (const n1 of elems) {
    for (const n2 of elems) {
      if (n1 + n2 > 2020) {
        continue;
      }
      for (const n3 of elems) {
        if (n1 + n2 + n3 === 2020) {
          return n1 * n2 * n3;
        }
      }
    }
  }

  return 0;
};
