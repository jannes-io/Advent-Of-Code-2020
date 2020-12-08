interface IContains {
  color: string;
  amount: number;
}

interface IBag {
  color: string;
  contains: IContains[];
}

export const parseInput = (input: string) => input
  .split('\n')
  .map<IBag>((line) => {
    const color = line.match(/^(\w+ \w+)/)[0];
    const inside = line.split('contain ')[1].slice(0, -1).split(', ');

    if (inside[0] === 'no other bags') {
      return { color, contains: [] };
    }

    const contains = inside.map<IContains>((rule) => {
      const info = rule.match(/^(\d+) (\w+ \w+)/);
      return { color: info[2], amount: parseInt(info[1], 10) };
    });

    return { color, contains }
  });

const findGoldBags = (bags: IBag[], currentBag: IBag): number => {
  const gold = currentBag.contains.find(({ color }) => color === 'shiny gold');
  if (gold !== undefined) {
    return gold.amount;
  }
  return currentBag.contains
    .map(({ color }) => bags.find((bag) => bag.color === color))
    .reduce((acc, bag) => acc + findGoldBags(bags, bag), 0);
}

export const executePart1 = (input: IBag[]) => input
  .filter((bag) => findGoldBags(input, bag) > 0)
  .length;

export const executePart2 = (input: IBag[]) => {
  return 'fuck this part';
};
