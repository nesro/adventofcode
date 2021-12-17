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
    expected: 16,
};

///

const testInput5 = {
    input: '620080001611562C8802118E34',
    expected: 12,
};
/*
input 5 graphic
                                           t=8        t=8                          t=8
                                        vvvttt01234vvvttt01234                  vvvttt01234vvvttt01234
01100010000000001000000000000000000101100001000101010110001011001000100000000010000100011000111000110100
vvvtttL___________                      0123456789012345678901vvvtttL
                  vvvtttL_______________                             ___________
                                       ^ 22bits                                ^ 2 values
                                        <-------------------->      

v=3+5+1+3=12

*/

///

const testInput6 = {
    input: 'C0015000016115A2E0802F182340',
    expected: 23,
};

const testInput7 = {
    input: 'A0016C880162017C3686B18A3D4780',
    expected: 31,
};

// pt2

const testInput8 = {
    input: 'C200B40A82',
    expected: 3,
};

const parsePacket = (bits: string, i: number) => {
    const version = parseInt(bits.slice(i, i + 3), 2);
    i += 3;
    const type = parseInt(bits.slice(i, i + 3), 2);
    i += 3;

    let versionSum = version;

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
        const r = parseInt(result, 2);
        console.log(r);
    } else {
        const lengthTypeId = bits.slice(i, i + 1);
        i++;

        if (lengthTypeId === '0') {
            const subPacketsLength = parseInt(bits.slice(i, i + 15), 2);
            i += 15;
            const packetEnd = i + subPacketsLength;

            while (i < packetEnd) {
                const operator1 = parsePacket(bits, i);
                versionSum += operator1.versionSum;
                i = operator1.i;
            }
        } else {
            const subPacketsLength = parseInt(bits.slice(i, i + 11), 2);
            i += 11;

            for (let j = 0; j < subPacketsLength; j++) {
                const operator2 = parsePacket(bits, i);
                i = operator2.i;
                versionSum += operator2.versionSum;
            }
        }
    }

    return { i, versionSum };
};

const main = (input: string, partTwo = false) => {
    const bits = input
        .split('')
        .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
        .join('');

    const result = parsePacket(bits, 0);
    return result.versionSum;
};

(async () => {
    // utils.testPart1(main, testInput1);
    // utils.testPart1(main, testInput2);
    // utils.testPart1(main, testInput3);

    utils.testPart1(main, testInput4);
    utils.testPart1(main, testInput5);
    utils.testPart1(main, testInput6);
    utils.testPart1(main, testInput7);

    const input = await utils.getInputData(2021, 16);
    const result1 = main(input);
    utils.test(result1, 974);

    // utils.test(main(getTestRawInput(), true), 315);

    // const result2 = main(input, true);
    // utils.test(result2, 3063);

    // console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
