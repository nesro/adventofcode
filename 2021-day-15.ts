import * as utils from './utils';

const getTestRawInput = () => `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const main = (input: string, partTwo = false) => {
    const graph = input
        .split('\n')
        .filter(Boolean)
        .map((l) =>
            l
                .split('')
                .map((c) => ({ val: parseInt(c, 10), /*prev: null,*/ visited: false, dist: Number.MAX_SAFE_INTEGER })),
        );

    if (partTwo) {
        const origY = graph.length;
        const origX = graph[0].length;
        const newY = origY * 5;
        const newX = origX * 5;
        for (let y = 0; y < newY; y++) {
            const howY = Math.floor(y / origY);
            for (let x = 0; x < newX; x++) {
                const howX = Math.floor(x / origX);
                const newVal = ((graph[y % origY][x % origX].val + howY + howX - 1) % 9) + 1;
                graph[y] = graph[y] || [];
                graph[y][x] = { val: newVal, /*prev: null,*/ visited: false, dist: Number.MAX_SAFE_INTEGER };
            }
        }
    }

    graph[0][0].dist = 0;

    let nodeCnt = 0;
    for (;;) {
        // TODO: use a priority queue to make it faster
        let min = Number.MAX_SAFE_INTEGER;
        let minY = 0;
        let minX = 0;
        for (let i = 0; i < graph.length; i++) {
            for (let j = 0; j < graph[i].length; j++) {
                const node = graph[i][j];
                if (node.dist < min && !node.visited) {
                    min = node.dist;
                    minY = i;
                    minX = j;
                }
            }
        }

        if (min === Number.MAX_SAFE_INTEGER) {
            break;
        }

        graph[minY][minX].visited = true;

        [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ].forEach(([i, j]) => {
            const newY = minY + i;
            const newX = minX + j;

            if (graph[newY] && graph[newY][newX]) {
                const newDist = graph[minY][minX].dist + graph[newY][newX].val;
                if (newDist < graph[newY][newX].dist) {
                    graph[newY][newX].dist = newDist;
                    // graph[newY][newX].prev = [minY, minX];
                }
            }
        });
    }

    // const path = [];
    // let pY = graph.length - 1;
    // let pX = graph[0].length - 1;
    // for (;;) {
    //     // path.push([pY, pX]);
    //     path.push(`[${pY}, ${pX}]`);

    //     if (pY === 0 && pX === 0) {
    //         break;
    //     }

    //     if (!graph[pY][pX] || !graph[pY][pX].prev) {
    //         break;
    //     }

    //     const a = graph[pY][pX].prev[0];
    //     const b = graph[pY][pX].prev[1];
    //     pY = a;
    //     pX = b;
    // }

    // if (partTwo) {
    //     let res = '';
    //     for (let i = 0; i < graph.length; i++) {
    //         for (let j = 0; j < graph[i].length; j++) {
    //             // if (!path.includes(`[${i}, ${j}]`)) {
    //             //     res += '.';
    //             // } else {
    //             res += graph[i][j].val;
    //             // }
    //         }
    //         res += '\n';
    //     }
    // }

    return graph[graph.length - 1][graph[0].length - 1].dist;
};

(async () => {
    utils.test(main(getTestRawInput()), 40);

    const input = await utils.getInputData(2021, 15);
    const result1 = main(input);
    utils.test(result1, 824);

    utils.test(main(getTestRawInput(), true), 315);

    const result2 = main(input, true);
    utils.test(result2, 3063);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
