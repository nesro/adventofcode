import * as utils from './utils';

const getTestRawInput = () => `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

// brute force
const main = (input: string, partTwo = false) => {
    let [polymer, rulesInput] = input.split('\n\n');
    const rules = new Map();
    rulesInput
        .split('\n')
        .map((r) => r.split(' -> '))
        .forEach(([l, r]) => rules.set(l, r));

    const steps = partTwo ? 40 : 10;
    for (let step = 0; step < steps; step++) {
        let newPolymer = '';

        for (let i = 0; i < polymer.length - 1; i++) {
            const c1 = polymer[i];
            const c2 = polymer[i + 1];
            const key = `${c1}${c2}`;

            if (rules.has(key)) {
                const x = rules.get(key);
                newPolymer += `${c1}${x}`;
            } else {
                newPolymer += `${c1}`;
            }
        }
        newPolymer += polymer[polymer.length - 1];
        polymer = newPolymer;
    }

    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;
    polymer
        .split('')
        .reduce((m, c) => m.set(c, (m.get(c) ?? 0) + 1), new Map())
        .forEach((v, _) => {
            if (v < min) {
                min = v;
            }
            if (v > max) {
                max = v;
            }
        });

    return max - min;
};

// smart
const incMapKey = (m: Map<string, number>, k: string, v = 1) => m.set(k, (m.get(k) ?? 0) + v);
const main2 = (input: string, partTwo = false) => {
    let [polymer, rulesInput] = input.split('\n\n');
    const rules = new Map();
    rulesInput
        .split('\n')
        .map((r) => r.split(' -> '))
        .forEach(([l, r]) => rules.set(l, r));

    let pairs = new Map();
    for (let i = 0; i < polymer.length - 1; i++) {
        incMapKey(pairs, polymer[i] + polymer[i + 1]);
    }

    const steps = partTwo ? 40 : 10;
    for (let step = 0; step < steps; step++) {
        const newPairs = new Map();

        pairs.forEach((v, k) => {
            const c1 = k[0];
            const c2 = k[1];

            if (rules.has(k)) {
                const x = rules.get(k);
                incMapKey(newPairs, `${c1}${x}`, v);
                incMapKey(newPairs, `${x}${c2}`, v);
            } else {
                incMapKey(newPairs, `${c1}${c2}`, v);
            }
        });

        pairs = newPairs;
    }

    const cnt = new Map();
    pairs.forEach((v, k) => [0, 1].forEach((j) => incMapKey(cnt, k[j], v)));

    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;
    cnt.forEach((v, _) => {
        if (v < min) {
            min = v;
        }
        if (v > max) {
            max = v;
        }
    });

    return Math.ceil(max / 2) - Math.ceil(min / 2);
};

(async () => {
    utils.test(main(getTestRawInput()), 1588);

    const input = await utils.getInputData(2021, 14);
    const result1 = main(input);
    utils.test(result1, 2068);

    utils.test(main2(getTestRawInput()), 1588);
    utils.test(main2(input), 2068);

    const result2 = main2(input, true);
    utils.test(result2, 2158894777814);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
