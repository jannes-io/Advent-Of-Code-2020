import * as readline from 'readline';
import * as fs from 'fs';
import { IDay } from './typings';

const runDay = (day: number) => {
  console.log(`Running day: ${day}`);
  const dayMod: IDay = require(`./day${day}`);

  const input = fs.readFileSync(`input/${day}.txt`).toString();

  console.log(`Part 1: ${dayMod.executePart1(input)}`);
  console.log(`Part 2: ${dayMod.executePart2(input)}`);

  process.exit(0);
};

if (!!process.env.DAY) {
  runDay(parseInt(process.env.DAY, 10));
}

const rli = readline.createInterface(process.stdin, process.stdout);
rli.question('Hello master, what day should we execute?  ', (day) => {
  runDay(parseInt(day, 10));
});