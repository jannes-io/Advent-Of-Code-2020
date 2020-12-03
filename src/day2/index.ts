let passwords: RegExpMatchArray[] = [];
export const before = (input: string) => {
  passwords = input.split('\n').map((pwd) => pwd.match(/(\d+)-(\d+) (\w): (\w+)/));
}

export const executePart1 = () => passwords
  .filter((pwd) => {
    const min = parseInt(pwd[1], 10);
    const max = parseInt(pwd[2], 10);
    const char = pwd[3];
    const password = pwd[4];

    const occurrences = password.split('').filter((c) => c === char).length;
    return occurrences >= min && occurrences <= max;
  })
  .length;

export const executePart2 = () => passwords
  .filter((pwd) => {
    const firstPlace = parseInt(pwd[1], 10) - 1;
    const secondPlace = parseInt(pwd[2], 10) - 1;
    const char = pwd[3];
    const password = pwd[4].split('');

    return (password[firstPlace] === char || password[secondPlace] === char)
      && !(password[firstPlace] === char && password[secondPlace] === char);
  })
  .length;
