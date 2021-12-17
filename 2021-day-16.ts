import * as utils from './utils';

const testInput4 = {
    input: '8A004A801A8002F478',
    expected: 16,
};

const testInput5 = {
    input: '620080001611562C8802118E34',
    expected: 12,
};

/*
input 5 graphic representation :D

                                           t=8        t=8                          t=8        t=8
                                        vvvttt01234vvvttt01234                  vvvttt01234vvvttt01234
01100010000000001000000000000000000101100001000101010110001011001000100000000010000100011000111000110100
vvvtttL___________                      0123456789012345678901vvvtttL
                  vvvtttL_______________                             ___________
                                       ^ 22bits                                ^ 2 values
                                        <-------------------->      

v=3+5+1+3=12
*/

const testInput6 = {
    input: 'C0015000016115A2E0802F182340',
    expected: 23,
};

const testInput7 = {
    input: 'A0016C880162017C3686B18A3D4780',
    expected: 31,
};

// pt2 tests

const testInput8 = {
    input: 'C200B40A82',
    expected: 3,
};

const testInput9 = {
    input: '04005AC33890',
    expected: 54,
};

const testInput10 = {
    input: '880086C3E88112',
    expected: 7,
};

const testInput11 = {
    input: 'CE00C43D881120',
    expected: 9,
};

const testInput12 = {
    input: 'D8005AC2A8F0',
    expected: 1,
};

const testInput13 = {
    input: 'F600BC2D8F',
    expected: 0,
};

const testInput14 = {
    input: '9C005AC2F8F0',
    expected: 0,
};

const testInput15 = {
    input: '9C0141080250320F1802104A08',
    expected: 1,
};

const parsePacket = (bits: string, i: number) => {
    const version = parseInt(bits.slice(i, i + 3), 2);
    i += 3;
    const type = parseInt(bits.slice(i, i + 3), 2);
    i += 3;

    let versionSum = version;
    let result;
    const results = [];

    if (type === 4) {
        let resultLiteral = '';
        for (;;) {
            const lastGroup = bits.slice(i, i + 1);
            i++;
            resultLiteral += bits.slice(i, i + 4);
            i += 4;
            if (lastGroup === '0') {
                break;
            }
        }
        result = parseInt(resultLiteral, 2);
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
                results.push(operator1.result);
            }
        } else {
            const subPacketsLength = parseInt(bits.slice(i, i + 11), 2);
            i += 11;

            for (let j = 0; j < subPacketsLength; j++) {
                const operator2 = parsePacket(bits, i);
                i = operator2.i;
                versionSum += operator2.versionSum;
                results.push(operator2.result);
            }
        }
    }

    switch (type) {
        case 0:
            result = results.reduce((a, b) => a + b);
            break;
        case 1:
            result = results.reduce((a, b) => a * b);
            break;
        case 2:
            result = Math.min(...results);
            break;
        case 3:
            result = Math.max(...results);
            break;
        case 5:
            result = results[0] > results[1] ? 1 : 0;
            break;
        case 6:
            result = results[0] < results[1] ? 1 : 0;
            break;
        case 7:
            result = results[0] === results[1] ? 1 : 0;
            break;
    }

    return { i, versionSum, type, result };
};

const main = (input: string, partTwo = false) => {
    const bits = input
        .split('')
        .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
        .join('');

    const result = parsePacket(bits, 0);
    if (partTwo) {
        return result.result;
    } else {
        return result.versionSum;
    }
};

(async () => {
    utils.testPart1(main, testInput4);
    utils.testPart1(main, testInput5);
    utils.testPart1(main, testInput6);
    utils.testPart1(main, testInput7);

    const input = await utils.getInputData(2021, 16);
    const result1 = main(input);
    utils.test(result1, 974);

    utils.testPart2(main, testInput8);
    utils.testPart2(main, testInput9);
    utils.testPart2(main, testInput10);
    utils.testPart2(main, testInput11);
    utils.testPart2(main, testInput12);
    utils.testPart2(main, testInput13);
    utils.testPart2(main, testInput14);
    utils.testPart2(main, testInput15);

    const result2 = main(input, true);
    utils.test(result2, 180616437720);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
