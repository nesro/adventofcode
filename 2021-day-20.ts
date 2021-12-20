import * as utils from './utils';
import savePixels from 'save-pixels';
import zeros from 'zeros';
import fs from 'fs';

const testInput1 = {
    input: `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`,
    expected: 35,
    expectedPartTwo: 3351,
};

const printMap = (map) => {
    let count = 0;
    // let res = '';

    const pixels = zeros([map.length, map.length]);

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            const p = map[i][j] === '1' ? '#' : '.';
            if (p === '#') {
                count++;
                pixels.set(j, i, 255);
            }
            // res += p;
        }
        // res += '\n';
    }
    // console.error(res);
    savePixels(pixels, 'png').pipe(fs.createWriteStream(`tmp-${Date.now()}.png`));

    return count;
};

const main = (input: string, partTwo = false) => {
    const parts = input.split('\n\n').filter(Boolean);

    const alg = parts[0].split('').map((c) => (c === '#' ? '1' : '0'));
    let mapOrig = parts[1]
        .split('\n')
        .filter(Boolean)
        .map((row) => row.split('').map((c) => (c === '#' ? '1' : '0')));

    let count;

    let mapLen = mapOrig.length;
    if (mapLen !== mapOrig[0].length) {
        throw new Error('not square');
    }

    let map = [];
    const constant = 100;
    for (let i = 0; i < 2 * constant + mapLen; i++) {
        map[i] = [];
        for (let j = 0; j < 2 * constant + mapLen; j++) {
            map[i][j] = '0';
        }
    }
    for (let i = constant; i < constant + mapLen; i++) {
        for (let j = constant; j < constant + mapLen; j++) {
            map[i][j] = mapOrig[i - constant][j - constant];
        }
    }

    printMap(map);

    const steps = partTwo ? 50 : 2;
    for (let step = 1; step <= steps; step++) {
        let newMap = [];
        for (let i = 0; i < 2 * constant + mapLen; i++) {
            newMap[i] = [];
            for (let j = 0; j < 2 * constant + mapLen; j++) {
                newMap[i][j] = '0';
            }
        }

        for (let i = 1; i < map.length - 1; i++) {
            for (let j = 1; j < map.length - 1; j++) {
                let index = '';
                [-1, 0, 1].forEach((di) => {
                    [-1, 0, 1].forEach((dj) => {
                        index += map[i + di][j + dj];
                    });
                });

                const indexNumber = parseInt(index, 2);
                newMap[i] = newMap[i] || [];
                newMap[i][j] = alg[indexNumber] === '1' ? '1' : '0';

                // something is wrong, but this fixes it :) there were two white lines :D
                if (i === map.length - 2) {
                    newMap[i][j] = newMap[i - 1][j];
                }
                if (j === map.length - 2) {
                    newMap[i][j] = newMap[i][j - 1];
                }
            }
        }
        map = newMap;

        // console.error(`step ${step}`);
        count = printMap(map);
    }

    return count;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2021, 20);
    const result1 = main(input);
    utils.test(result1, 5275);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 16482);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
