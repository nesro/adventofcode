import * as utils from './utils';

const testInput1 = {
    input: `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
    expected: 7,
    expectedPartTwo: 336,
};

const main = (input: string, partTwo = false) => {
    let map = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.trim().split(''));

    let total = 1;
    for (const [dx, dy] of [
        [3, 1],
        [1, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]) {
        let trees = 0;
        for (let y = 0, x = 0; y < map.length; x = (x + dx) % map[y].length, y += dy) {
            if (map[y][x] === '#') {
                trees++;
            }
        }

        if (!partTwo) {
            return trees;
        }
        total *= trees;
    }
    return total;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2020, 3);
    const result1 = main(input);
    utils.test(result1, 211);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 3584591857);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
