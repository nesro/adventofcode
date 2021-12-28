// inspired by this solution as this what I wanted to to do on my own in the first place
// I looked up some hints since I was afraid of being stuck and it was a mistake I regret now
// https://www.mattkeeter.com/blog/2021-12-27-brute/

/*

130 nesro/adventofcode % time node --max-old-space-size=16384 -- node_modules/.bin/ts-node -P tsconfig.json 2021-day-24.ts
states length: 1, deduped: 0
states length: 9, deduped: 0
states length: 81, deduped: 0
states length: 729, deduped: 0
states length: 6561, deduped: 0
states length: 8748, deduped: 50301
states length: 65610, deduped: 13122
states length: 590490, deduped: 0
states length: 1180980, deduped: 4133430
states length: 5904900, deduped: 4723920
states length: 7217100, deduped: 45927000
states length: 8654688, deduped: 56299212
states length: 7981740, deduped: 69910452
states length: 9333927, deduped: 62501733
{ min: 34171911181211 } { max: 99893999291967 }
Result 1: 1
node --max-old-space-size=16384 -- node_modules/.bin/ts-node -P tsconfig.json  804.66s user 510.09s system 99% cpu 22:03.97 total

*/

import * as utils from './utils';

/*


w0 + 6 * 26 + w1 + 12 * 26 + w2 + 5 * 26 + w3 + 10 / 26 * 26 + w4 + 7 * 26 + w5 * 26 + w6 + 4 / 26 * 26 + w7 + 12 * 26 + w8 + 14 / 26 * 26 + w9 + 13 / 26 * 26 + w10 + 10 / 26 * 26 + w11 + 11 / 26 * 26 + w12 + 9 / 26 * 26 + w13 + 9




inp w => w0
//mul x 0
//add x z
//mod x 26
//div z 1
add x 12 => x=12
eql x w => x=0 (nikdy true)
eql x 0 => x=1 (vzdycky true)
// mul y 0
add y 25 => y=25
mul y x => y=25
add y 1 => y=26
// mul z y
mul y 0 => y=0
add y w => y=w0 !!!!!!!!!
add y 6 => y=w0+6
mul y x => y=w0+6
// add z y
inp w => w1
mul x 0 => x=0
add x z => x=0
mod x 26 => x=0
// div z 1
add x 11 => x=11
eql x w => ..
eql x 0 => x=0
mul y 0 => y=0
add y 25 => y=25
mul y x => y=0
add y 1 => y=1
// mul z y
mul y 0 => y=0
add y w => y=w1
add y 12 = y=w1+12 ?????
mul y x = y=0
add z y => z=0
inp w => w3 ----------------------------------
mul x 0 => x=0
add x z => x=0
mod x 26 => x=0
div z 1 => z=0
add x 10 => x=10
eql x w => x=0 (nikdy true)
eql x 0 => x=0
mul y 0 => y=0
add y 25 => y=25
mul y x => y=0
add y 1 => y=1
mul z y => z=0
mul y 0 => y=0
add y w => y=w3
add y 5 => y=w3+5
mul y x => y=0
add z y => z=0
inp w => w4 ----------------------------------
mul x 0 => x=0
add x z => x=0
mod x 26 => x=0
div z 1 => z=0
add x 10 => x=10
eql x w => x=0 (nikdy true, w4 je 1-9)
eql x 0 => x=1
mul y 0 => y=0
add y 25 => y=25
mul y x => y=25
add y 1 => y=26
mul z y => z=0
mul y 0 => y=0
add y w => y=w4
add y 10 => y=w4+10
mul y x => y=>w4+10
add z y => z=w4+10
inp w => w5 --------------
mul x 0 => x=0
add x z => x=w4+10
mod x 26 => x=(w4+10)%26  => x=w4+10
div z 26 => z=w4+10
add x -16 => x=w4+10-16 = w4-6
eql x w => x=0
eql x 0 => x=1
mul y 0 => y=0
add y 25 => y=0
mul y x => y=0
add y 1 => y=1
mul z y => z=w4+10
mul y 0 => y=0
add y w => y=w4
add y 7 => y=w4+7
mul y x => y=
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 0
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 12
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 4
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -4
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 12
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 14
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -7
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 13
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -8
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -4
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 11
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 9
mul y x
add z y
inp w
mul x 0 => x=0
add x z => x=z
mod x 26
div z 26
add x -8
eql x w
eql x 0 x=0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0 y=0
add y w y=y+w13
add y 9 y=y+9
mul y x y=y*x (mozna je x=1)
add z y z=z+y ===>>>> Z musi byt z+(w13+9)=1 => z = 1-(w13+9)

9999999999991

*/

