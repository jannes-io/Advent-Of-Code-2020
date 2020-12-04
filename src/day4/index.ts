export const parseInput = (input: string) => input
  .split('\n\n')
  .map((str) => str
    .split('\n')
    .join(' ')
    .match(/^(?=.*(byr:[^\s]+))(?=.*(iyr:[^\s]+))(?=.*(eyr:[^\s]+))(?=.*(hgt:[^\s]+))(?=.*(hcl:[^\s]+))(?=.*(ecl:[^\s]+))(?=.*(pid:[^\s]+))(?=.*(cid:[^\s]+))?.*$/)
  )
  .filter((v) => !!v);

export const executePart1 = (input: RegExpMatchArray) => input.length;

type RuleValidator = (value: string) => boolean;

interface IRules {
  [k: string]: RuleValidator;
}

const numBetween = (min: number, max: number): RuleValidator => (value) => {
  const intVal = parseInt(value, 10);
  return intVal >= min && intVal <= max;
}

const rules: IRules = {
  byr: numBetween(1920, 2002),
  iyr: numBetween(2010, 2020),
  eyr: numBetween(2020, 2030),
  hgt: (val) => (val.slice(-2) === 'in' && numBetween(59, 76)(val)) || (val.slice(-2) === 'cm' && numBetween(150, 193)(val)),
  hcl: (val) => /^#([0-9]|[a-f]){6}$/g.test(val),
  ecl: (val) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
  pid: (val) => /^[0-9]{9}$/g.test(val),
};

const isValidProperty = (property: string) => {
  const [key, val] = property.split(':');
  return rules[key] !== undefined ? rules[key](val) : true;
}

const isValidPassport = (passport: string[]) => (passport as unknown as string[])
  .filter((property) => property === undefined || isValidProperty(property))
  .length === passport.length

export const executePart2 = (input: RegExpMatchArray) => input
  .map((matches) => matches.slice(1))
  .filter((passport) => isValidPassport(passport as unknown as string[]))
  .length;
