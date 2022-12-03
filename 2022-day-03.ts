import * as utils from './utils';

const testInput1 = {
    input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
    expected: 157,
    expectedPartTwo: 70,
};

const priority = (char: string): number => {
    if (/[a-z]/.test(char)) {
        return char.codePointAt(0) - 96;
    }
    return char.codePointAt(0) - 38;
};

const main = (input: string, partTwo = false) => {
    const lines = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.trim());

    let sum = 0;
    for (const line of lines) {
        const firstHalf = line.slice(0, line.length / 2);
        const secondHalf = line.slice(line.length / 2);

        const firstHalfChars = new Set(firstHalf);
        for (const c of secondHalf) {
            if (firstHalfChars.has(c)) {
                const p = priority(c);
                sum += p;
                break;
            }
        }
    }

    let sum2 = 0;
    for (let i = 0; i < lines.length; i += 3) {
        const lineA = new Set(lines[i]);
        const lineB = new Set(lines[i + 1]);
        const lineC = new Set(lines[i + 2]);

        const lineAB = [...lineA].filter((a) => lineB.has(a));
        const lineABC = [...lineAB].find((a) => lineC.has(a));

        sum2 += priority(lineABC);
    }

    if (partTwo) {
        return sum2;
    }

    return sum;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2022, 3);
    const result1 = main(input);
    utils.test(result1, 7903);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 2548);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
