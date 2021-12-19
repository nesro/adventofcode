import * as utils from './utils';

/*

If any pair is nested inside four pairs, the leftmost such pair explodes.
If any regular number is 10 or greater, the leftmost such regular number splits.
Once no action in the above list applies, the snailfish number is reduced.

*/

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

const makeTree = ([left, right], node = null, depth = 0) => {
    const newNode = { parent: node, left: null, right: null, depth };

    if (typeof left === 'number') {
        newNode.left = left;
    } else {
        newNode.left = makeTree(left, newNode, depth + 1);
    }

    if (typeof right === 'number') {
        newNode.right = right;
    } else {
        newNode.right = makeTree(right, newNode, depth + 1);
    }

    return newNode;
};

// const getNext = (node, dir: 'left' | 'right') => {
//     if (dir === 'right' && typeof node.parent.right === 'number') {
//         return { node: node.parent, dir: 'right' };
//     }

//     let tmp;
//     for (;;) {
//         if (typeof tmp.left === 'number') {
//             return { tmp, dir: 'left' };
//         } else {
//             tmp = tmp.left;
//         }

//         if (typeof tmp.left === 'number') {
//             return { node: tmp, dir: 'left' };
//         }

//         tmp = tmp.left;
//     }
//     return null;
// };

const explode = (node, finished = false) => {
    for (const dir of ['left', 'right']) {
        if (!finished && typeof node[dir] !== 'number' && node[dir].depth === 4) {
            const exLeft = node[dir].left;
            const exRight = node[dir].right;

            // GET NEXT LEFT BEGIN --
            let nextLeft;
            if (dir === 'right') {
                if (typeof node.left === 'number') {
                    nextLeft = { node, dir: 'left' };
                } else {
                    for (let tmp = node.left; tmp; tmp = tmp.right) {
                        if (typeof tmp.right === 'number') {
                            nextLeft = { tmp, dir: 'right' };
                            break;
                        }
                    }
                }
            } else {
                for (let tmp = node.parent; tmp; tmp = tmp.parent) {
                    if (typeof tmp.left === 'number') {
                        nextLeft = { node: tmp, dir: 'left' };
                        break;
                    }
                }
            }
            // GET NEXT LEFT END ---

            // GET NEXT RIGHT BEGIN
            let nextRight;
            if (dir === 'left') {
                if (typeof node.right === 'number') {
                    nextRight = { node, dir: 'right' };
                } else {
                    for (let tmp = node.right; tmp; tmp = tmp.left) {
                        if (typeof tmp.left === 'number') {
                            nextRight = { node: tmp, dir: 'left' };
                            break;
                        }
                    }
                }
            } else {
                for (let tmp = node.parent; tmp; tmp = tmp.parent) {
                    if (typeof tmp.right === 'number') {
                        nextRight = { node: tmp, dir: 'right' };
                        break;
                    }
                }
            }
            // GET NEXT RIGHT END ---

            if (nextLeft) {
                nextLeft.node[nextLeft.dir] += exLeft;
            }

            if (nextRight) {
                if (!nextRight.node) {
                    console.log(nextRight);
                }

                nextRight.node[nextRight.dir] += exRight;
            }

            node[dir] = 0;

            finished = true;

            return { node, finished };
        }

        if (typeof node[dir] !== 'number') {
            const explodeRes = explode(node[dir], finished);
            node[dir] = explodeRes.node;
            finished = finished || explodeRes.finished;
        }
    }

    return { node, finished };
};

const printTree = (node) => {
    if (!node) {
        return;
    }

    const l = typeof node.left === 'number' ? node.left : printTree(node.left);
    const r = typeof node.right === 'number' ? node.right : printTree(node.right);
    return `[${l},${r}]`;
};

const main = (input: string, partTwo = false) => {
    const i = eval(input);
    const tree = makeTree(i);
    // const aa = printTree(tree);
    // console.log(tree);
    explode(tree);
    const bb = printTree(tree);
    // console.log(tree);

    return bb;
};

(async () => {
    utils.testPart1(main, testInput1);
    utils.testPart1(main, testInput2);
    utils.testPart1(main, testInput3);
    // utils.testPart1(main, testInput4);
    utils.testPart1(main, testInput5);
    console.log('e');

    // const input = await utils.getInputData(2021, 17);
    // const result1 = main(input);
    // utils.test(result1, 23005);

    // utils.testPart2(main, testInput);

    // const result2 = main(input, true);
    // utils.test(result2, 2040);

    // console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();

// let depth = 0;
// for (let i = 0; i < input.length; i++) {
//     if (input[i] === '[') {
//         depth++;
//     } else if (input[i] === ']') {
//         depth--;
//     }

//     if (depth === 5) {
//         i++;
//         const l = parseInt(input.substring(i, i + 1), 10);
//         const firstLeft = findFirstLeft(input, i);

//         i += 2;
//         const r = parseInt(input.substring(i, i + 1), 10);
//         const firstRight = findFirstRight(input, i);

//         const newLeft = firstLeft === 0 ? 0 : firstLeft + l;
//         const replacement = `[[${firstLeft},${firstRight}]]`;

//         console.log(l, r);
//     }
// }

// const d = depth(i);

// const x = JSON.stringify(i);
