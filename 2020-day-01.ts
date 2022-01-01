import * as utils from './utils';

const testInput1 = {
    input: `1721
979
366
299
675
1456`,
    expected: 514579,
    expectedPartTwo: 241861950,
};

const main = (input: string, partTwo = false) => {
    let numbers = input
        .split('\n')
        .filter(Boolean)
        .map((line) => parseInt(line, 10));

    for (let i = 0; i < numbers.length - 2; i++) {
        for (let j = i + 1; j < numbers.length - 1; j++) {
            if (partTwo) {
                for (let k = j + 1; k < numbers.length; k++) {
                    if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                        return numbers[i] * numbers[j] * numbers[k];
                    }
                }
            } else {
                if (numbers[i] + numbers[j] === 2020) {
                    return numbers[i] * numbers[j];
                }
            }
        }
    }
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2020, 1);
    const result1 = main(input);
    utils.test(result1, 1019904);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 176647680);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
