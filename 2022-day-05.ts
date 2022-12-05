import * as utils from './utils';

const testInput1 = {
    input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
    expected: 'CMZ',
    expectedPartTwo: 'MCD',
};

const main = (input: string, partTwo = false) => {
    const parts = input.split('\n\n').filter(Boolean);

    const stacks = [];
    const stacksRaw = parts[0].split('\n').filter(Boolean);
    for (const stackRaw of stacksRaw) {
        const thisStack = [];
        for (let i = 1; i < stackRaw.length; i += 4) {
            thisStack.push(stackRaw[i]);
        }
        stacks.push(thisStack);
    }

    const stacks90 = [];
    for (let i = 0; i < stacks[0].length; i++) {
        stacks90[i] = [];
        for (let j = stacks.length - 2; j >= 0; j--) {
            const c = stacks[j][i];
            if (c === ' ') {
                break;
            }
            stacks90[i].push(c);
        }
    }

    const commands = parts[1].split('\n').filter(Boolean);

    for (const command of commands) {
        const [, count, , from, , to] = command.split(' ').map((n) => Number.parseInt(n));

        if (partTwo) {
            const pop = stacks90[from - 1].splice(stacks90[from - 1].length - count);
            stacks90[to - 1].push(...pop);
        } else {
            for (let i = 0; i < count; i++) {
                const pop = stacks90[from - 1].pop();
                stacks90[to - 1].push(pop);
            }
        }
    }

    let ret = '';
    for (const stack of stacks90) {
        ret += stack.pop();
    }

    return ret;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2022, 5);
    const result1 = main(input);
    utils.test(result1, 'BSDMQFLSP');

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 'PGSQBFLDP');

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
