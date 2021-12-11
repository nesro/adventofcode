import * as utils from './utils';

const getTestRawInput = () => `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const main = (input: string) => {
    const lines = input.split('\n').filter(Boolean);
    let score = 0;
    for (const line of lines) {
        const stack = [];
        for (const c of line.split('')) {
            if (['(', '[', '{', '<'].includes(c)) {
                stack.push(c);
            } else {
                const last = stack.pop();
                if (c === ')' && last !== '(') {
                    score += 3;
                    break;
                } else if (c === ']' && last !== '[') {
                    score += 57;
                    break;
                } else if (c === '}' && last !== '{') {
                    score += 1197;
                    break;
                } else if (c === '>' && last !== '<') {
                    score += 25137;
                    break;
                }
            }
        }
    }
    return score;
};

const main2 = (input: string) => {
    const lines = input.split('\n').filter(Boolean);
    let results = [];
    let score = 0;
    for (const line of lines) {
        const stack = [];
        let valid = true;
        for (const c of line.split('')) {
            if (['(', '[', '{', '<'].includes(c)) {
                stack.push(c);
            } else {
                const last = stack.pop();
                if (
                    (c === ')' && last !== '(') ||
                    (c === ']' && last !== '[') ||
                    (c === '}' && last !== '{') ||
                    (c === '>' && last !== '<')
                ) {
                    valid = false;
                    break;
                }
            }
        }
        if (!valid) {
            continue;
        }
        results.push(
            stack.reverse().reduce((acc, c) => {
                if (c === '(') {
                    return acc * 5 + 1;
                } else if (c === '[') {
                    return acc * 5 + 2;
                } else if (c === '{') {
                    return acc * 5 + 3;
                } else if (c === '<') {
                    return acc * 5 + 4;
                }
            }, 0),
        );
    }
    return results.sort((a, b) => a - b)[Math.floor(results.length / 2)];
};

(async () => {
    utils.test(main(getTestRawInput()), 26397);

    const input = await utils.getInputData(2021, 10);
    const result1 = main(input);
    utils.test(result1, 296535);

    utils.test(main2(getTestRawInput()), 288957);

    const result2 = main2(input);
    utils.test(result2, 4245130838);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
