import * as utils from './utils';

const getTestRawInput = () => `3,4,3,1,2`;

const mainNaive = (input: string, days: number) => {
    const fish = input.split(',').map(Number);

    for (let i = 0; i < days; i++) {
        // console.log(`Day ${i}: ${fish.map((f) => `${f}`)} fish`);
        const fishLength = fish.length;
        for (let j = 0; j < fishLength; j++) {
            if (fish[j] === 0) {
                fish.push(8);
                fish[j] = 6;
            } else {
                fish[j]--;
            }
        }
    }

    return fish.length;
};

const main = (input: string, days: number) => {
    let fish = [];

    input
        .split(',')
        .map(Number)
        .forEach((f) => (fish[f] = (fish[f] || 0) + 1));

    for (let i = 0; i < days; i++) {
        const newFish = [];
        newFish[0] = fish[1] || 0;
        newFish[1] = fish[2] || 0;
        newFish[2] = fish[3] || 0;
        newFish[3] = fish[4] || 0;
        newFish[4] = fish[5] || 0;
        newFish[5] = fish[6] || 0;
        newFish[6] = (fish[0] || 0) + (fish[7] || 0); // both 7 and 0 generates 6
        newFish[7] = fish[8] || 0;
        newFish[8] = fish[0] || 0;

        fish = newFish;
    }

    return fish.reduce((a, b) => a + b, 0);
};

(async () => {
    utils.test(main(getTestRawInput(), 18), 26);
    utils.test(main(getTestRawInput(), 80), 5934);

    const input = await utils.getInputData(2021, 6);
    const result1 = main(input, 80);
    utils.test(result1, 361169);

    utils.test(main(getTestRawInput(), 256), 26984457539);

    const result2 = main(input, 256);
    utils.test(result2, 1634946868992);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
