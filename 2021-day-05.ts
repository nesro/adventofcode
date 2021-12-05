import * as utils from './utils';

const getTestRawInput = () => {
    return `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
};

const parseInput = (input: string) => {
    const lines = input.split('\n').filter(Boolean);
    const points = lines.map((l) => l.split(' -> ').map((p) => p.split(',').map((n) => parseInt(n, 10))));

    // x1 = x2 or y1 = y2
    const horOrVer = points.filter((p) => p[0][0] === p[1][0] || p[0][1] === p[1][1]);

    return { horOrVer, points };
};

const main = (input: string, onlyHorVer = true) => {
    const { horOrVer, points } = parseInput(input);

    const field = [];
    const inputPoints = onlyHorVer ? horOrVer : points;
    for (const line of inputPoints) {
        let [x1, y1] = line[0];
        const [x2, y2] = line[1];

        while (x1 !== x2 || y1 !== y2) {
            field[x1] = field[x1] || [];
            field[x1][y1] = (field[x1][y1] || 0) + 1;

            if (x1 < x2) {
                x1++;
            } else if (x1 > x2) {
                x1--;
            }

            if (y1 < y2) {
                y1++;
            } else if (y1 > y2) {
                y1--;
            }
        }
        field[x2] = field[x2] || [];
        field[x2][y2] = (field[x2][y2] || 0) + 1;
    }

    //// write out the board
    // let out = '';
    // for (let i = 0; i <= max; i++) {
    //     for (let j = 0; j <= max; j++) {
    //         out += String((field[j] && field[j][i]) || '.');
    //     }
    //     out += '\n';
    // }
    // console.log(out);

    return field.flat(1).reduce((acc, val) => {
        return acc + (val > 1);
    }, 0);
};

(async () => {
    const testResult = main(getTestRawInput());
    if (testResult !== 5) {
        throw new Error(`Test failed. testResult=${testResult}`);
    }

    const input = await utils.getInputData(2021, 5);
    const result1 = main(input);
    if (result1 !== 5306) {
        throw new Error(`Result 1 is not correct. result1=${result1}`);
    }

    const result2 = main(input, false);
    if (result2 !== 17787) {
        throw new Error(`Result 2 is not correct. result2=${result1}`);
    }

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
