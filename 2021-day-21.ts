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

/*
111 = 3
112 = 4
113 = 5
121 = 4
122 = 5
123 = 6
131 = 5
132 = 6
133 = 7
211 = 4
212 = 5
213 = 6
221 = 5
222 = 6
223 = 7
231 = 6
232 = 7
233 = 8
311 = 5
312 = 6
313 = 7
321 = 6
322 = 7
323 = 8
331 = 7
332 = 8
333 = 9
*/

const diceResults = [
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1],
];

const stepCache = new Map();
const step = (p1p, p1s, p2p, p2s) => {
    const cached = stepCache.get(`${p1p} ${p1s} ${p2p} ${p2s}`);
    if (cached) {
        return cached;
    }
    if (p2s >= 21) {
        return [0, 1];
    }

    let wins = [0, 0];
    for (const [diceResult, times] of diceResults) {
        let newp1p = (p1p + diceResult) % 10;
        let newp1s = p1s + newp1p + 1;

        // switch players
        const [p1wins, p2wins] = step(p2p, p2s, newp1p, newp1s);

        wins[0] += p2wins * times;
        wins[1] += p1wins * times;
    }

    stepCache.set(`${p1p} ${p1s} ${p2p} ${p2s}`, wins);
    return wins;
};

const main2 = (input: string) => {
    const players = input.split('\n').map((line) => parseInt(line.split(': ')[1], 10) - 1);
    return Math.max(...step(players[0], 0, players[1], 0));
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2021, 21);
    const result1 = main(input);
    utils.test(result1, 503478);

    utils.testPart2(main2, testInput1);

    const result2 = main2(input);
    utils.test(result2, 716241959649754);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
