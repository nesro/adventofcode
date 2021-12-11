import * as utils from './utils';

const getTestRawInput = () => `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const main = (input: string, partTwo = false) => {
    const map = input
        .split('\n')
        .filter(Boolean)
        .map((x) =>
            x.split('').map((x) => ({
                num: parseInt(x, 10),
                flash: false,
            })),
        );

    let totalFlashes = 0;
    for (let step = 1; partTwo || step < 101; step++) {
        map.flat().forEach((x) => x.num++);

        for (;;) {
            let changed = false;
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if (!map[i][j].flash && map[i][j].num > 9) {
                        map[i][j].flash = true;
                        changed = true;

                        for (let incX = -1; incX <= 1; incX++) {
                            for (let incY = -1; incY <= 1; incY++) {
                                if (map[i + incX] && map[i + incX][j + incY]) {
                                    map[i + incX][j + incY].num++;
                                }
                            }
                        }
                    }
                }
            }
            if (!changed) {
                break;
            }
        }

        if (partTwo && map.flat().every((x) => x.flash)) {
            return step;
        }

        map.flat()
            .filter((x) => x.flash)
            .forEach((x) => {
                x.flash = false;
                x.num = 0;
                totalFlashes++;
            });
    }

    return totalFlashes;
};

(async () => {
    utils.test(main(getTestRawInput()), 1656);

    const input = await utils.getInputData(2021, 11);
    const result1 = main(input);
    utils.test(result1, 1725);

    utils.test(main(getTestRawInput(), true), 195);

    const result2 = main(input, true);
    utils.test(result2, 308);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
