import * as utils from './utils';

const getTestRawInput = () => `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const main = (input: string, partTwo = false) => {
    let [dotsPart, foldsPart] = input.split('\n\n').filter(Boolean);

    let dots = dotsPart.split('\n').map((line) => line.split(',').map(Number));
    const folds: [string, number][] = foldsPart
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split(' ')[2].split('='))
        .map(([x, y]) => [x, parseInt(y, 10)]);

    const newMap = new Set();
    for (const [foldAxis, fold] of folds) {
        const newDots = [];

        for (const [x, y] of dots) {
            if (foldAxis === 'x') {
                if (x <= fold) {
                    newDots.push([x, y]);
                    newMap.add(`[${x}, ${y}]`);
                } else {
                    newMap.add(`[${fold - (x - fold)}, ${y}]`);
                    newDots.push([fold - (x - fold), y]);
                }
            } else if (foldAxis === 'y') {
                if (y <= fold) {
                    newDots.push([x, y]);
                    newMap.add(`[${x}, ${y}]`);
                } else {
                    newMap.add(`[${x}, ${fold - (y - fold)}]`);
                    newDots.push([x, fold - (y - fold)]);
                }
            } else {
                throw new Error('Unknown axis');
            }
        }

        dots = newDots;

        if (!partTwo) {
            break;
        }
    }

    let print = '';
    const min = dots.reduce((min, [x, y]) => Math.min(min, x, y), Infinity);
    const max = dots.reduce((max, [x, y]) => Math.max(max, x, y), -Infinity);
    for (let y = min; y <= max; y++) {
        for (let x = min; x <= max; x++) {
            if (newMap.has(`[${x}, ${y}]`)) {
                print += '#';
            } else {
                print += '.';
            }
        }
        print += '\n';
    }
    console.log(print);

    return newMap.size;
};

(async () => {
    utils.test(main(getTestRawInput()), 17);

    const input = await utils.getInputData(2021, 13);
    const result1 = main(input);
    utils.test(result1, 755);

    utils.test(main(getTestRawInput(), true), 24);

    const result2 = main(input, true);
    utils.test(result2, 2042);
    // result is "blkjrbag"

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
