import * as utils from './utils';

const testInput1 = {
    input: `D2FE28`,
    expected: { version: 6, type: 4, value: 2021 },
};

const testInput2 = {
    input: `38006F45291200`,
    expected: { version: 1, type: 6, lengthTypeId: '0', subPacketsLength: 27, results: [10, 20] },
};

const testInput3 = {
    input: `EE00D40C823060`,
    expected: { version: 7, type: 3, lengthTypeId: '1', subPacketsLength: 3, results: [1, 2, 3] },
};

const testInput4 = {
    input: '8A004A801A8002F478',
    expected: { version: 7, type: 3, lengthTypeId: '1', subPacketsLength: 3, results: [1, 2, 3], totalSum: 16 },
};

const main = (input: string, partTwo = false) => {
    const bits = input
        .split('')
        .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
        .join('');

    for (let i = 0; ; ) {
        const version = parseInt(bits.slice(i, i + 3), 2);
        i += 3;
        const type = parseInt(bits.slice(i, i + 3), 2);
        i += 3;

        // type 4 = lit value
        if (type === 4) {
            let result = '';
            for (;;) {
                const lastGroup = bits.slice(i, i + 1);
                i++;
                result += bits.slice(i, i + 4);
                i += 4;
                if (lastGroup === '0') {
                    break;
                }
            }
            return { version, type, value: parseInt(result, 2) };
        } else {
            const lengthTypeId = bits.slice(i, i + 1);
            i++;

            // If the length type ID is 0, then the next 15 bits are a number that represents
            // the total length in bits of the sub-packets contained by this packet.
            const results = [];
            if (lengthTypeId === '0') {
                const subPacketsLength = parseInt(bits.slice(i, i + 15), 2);
                i += 15;

                let j = 0; // how muuch from len
                for (;;) {
                    const v = bits.slice(i, i + 3);
                    i += 3;
                    j += 3;
                    const t = bits.slice(i, i + 3);
                    i += 3;
                    j += 3;

                    let result = '';
                    for (;;) {
                        const lastGroup = bits.slice(i, i + 1);
                        i++;
                        j++;
                        result += bits.slice(i, i + 4);
                        i += 4;
                        j += 4;
                        if (lastGroup === '0') {
                            break;
                        }
                        if (j >= subPacketsLength) {
                            break;
                        }
                    }
                    const vv = parseInt(result, 2);
                    results.push(vv);
                    console.log({ v, t, value: vv });

                    console.log(v, t);

                    if (j === subPacketsLength) {
                        break;
                    }
                }

                return { version, type, lengthTypeId, subPacketsLength, results };
            }
            // If the length type ID is 1, then the next 11 bits are a number that
            // represents the number of sub-packets immediately contained by this packet.
            else {
                const subPacketsLength = parseInt(bits.slice(i, i + 11), 2);
                i += 11;

                for (let j = 0; j < subPacketsLength; j++) {
                    const v = bits.slice(i, i + 3);
                    i += 3;
                    const t = bits.slice(i, i + 3);
                    i += 3;
                    results.push(parseInt(bits.slice(i, i + 5), 2));
                    i += 5;
                }

                return { version, type, lengthTypeId, subPacketsLength, results };
            }
        }

        /*

If the length type ID is 0, then the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.

*/

        break;
    }

    return 1;
};

(async () => {
    // utils.testPart1(main, testInput1);
    // utils.testPart1(main, testInput2);
    // utils.testPart1(main, testInput3);
    utils.testPart1(main, testInput4);
    console.log('lol');

    // const input = await utils.getInputData(2021, 15);
    // const result1 = main(input);
    // utils.test(result1, 824);

    // utils.test(main(getTestRawInput(), true), 315);

    // const result2 = main(input, true);
    // utils.test(result2, 3063);

    // console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
