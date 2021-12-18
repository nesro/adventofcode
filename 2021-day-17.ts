import * as utils from './utils';

const testInput = {
    input: 'target area: x=20..30, y=-10..-5',
    expected: 45,
    expectedPartTwo: 112,
};

const main = (input: string, partTwo = false) => {
    const [xL, xH, yL, yH] = input.match(/-?\d+/g).map(Number);

    let maxY = Number.MIN_SAFE_INTEGER;
    const validSolutions = [];
    let maxYi;
    let maxYj;
    // TODO: make it smart. go from small numbers to big numbers and stop when no more solutions cannot be found
    for (let i = -300; i < 300; i++) {
        for (let j = 0; j < 300; j++) {
            let y = 0;
            let x = 0;
            let velY = i;
            let velX = j;
            let newMaxY = Number.MIN_SAFE_INTEGER;
            for (;;) {
                if (xL <= x && x <= xH && yL <= y && y <= yH) {
                    if (newMaxY > maxY) {
                        maxY = newMaxY;
                        maxYi = i;
                        maxYj = j;
                    }
                    validSolutions.push({ i, j });
                    // maxY = Math.max(newMaxY, y);
                    break;
                }
                if (y < yL) {
                    break;
                }

                x += velX;
                y += velY;
                newMaxY = Math.max(newMaxY, y);
                if (velX > 0) {
                    velX--;
                } else if (velX < 0) {
                    velX++;
                }
                velY--;
            }
        }
    }

    if (partTwo) {
        return validSolutions.length;
    }

    return maxY;
};

(async () => {
    utils.testPart1(main, testInput);

    const input = await utils.getInputData(2021, 17);
    const result1 = main(input);
    utils.test(result1, 23005);

    utils.testPart2(main, testInput);

    const result2 = main(input, true);
    utils.test(result2, 2040);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
