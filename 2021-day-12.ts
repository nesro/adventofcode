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
    const smallNodes = new Set();

    input
        .split('\n')
        .filter(Boolean)
        .map((x) => {
            const [f, t] = x.split('-');

            [f, t]
                .filter((x) => !['start', 'end'].includes(x) && x !== x.toUpperCase())
                .forEach((x) => {
                    smallNodes.add(x);
                });

            edges[f] = edges[f] || [];
            edges[f].push(t);

            edges[t] = edges[t] || [];
            edges[t].push(f);
        });

    if (partTwo) {
        const results = new Set();
        smallNodes.forEach((smallTwice) =>
            rec(edges, 'start', ['start'], [], smallTwice, partTwo).forEach((t) => results.add(t)),
        );
        return results.size;
    } else {
        return rec(edges, 'start', ['start'], [], null, partTwo).length;
    }
};

const rec = (edges, u, paths, visited, smallTwice, partTwo) => {
    const results = [];
    if (u === 'end') {
        results.push(paths.join(','));
        return results;
    }
    visited[u] = (visited[u] || 0) + 1;
    edges[u]
        .filter(
            (x) =>
                x === x.toUpperCase() ||
                (x !== x.toUpperCase() && ((visited[x] || 0) < 1 || (smallTwice === x && visited[x] < 2))),
        )
        .forEach((x) => {
            paths.push(x);
            results.push(...rec(edges, x, paths, visited, smallTwice, partTwo));
            paths.splice(paths.lastIndexOf(x), 1);
        });
    visited[u]--;
    return results;
};

(async () => {
    utils.test(main(getTestRawInput()), 10);

    const input = await utils.getInputData(2021, 12);
    const result1 = main(input);
    utils.test(result1, 4411);

    utils.test(main(getTestRawInput(), true), 36);

    const result2 = main(input, true);
    utils.test(result2, 136767);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
