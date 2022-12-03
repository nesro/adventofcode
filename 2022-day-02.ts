import * as utils from './utils';

const testInput1 = {
    input: `A Y
B X
C Z`,
    expected: 15,
    expectedPartTwo: 12,
};

type Play = 'rock' | 'paper' | 'scissors';

const beats = (playerA: Play, playerB: Play): number => {
    const rockPoints = 1;
    const paperPoints = 2;
    const scissorsPoints = 3;
    const losePoints = 0;
    const drawPoints = 3;
    const winPoints = 6;

    if (playerA === playerB) {
        switch (playerA) {
            case 'rock': {
                return rockPoints + drawPoints;
            }
            case 'paper': {
                return paperPoints + drawPoints;
            }
            case 'scissors': {
                return scissorsPoints + drawPoints;
            }
        }
    }

    if (playerA === 'rock') {
        switch (playerB) {
            case 'paper': {
                return rockPoints + losePoints;
            }
            case 'scissors': {
                return rockPoints + winPoints;
            }
        }
    }

    if (playerA === 'paper') {
        switch (playerB) {
            case 'rock': {
                return paperPoints + winPoints;
            }
            case 'scissors': {
                return paperPoints + losePoints;
            }
        }
    }

    if (playerA === 'scissors') {
        switch (playerB) {
            case 'paper': {
                return scissorsPoints + winPoints;
            }
            case 'rock': {
                return scissorsPoints + losePoints;
            }
        }
    }

    return 0;
};

const main = (input: string, partTwo = false) => {
    const table = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.trim().split(' '));

    let points = 0;
    let points2 = 0;
    for (const row of table) {
        const playerA = row[0] === 'A' ? 'rock' : row[0] === 'B' ? 'paper' : 'scissors';
        const playerB = row[1] === 'X' ? 'rock' : row[1] === 'Y' ? 'paper' : 'scissors';

        let needs: Play;
        // X = lose
        // Y = draw
        // Z = win
        switch (playerA) {
            case 'rock': {
                needs = row[1] === 'X' ? 'scissors' : row[1] === 'Y' ? 'rock' : 'paper';
                break;
            }

            case 'paper': {
                needs = row[1] === 'X' ? 'rock' : row[1] === 'Y' ? 'paper' : 'scissors';
                break;
            }

            case 'scissors': {
                needs = row[1] === 'X' ? 'paper' : row[1] === 'Y' ? 'scissors' : 'rock';
                break;
            }
        }

        const add = beats(playerB, playerA);
        points += add;

        const add2 = beats(needs, playerA);
        points2 += add2;
    }

    if (partTwo) {
        return points2;
    }
    return points;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2022, 2);
    const result1 = main(input);
    utils.test(result1, 10310);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 14859);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
