import * as utils from './utils';

const testInput1 = {
    input: `Player 1 starting position: 4
Player 2 starting position: 8`,
    expected: 739785,
    expectedPartTwo: 444356092776315,
};

const main = (input: string, partTwo = false) => {
    const players = input.split('\n').map((line) => ({ score: 0, pos: parseInt(line.split(': ')[1], 10) }));

    let lastDice = 1;
    const maxDice = 1000;
    let rolledTotal = 0;

    for (;;) {
        for (const p of [0, 1]) {
            const rolled = (lastDice++ % maxDice) + (lastDice++ % maxDice) + (lastDice++ % maxDice);
            rolledTotal += 3;

            players[p].pos = players[p].pos + rolled;

            while (players[p].pos > 10) {
                players[p].pos -= 10;
            }

            players[p].score += players[p].pos;

            if (players[p].score >= maxDice) {
                const r = players[(p + 1) % 2].score * rolledTotal;
                return r;
            }
        }
    }
};

// pt2 --------------------------------------------------------------
const main2 = (input: string, partTwo = false) => {
    const players = input.split('\n').map((line) => ({ score: 0, pos: parseInt(line.split(': ')[1], 10) }));
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2021, 21);
    const result1 = main(input);
    utils.test(result1, 503478);

    // utils.testPart2(main, testInput1);

    // const result2 = main(input, true);
    // utils.test(result2, 16482);

    console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
