let parsedInput: number[] = [];
export const before = (input: string) => {
  parsedInput = input.split('\n').map((v: string) => parseInt(v, 10));
}

export const executePart1 = () => {
  const small = parsedInput.filter((elem) => elem <= 1010);
  const big = parsedInput.filter((elem) => elem > 1010);

  for (const sn of small) {
    for (const bn of big) {
      if (sn + bn === 2020) {
        return sn * bn;
      }
    }
  }
  return 0;
};


export const executePart2 = () => {
  for (const n1 of parsedInput) {
    for (const n2 of parsedInput) {
      if (n1 + n2 > 2020) {
        continue;
      }
      for (const n3 of parsedInput) {
        if (n1 + n2 + n3 === 2020) {
          return n1 * n2 * n3;
        }
      }
    }
  }

  return 0;
};
