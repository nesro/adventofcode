import * as utils from './utils';

const getTestRawInput = () => `16,1,2,0,4,2,7,1,2,14`;

const main = (input: string) => {
    const crabs = input.split(',').map(Number);

    const max = Math.max(...crabs);
    const min = Math.min(...crabs);
    let minFuel = Number.MAX_SAFE_INTEGER;

    for (let i = min; i <= max; i++) {
        const fuel = crabs.reduce((acc, curr) => {
            return acc + Math.abs(curr - i);
        }, 0);
        if (fuel < minFuel) {
            minFuel = fuel;
        }
    }

    return minFuel;
};

const main2 = (input: string) => {
    const crabs = input.split(',').map(Number);

    const max = Math.max(...crabs);
    const min = Math.min(...crabs);
    let minFuel = Number.MAX_SAFE_INTEGER;

    for (let i = min; i <= max; i++) {
        const fuel = crabs.reduce((acc, curr) => {
            const dist = Math.abs(curr - i);
            return acc + (dist * (dist + 1)) / 2;
        }, 0);

        if (fuel < minFuel) {
            minFuel = fuel;
        }
    }

    return minFuel;
};

(async () => {
    utils.test(main(getTestRawInput()), 37);

    const input = await utils.getInputData(2021, 7);
    const result1 = main(input);
    utils.test(result1, 348664);

    utils.test(main2(getTestRawInput()), 168);

    const result2 = main2(input);
    utils.test(result2, 100220525);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
