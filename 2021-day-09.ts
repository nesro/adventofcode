import * as utils from './utils';

const getTestRawInput = () => `2199943210
3987894921
9856789892
8767896789
9899965678`;

const getBasinSize = (map: number[][], i, j) => {
    const e = []; // extended map
    for (let y = 0; y < map.length; y++) {
        e[y] = [];
        for (let x = 0; x < map[0].length; x++) {
            e[y][x] = { value: map[y][x], visited: false, isBasin: i === y && j === x };
        }
    }

    for (;;) {
        let anyChange = false;
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                if (!e[y][x].visited && e[y][x].isBasin) {
                    e[y][x].visited = true;

                    // top
                    if (e[y - 1] && e[y - 1][x]?.value < 9) {
                        e[y - 1][x].isBasin = true;
                        anyChange = true;
                    }

                    // bottom
                    if (e[y + 1] && e[y + 1][x]?.value < 9) {
                        e[y + 1][x].isBasin = true;
                        anyChange = true;
                    }

                    // left
                    if (e[y][x - 1]?.value < 9) {
                        e[y][x - 1].isBasin = true;
                        anyChange = true;
                    }

                    // right
                    if (e[y][x + 1]?.value < 9) {
                        e[y][x + 1].isBasin = true;
                        anyChange = true;
                    }
                }
            }
        }
        if (!anyChange) {
            break;
        }
    }

    return e.flat().filter((e) => e.isBasin).length;
};

const main = (input: string, part2 = false) => {
    const map = input.split('\n').map((r) => r.split('').map(Number));

    let sum = 0;
    const lowPoints = [];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            const top = (map[i - 1] && map[i - 1][j]) ?? Number.MAX_SAFE_INTEGER;
            const bottom = (map[i + 1] && map[i + 1][j]) ?? Number.MAX_SAFE_INTEGER;
            const left = map[i][j - 1] ?? Number.MAX_SAFE_INTEGER;
            const right = map[i][j + 1] ?? Number.MAX_SAFE_INTEGER;
            const min = Math.min(top, bottom, left, right);
            const x = map[i][j];

            if (x < min) {
                lowPoints.push([i, j]);
                sum += x + 1;
            }
        }
    }

    if (!part2) {
        return sum;
    }

    let basins = [];
    for (const [i, j] of lowPoints) {
        basins.push(getBasinSize(map, i, j));
    }
    basins = basins.sort((a, b) => b - a);
    return basins[0] * basins[1] * basins[2];
};

(async () => {
    utils.test(main(getTestRawInput()), 15);

    const input = await utils.getInputData(2021, 9);
    const result1 = main(input);
    utils.test(result1, 478);

    utils.test(main(getTestRawInput(), true), 1134);

    const result2 = main(input, true);
    utils.test(result2, 1327014);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
