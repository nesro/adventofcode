import * as utils from './utils';

const getTestRawInput = () => `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const getTestRawInput2 = () => `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

const test0 = () => `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe`;
const test1 = () => `edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc`;
const test2 = () => `fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg`;
const test3 = () => `fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb`;
const test4 = () => `aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea`;
const test5 = () => `fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb`;
const test6 = () => `dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe`;
const test7 = () => `bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef`;
const test8 = () => `egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb`;
const test9 = () => `gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const main = (input: string) =>
    input
        .split('\n')
        .filter(Boolean)
        .reduce(
            (acc, line) =>
                acc +
                line
                    .split(' | ')[1]
                    .split(' ')
                    .map((w) => w.length)
                    .filter((w) => [2, 3, 4, 7].includes(w)).length,
            0,
        );

const main2 = (input: string) => {
    const lines = input
        .split('\n')
        .filter(Boolean)
        .map((a) => a.split(' | ').map((a) => a.split(' ').map((a) => a.split('').sort().join(''))));

    let sum = 0;
    for (let [left, right] of lines) {
        const find = (cond) => left.splice(left.findIndex(cond), 1)[0];

        const res = [];
        res[1] = find((x) => x.length === 2);
        res[4] = find((x) => x.length === 4);
        res[7] = find((x) => x.length === 3);
        res[8] = find((x) => x.length === 7);
        res[9] = find((x) => res[4].split('').every((y) => x.includes(y)));
        res[0] = find((x) => x.length === 6 && res[1].split('').every((y) => x.includes(y)));
        res[6] = find((x) => x.length === 6);
        res[3] = find((x) => res[7].split('').every((y) => x.includes(y)));
        res[2] = find((x) => res[4].split('').filter((y) => x.includes(y)).length === 2);
        res[5] = find((x) => x.length === 5);

        sum += parseInt(
            right
                .map((signal) =>
                    Object.entries(res)
                        .filter(([, value]) => value === signal)
                        .map(([key]) => key)
                        .join(''),
                )
                .join(''),
            10,
        );
    }

    return sum;
};

(async () => {
    utils.test(main(getTestRawInput()), 26);

    const input = await utils.getInputData(2021, 8);
    const result1 = main(input);
    utils.test(result1, 532);

    utils.test(main2(getTestRawInput2()), 5353);

    utils.test(main2(test0()), 8394);
    utils.test(main2(test1()), 9781);
    utils.test(main2(test2()), 1197);
    utils.test(main2(test3()), 9361);
    utils.test(main2(test4()), 4873);
    utils.test(main2(test5()), 8418);
    utils.test(main2(test6()), 4548);
    utils.test(main2(test7()), 1625);
    utils.test(main2(test8()), 8717);
    utils.test(main2(test9()), 4315);

    utils.test(main2(getTestRawInput()), 61229);

    const result2 = main2(input);
    utils.test(result2, 1011284);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
