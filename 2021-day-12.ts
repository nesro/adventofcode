import * as utils from './utils';

const getTestRawInput = () => `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const main = (input: string, partTwo = false) => {
    const edges = new Map();

    input
        .split('\n')
        .filter(Boolean)
        .map((x) => {
            const [f, t] = x.split('-');

            edges[f] = edges[f] || [];
            edges[f].push(t);

            edges[t] = edges[t] || [];
            edges[t].push(f);
        });

    const results = rec(edges, 'start', ['start'], new Set(), partTwo);
    return results.length;
};

const rec = (edges, u, paths, visited, partTwo) => {
    const results = [];

    if (u === 'end') {
        results.push(paths.join(','));
        return results;
    }

    if (u !== u.toUpperCase()) {
        visited.add(u);
    }

    edges[u].forEach((x) => {
        if (!visited.has(x)) {
            paths.push(x);
            results.push(...rec(edges, x, paths, visited, partTwo));
            paths.splice(paths.indexOf(x), 1);
        }
    });

    visited.delete(u);
    return results;
};

(async () => {
    utils.test(main(getTestRawInput()), 10);

    const input = await utils.getInputData(2021, 12);
    const result1 = main(input);
    utils.test(result1, 4411);

    utils.test(main(getTestRawInput(), true), 36);

    // utils.test(main(getTestRawInput(), true), 195);

    // const result2 = main(input, true);
    // utils.test(result2, 308);

    // console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
