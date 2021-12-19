import * as utils from './utils';

const testInput1 = {
    input: '[[[[[9,8],1],2],3],4]',
    expected: '[[[[0,9],2],3],4]',
};

const testInput2 = {
    input: '[7,[6,[5,[4,[3,2]]]]]',
    expected: '[7,[6,[5,[7,0]]]]',
};

const testInput3 = {
    input: '[[6,[5,[4,[3,2]]]],1]',
    expected: '[[6,[5,[7,0]]],3]',
};

const testInput4 = {
    input: '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]',
    expected: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]',
};

const testInput5 = {
    input: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]',
    expected: '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
};

const testInput6 = {
    input: '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]',
    expected: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]',
};

const testInput7 = {
    input: `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
    [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
    [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
    [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
    [7,[5,[[3,8],[1,4]]]]
    [[2,[2,2]],[8,[8,1]]]
    [2,9]
    [1,[[[9,3],9],[[9,0],[0,7]]]]
    [[[5,[7,4]],7],1]
    [[[[4,2],2],6],[8,7]]`,
    expected: '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]',
};

const testInput8 = {
    input: `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
    [[[5,[2,8]],4],[5,[[9,9],0]]]
    [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
    [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
    [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
    [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
    [[[[5,4],[7,7]],8],[[8,3],8]]
    [[9,3],[[9,9],[6,[4,9]]]]
    [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
    [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`,
    expected: 4140,
};

const testInput9 = {
    input: `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
    [[[5,[2,8]],4],[5,[[9,9],0]]]
    [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
    [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
    [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
    [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
    [[[[5,4],[7,7]],8],[[8,3],8]]
    [[9,3],[[9,9],[6,[4,9]]]]
    [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
    [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`,
    expectedPartTwo: 3993,
};

const testInput10 = {
    input: `[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
    [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]`,
    expectedPartTwo: 3993,
};

const testInput11 = {
    input: `[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
    [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]`,
    expected: '[[[[7,8],[6,6]],[[6,0],[7,7]]],[[[7,8],[8,8]],[[7,9],[0,6]]]]',
};

const makeTree = ([left, right], node = null, depth = 0, index = 0) => {
    const newNode = { parent: node, left: null, right: null, depth };

    if (typeof left === 'number') {
        newNode.left = { val: left, index };
        index++;
    } else {
        const resL = makeTree(left, newNode, depth + 1, index);
        newNode.left = resL.node;
        index = resL.index;
    }

    if (typeof right === 'number') {
        newNode.right = { val: right, index };
        index++;
    } else {
        const resR = makeTree(right, newNode, depth + 1, index);
        newNode.right = resR.node;
        index = resR.index;
    }

    return { node: newNode, index };
};

const edit = (node, index, val) => {
    if (node.index === index) {
        node.val += val;
    }

    if (node.left) {
        edit(node.left, index, val);
    }
    if (node.right) {
        edit(node.right, index, val);
    }
};

const explode = (root, node, finished = false) => {
    for (const dir of ['left', 'right']) {
        if (!node[dir]) {
            continue;
        }

        if (!finished && node[dir].depth === 4) {
            const exLeft = node[dir].left;
            const exRight = node[dir].right;
            edit(root, exLeft.index - 1, exLeft.val);
            edit(root, exRight.index + 1, exRight.val);
            node[dir] = 0;

            finished = true;

            return { node, finished };
        }

        if (node[dir].parent) {
            const explodeRes = explode(root, node[dir], finished);
            node[dir] = explodeRes.node;
            finished = finished || explodeRes.finished;
        }
    }

    return { node, finished };
};

const flatTree = (node) => {
    const l = Number.isInteger(node.left.val) ? [{ val: node.left.val, index: node.left.index }] : flatTree(node.left);
    const r = Number.isInteger(node.right.val)
        ? [{ val: node.right.val, index: node.right.index }]
        : flatTree(node.right);
    return [l.flat(), r.flat()].flat();
};

const printTree = (node) => {
    if (!node) {
        return '0';
    }
    const l = Number.isInteger(node.left.val) ? node.left.val : printTree(node.left);
    const r = Number.isInteger(node.right.val) ? node.right.val : printTree(node.right);
    return `[${l},${r}]`;
};

const step = (input: string, type, partTwo = false) => {
    if (type === 'explode') {
        const i = eval(input);
        const tree = makeTree(i).node;
        // const aa = printTree(tree);
        // console.log(tree);
        explode(tree, tree);
        const bb = printTree(tree);
        // console.log(tree);

        return bb;
    } else if (type === 'split') {
        return split(input);
    }
};

const main = (input: string, partTwo = false) => {
    let curr = input;
    for (;;) {
        const afterExplode = step(curr, 'explode', partTwo);

        if (afterExplode !== curr) {
            curr = afterExplode;
            continue;
        }

        const afterSplit = step(curr, 'split', partTwo);

        if (curr !== afterSplit) {
            curr = afterSplit;
            continue;
        }

        return curr;
    }
};

const main2 = (input: string) => {
    const lines = input.split('\n').filter(Boolean);

    let inp = lines[0];
    for (let i = 1; i < lines.length; i++) {
        inp = `[${inp},${lines[i]}]`;
        inp = main(inp);
    }
    return inp;
};

const split = (input) => {
    let match = input.match(/[1-9][0-9]/);

    if (!match) {
        return input;
    }

    let num = parseInt(match[0], 10);
    const rw = `[${Math.floor(num / 2)},${Math.ceil(num / 2)}]`;

    const res = `${input.slice(0, match.index)}${rw}${input.slice(match.index + match[0].length)}`;

    return res;
};

const getMagnitudeRec = (node) => {
    if (Number.isInteger(node.val)) {
        return node.val;
    }
    const l = getMagnitudeRec(node.left);
    const r = getMagnitudeRec(node.right);
    return 3 * l + 2 * r;
};

const getMagnitude = (input) => {
    const i = eval(input);
    const tree = makeTree(i).node;
    const res = getMagnitudeRec(tree);
    return res;
};

const main3 = (input: string) => {
    const a = main2(input);
    return getMagnitude(a);
};

const main4 = (input: string) => {
    const lines = input.split('\n').filter(Boolean);

    let maxMag = 0;
    let maxJ;
    let maxI;

    for (let j = 0; j < lines.length; j++) {
        for (let i = 0; i < lines.length; i++) {
            let inp = `[${lines[j]},${lines[i]}]`;
            inp = main(inp);

            const mag = getMagnitude(inp);

            if (mag > maxMag) {
                maxMag = mag;
                maxJ = j;
                maxI = i;
            }
        }
    }
    return maxMag;
};

(async () => {
    // utils.testPart1(main, testInput1);
    // utils.testPart1(main, testInput2);
    // utils.testPart1(main, testInput3);
    // utils.testPart1(main, testInput4);
    // utils.testPart1(main, testInput5);

    utils.testPart1(main, testInput6);

    utils.testPart1(main2, testInput7);
    utils.testPart1(main2, testInput11);

    utils.testPart1(main3, testInput8);
    const input = await utils.getInputData(2021, 18);
    const result1 = main3(input);
    utils.test(result1, 3654);

    utils.testPart2(main4, testInput9);
    utils.testPart2(main4, testInput10);

    const result2 = main4(input);
    utils.test(result2, 4578);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
