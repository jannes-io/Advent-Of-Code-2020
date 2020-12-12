enum Bearing { NORTH = 'N', EAST = 'E', SOUTH = 'S', WEST = 'W' }

enum Direction { FORWARD = 'F', RIGHT = 'R', LEFT = 'L' }

interface IInstruction {
  direction: Direction | Bearing;
  value: number;
}

export const parseInput = (input: string): IInstruction[] => input.split('\n').map((instruction) => {
  const split = instruction.split('');
  const dir = split.shift();
  return { direction: dir as Direction, value: parseInt(split.join(''), 10) }
});

interface IShipState {
  angle: number;
  position: { x: number, y: number };
}

const initialShipState: IShipState = {
  angle: 0,
  position: { x: 0, y: 0 },
};

const moveShip = (shipState: IShipState, instruction: IInstruction) => {
  const moveEast = () => shipState.position.x += instruction.value;
  const moveSouth = () => shipState.position.y -= instruction.value;
  const moveWest = () => shipState.position.x -= instruction.value;
  const moveNorth = () => shipState.position.y += instruction.value;
  const rotate = () => {
    if (instruction.direction === Direction.LEFT && instruction.value > shipState.angle) {
      shipState.angle += 360;
    }
    const mod = instruction.direction === Direction.LEFT ? -1 : 1;
    shipState.angle = (shipState.angle + mod * instruction.value) % 360;
  };

  switch (instruction.direction) {
    case Direction.FORWARD:
      switch (shipState.angle) {
        case 0:
          moveEast();
          break;
        case 90:
          moveSouth();
          break;
        case 180:
          moveWest();
          break;
        case 270:
          moveNorth();
          break;
      }
      break;
    case Bearing.EAST:
      moveEast();
      break;
    case Bearing.SOUTH:
      moveSouth();
      break;
    case Bearing.WEST:
      moveWest();
      break;
    case Bearing.NORTH:
      moveNorth();
      break;
    case Direction.RIGHT:
    case Direction.LEFT:
      rotate();
      break;
  }

  return shipState;
}

export const executePart1 = (input: IInstruction[]) => {
  const { position } = input.reduce(moveShip, initialShipState);
  return Math.abs(position.x) + Math.abs(position.y);
};

export const executePart2 = (input: IInstruction[]) => {
}
