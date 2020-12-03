let treeMap: boolean[][] = [];
export const before = (input: string) => {
  treeMap = input.split('\n').map((row) => row.split('').map((cell) => cell === '#'));
}

export const executePart1 = () => treeMap
  .slice(1)
  .reduce((trees, row, index) => row[((index + 1) * 3) % (row.length)]
    ? trees + 1
    : trees, 0);

export const executePart2 = () => {
  const vectors = [
    { velX: 1, velY: 1 },
    { velX: 3, velY: 1 },
    { velX: 5, velY: 1 },
    { velX: 7, velY: 1 },
    { velX: 1, velY: 2 },
  ];

  return vectors.reduce((multiplied, { velX, velY }) => {
    let trees = 0;
    let x = 0;
    for (let y = velY; y < treeMap.length; y += velY) {
      x = (x + velX) % treeMap[y].length;
      if (treeMap[y][x]) {
        trees++;
      }
    }
    return multiplied * trees;
  }, 1)
}
