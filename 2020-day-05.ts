import * as utils from './utils';

const testInput1 = {
    input: `FBFBBFFRLR`,
    expected: 357,
};

const main = (input: string, partTwo = false) => {
    const seats = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.trim().split(''));

    let maxSeatId = 0;
    let seatIds = [];
    for (const seat of seats) {
        let rowMin = 0;
        let rowMax = 127;
        let colMin = 0;
        let colMax = 7;
        for (let i = 0; i < 7; i++) {
            if (seat[i] === 'F') {
                rowMax = Math.floor((rowMax + rowMin) / 2);
            } else {
                rowMin = Math.floor((rowMax + rowMin) / 2);
            }
        }
        for (let i = 7; i < 10; i++) {
            if (seat[i] === 'L') {
                colMax = Math.floor((colMax + colMin) / 2);
            } else {
                colMin = Math.floor((colMax + colMin) / 2);
            }
        }
        const seatId = rowMax * 8 + colMax;
        seatIds.push(seatId);
        maxSeatId = Math.max(maxSeatId, seatId);
    }

    if (!partTwo) {
        return maxSeatId;
    }

    seatIds = seatIds.sort((a, b) => a - b);

    for (let i = 0; i < seatIds.length - 1; i++) {
        if (seatIds[i + 1] - seatIds[i] === 2) {
            return seatIds[i] + 1;
        }
    }

    return 0;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2020, 5);
    const result1 = main(input);
    utils.test(result1, 928);

    const result2 = main(input, true);
    utils.test(result2, 610);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
