import * as utils from './utils';

const testInput1 = {
    input: `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`,
    expected: 58,
};

const setTile = (map, i, j, data) => {
    try {
        if (i === -1) {
            i = map.length - 1;
        }
        if (j === -1) {
            j = map[0].length - 1;
        }
        if (i === map.length) {
            i = 0;
        }
        if (j === map[0].length) {
            j = 0;
        }
        map[i][j] = data;
    } catch (e) {
        console.error(e);
    }
};

const tile = (map, i, j) => {
    try {
        if (i === -1) {
            i = map.length - 1;
        }
        if (j === -1) {
            j = map[0].length - 1;
        }
        if (i === map.length) {
            i = 0;
        }
        if (j === map[0].length) {
            j = 0;
        }
        return map[i][j];
    } catch (e) {
        console.error(e);
    }
};

const main = (input: string, partTwo = false) => {
    let map = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split(''));

    for (let step = 0; ; step++) {
        let anyChange = false;

        ['>', 'v'].forEach((dir) => {
            const mapCopy = map.map((row) => row.slice());
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if (map[i][j] === dir) {
                        if (dir === '>') {
                            if (tile(map, i, j + 1) === '.') {
                                setTile(mapCopy, i, j + 1, dir);
                                setTile(mapCopy, i, j, '.');
                                anyChange = true;
                            }
                        } else if (dir === 'v') {
                            if (tile(map, i + 1, j) === '.') {
                                setTile(mapCopy, i + 1, j, dir);
                                setTile(mapCopy, i, j, '.');
                                anyChange = true;
                            }
                        }
                    }
                }
            }
            map = mapCopy;
        });

        let res = '';
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                res += map[i][j];
            }
            res += '\n';
        }
        console.log('\nstep:', step + 1);
        console.log(res);

        //         if (step === 0) {
        //             let test = `....>.>v.>
        // v.v>.>v.v.
        // >v>>..>v..
        // >>v>v>.>.v
        // .>v.v...v.
        // v>>.>vvv..
        // ..v...>>..
        // vv...>>vv.
        // >.v.v..v.v`;

        //             let test2 = test
        //                 .split('\n')
        //                 .filter(Boolean)
        //                 .map((line) => line.split(''));
        //             for (let i = 0; i < map.length; i++) {
        //                 for (let j = 0; j < map[i].length; j++) {
        //                     if (test2[i][j] !== map[i][j]) {
        //                         console.error('test failed', test2[i][j], map[i][j]);
        //                     }
        //                 }
        //             }
        //         }

        //         if (step === 1) {
        //             let test = `>.v.v>>..v
        // v.v.>>vv..
        // >v>.>.>.v.
        // >>v>v.>v>.
        // .>..v....v
        // .>v>>.v.v.
        // v....v>v>.
        // .vv..>>v..
        // v>.....vv.`;

        //             let test2 = test
        //                 .split('\n')
        //                 .filter(Boolean)
        //                 .map((line) => line.split(''));
        //             for (let i = 0; i < map.length; i++) {
        //                 for (let j = 0; j < map[i].length; j++) {
        //                     if (test2[i][j] !== map[i][j]) {
        //                         console.error('test failed', test2[i][j], map[i][j]);
        //                     }
        //                 }
        //             }
        //         }

        //         if (step === 2) {
        //             let test = `v>v.v>.>v.
        // v...>>.v.v
        // >vv>.>v>..
        // >>v>v.>.v>
        // ..>....v..
        // .>.>v>v..v
        // ..v..v>vv>
        // v.v..>>v..
        // .v>....v..`;

        //             let test2 = test
        //                 .split('\n')
        //                 .filter(Boolean)
        //                 .map((line) => line.split(''));
        //             for (let i = 0; i < map.length; i++) {
        //                 for (let j = 0; j < map[i].length; j++) {
        //                     if (test2[i][j] !== map[i][j]) {
        //                         console.error('test failed', test2[i][j], map[i][j]);
        //                     }
        //                 }
        //             }
        //         }

        if (!anyChange) {
            return step + 1;
        }
    }
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2021, 25);
    const result1 = main(input);
    utils.test(result1, 15160);

    // const result2 = main(input);
    // utils.test(result2, 46772);

    console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