const testInput1 = {
    input: `inp w
mul x 0
add x z
mod x 26
div z 1
add x 12
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y`,
    expected: 16,
};

const regIndex = (reg: string): number => {
    switch (reg) {
        case 'x':
            return 0;
        case 'y':
            return 1;
        case 'z':
            return 2;
        case 'w':
            return 3;
        default:
            throw new Error(`Unknown register ${reg}`);
    }
};

const regValue = (registers: number[], reg: string): number => {
    switch (reg) {
        case 'x':
            return registers[0];
        case 'y':
            return registers[1];
        case 'z':
            return registers[2];
        case 'w':
            return registers[3];
        default:
            const num = parseInt(reg, 10);
            if (isNaN(num)) {
                throw new Error(`Unknown register ${reg}`);
            }
            return num;
    }
};

const dedupMap = (states) => {
    const dedupMap = new Map();
    let deduped = 0;
    for (const s of states) {
        const key = [s[0], s[1], s[2], s[3]].join(',');
        const val = dedupMap.get(key);

        if (val) {
            deduped++;
            s[4] = Math.min(val[4], s[4]);
            s[5] = Math.max(val[5], s[5]);
        }

        dedupMap.set(key, s);
    }
    states = Array.from(dedupMap.values());
    console.log(`states length: ${states.length}, deduped: ${deduped}`);
    return states;
};

const main = (input: string, partTwo = false) => {
    const commands = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split(' '));

    const regs = [];

    // 0 - reg0
    // 1 - reg1
    // 2 - reg2
    // 3 - reg3
    // 4 - min
    // 5 - max
    let states = [[0, 0, 0, 0, 0, 0]];

    for (const command of commands) {
        const ra = regIndex(command[1]);
        switch (command[0]) {
            case 'inp':
                states = dedupMap(states);
                const next = [];
                for (const s of states) {
                    for (let i = 1; i <= 9; i++) {
                        const newState = [...s];
                        newState[ra] = i;
                        newState[4] = newState[4] * 10 + i;
                        newState[5] = newState[5] * 10 + i;
                        next.push(newState);
                    }
                }
                states = next;
                break;
            case 'add':
                for (const s of states) {
                    s[ra] += regValue(s, command[2]);
                }
                break;
            case 'mul':
                for (const s of states) {
                    s[ra] *= regValue(s, command[2]);
                }
                break;
            case 'div':
                for (const s of states) {
                    const b = regValue(s, command[2]);
                    if (b === 0) {
                        throw new Error('Division by zero');
                    }

                    s[ra] = Math.floor(s[ra] / b);
                }
                break;
            case 'mod':
                for (const s of states) {
                    const b = regValue(s, command[2]);
                    if (s[ra] < 0 || b <= 0) {
                        throw new Error(`Bad modulo args s[${ra}]=${s[ra]}, b=${b}`);
                    }
                    s[ra] = s[ra] % b;
                }
                break;
            case 'eql':
                for (const s of states) {
                    s[ra] = s[ra] === regValue(s, command[2]) ? 1 : 0;
                }
                break;
            default:
                throw new Error(`Unknown command ${command[0]}`);
        }
    }

    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    for (const s of states) {
        if (s[2] !== 0) {
            continue;
        }
        if (s[4] < min) {
            min = s[4];
        }
        if (s[5] > max) {
            max = s[5];
        }
    }

    console.log({ min }, { max });
    return 1;
};

(async () => {
    // utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2021, 24);
    const result1 = main(input);
    // utils.test(result1, 974);

    console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
