enum INSTRUCTIONS {
  ACC = 'acc',
  NOP = 'nop',
  JMP = 'jmp',
}

interface Instruction {
  instruction: INSTRUCTIONS;
  value: number;
}

interface State {
  acc: number;
  pos: number;
  visited: number[];
  success: boolean;
}

export const parseInput = (input: string): Instruction[] => input.split('\n').map((ins) => ({
  instruction: ins.split(' ').shift() as INSTRUCTIONS,
  value: parseInt(ins.split(' ').pop(), 10),
}));

const initialState: State = {
  acc: 0,
  pos: 0,
  visited: [],
  success: false,
}

const runInstructions = (instructions: Instruction[], state: State = initialState): State => {
  let { visited, pos, acc } = state;
  if (visited.includes(pos)) {
    return { ...state, success: false };
  }

  if (pos >= instructions.length) {
    return { ...state, success: true };
  }

  visited = [pos, ...visited];
  const { instruction, value } = instructions[pos];
  switch (instruction) {
    case INSTRUCTIONS.ACC:
      acc += value;
    case INSTRUCTIONS.NOP:
      pos++;
      break;
    case INSTRUCTIONS.JMP:
      pos += value;
      break;
  }

  return runInstructions(instructions, {
    pos,
    acc,
    visited,
    success: false,
  });
}

export const executePart1 = (instructions: Instruction[]) => runInstructions(instructions).acc;

export const executePart2 = (instructions: Instruction[]) => {
  let lastState = initialState;
  let lastIndex = 0;

  do {
    const newInstructions = [...instructions];

    for (let i = lastIndex + 1; i < instructions.length; i++) {
      const { instruction, value } = newInstructions[i];

      if (instruction !== INSTRUCTIONS.ACC) {
        lastIndex = i;
        newInstructions[i] = {
          value,
          instruction: instruction === INSTRUCTIONS.JMP ? INSTRUCTIONS.NOP : INSTRUCTIONS.JMP,
        };
        break;
      }
    }
    lastState = runInstructions(newInstructions);
  } while (lastState.success === false);

  return lastState.acc;
};
