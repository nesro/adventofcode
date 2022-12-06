import * as utils from './utils';

const testInput1 = {
    input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
    expected: 11,
    expectedPartTwo: 26,
};

const main = (input: string, partTwo = false) => {
    const size = partTwo ? 14 : 4;
    for (let i = size; i < input.length; i++) {
        if (new Set(input.slice(i - size, i)).size === size) {
            return i;
        }
    }
    return 0;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2022, 6);
    const result1 = main(input);
    utils.test(result1, 1544);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 2145);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
