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
    })

    return { color, contains }
  });

export const executePart1 = (input: IBag[]) => {
};

export const executePart2 = (input: IBag[]) => {
};
