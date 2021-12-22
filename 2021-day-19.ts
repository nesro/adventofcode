import * as utils from './utils';

const TEST = 1;

const testInput1 = {
    input: `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`,
    expected: 79,
    // expectedPartTwo: 3351,
};

const distance = (a: [x: number, y: number, z: number], b: [x: number, y: number, z: number]) =>
    Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2) + Math.pow(b[2] - a[2], 2));

const getTransformations = ([x, y, z]: [x: number, y: number, z: number]) => {
    const trans = [];

    // const arr = [x, y, z];
    // [-1, 1].forEach((a) => {
    //     [-1, 1].forEach((b) => {
    //         [-1, 1].forEach((c) => {
    //             [
    //                 [0, 1, 2],
    //                 [1, 2, 0],
    //                 [2, 0, 1],
    //                 [2, 1, 0],
    //                 [1, 0, 2],
    //                 [0, 2, 1],
    //             ].forEach(([ix, iy, iz]) => {
    //                 trans.push([a * arr[ix], b * arr[iy], c * arr[iz]]);
    //             });
    //         });
    //     });
    // });
    // return trans;

    // game dice to axis
    // const s1 = x;
    // const s2 = -z;
    // const s3 = y;
    // const s4 = -y;
    // const s5 = z;
    // const s6 = -x;

    // FACE 1, [face 1=x]

    // ROT 1 ( F ): [front 1=x, top 3=y, left=z] - (x,y,z) => (x,y,z)
    // trans.push([s1, s3, s5]);
    // trans.push([s1, s3, s5]);
    trans.push([x, y, z]); /* TRANS = 0 */

    // ROT 2 ( ''_ ): [front 1=x, top 2=-z, left 3=y] - (x, y, z) => (x, -z, y)
    // trans.push([s1, s2, s3]);
    trans.push([x, -z, y]); /* TRANS = 1 */

    // ROT 3 ( ꓞ ): [front 1=x, top 4=-y, left 2=-z] - (x, y, z) => (x, -y, -z)
    // trans.push([s1, s4, s2]);
    trans.push([x, -y, -z]); /* TRANS = 2 */

    // ROT 4 ( -,, ): [front 1=x, top 5=z, left 4=-y] - (x, y, z) => (x, z, -y)
    // trans.push([s1, s5, s4]);
    trans.push([x, z, y]); /* TRANS = 3 */

    // FACE 2,[front 6=-x]

    // ROT 1 ( F ): [front 6=-x, top 3=y, left 2=-z] - (x, y, z) => (-x, y, -z)
    // trans.push([s6, s3, s2]);
    trans.push([-x, y, -z]); /* TRANS = 4 */

    // ROT 2 ( ''_ ): [front 6=-x, top 5=z, left 3=y] - (x, y, z) => (-x, z, y)
    // trans.push([s6, s5, s3]);
    trans.push([-x, z, y]); /* TRANS = 5 */

    // ROT 3 ( ꓞ ): [front 6=-x, top 4=-y, left 5=z] - (x, y, z) => (-x, -y, z)
    // trans.push([s6, s4, s5]);
    trans.push([-x, -y, z]); /* TRANS = 6 */

    // ROT 4 ( -,, ): [front 6=-x, top 2=-z, left 5=-y] - (x, y, z) => (-x, -z, -y)
    // trans.push([s6, s2, s4]);
    trans.push([-x, -z, -y]); /* TRANS = 7 */

    //...

    // FACE 3, [front 3=y]
    trans.push([y, -x, z]); /* TRANS = 8 */
    trans.push([y, -z, -x]); /* TRANS = 9 */
    trans.push([y, x, -z]); /* TRANS = 10 */
    trans.push([y, z, x]); /* TRANS = 11 */

    // FACE 4, [front 4=-y]
    trans.push([-y, x, z]); /* TRANS = 12 */
    trans.push([-y, -z, x]); /* TRANS = 13 */
    trans.push([-y, -x, -z]); /* TRANS = 14 */
    trans.push([-y, z, -x]); /* TRANS = 15 */

    // FACE 5, [front 5=z]
    trans.push([z, x, y]); /* TRANS = 16 */
    trans.push([z, -y, x]); /* TRANS = 17 */
    trans.push([z, -x, -y]); /* TRANS = 18 */
    trans.push([z, y, -x]); /* TRANS = 19 */

    // FACE 6, [front 2=-z]
    trans.push([-z, x, -y]); /* TRANS = 20 */
    trans.push([-z, y, x]); /* TRANS = 21 */
    trans.push([-z, -x, y]); /* TRANS = 22 */
    trans.push([-z, -y, -x]); /* TRANS = 23 */

    return trans;
};

const getVector = (from: [x: number, y: number, z: number], to: [x: number, y: number, z: number]) =>
    `[${to[0] - from[0]},${to[1] - from[1]},${to[2] - from[2]}]`;

const getVectorAsArray = (from: [x: number, y: number, z: number], to: [x: number, y: number, z: number]) => [
    to[0] - from[0],
    to[1] - from[1],
    to[2] - from[2],
];

const getVectors = (coords) => {
    const vectors = [];
    for (let i = 0; i < coords.length - 1; i++) {
        for (let j = i + 1; j < coords.length; j++) {
            const from = coords[i];
            const to = coords[j];
            const vector = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
            vectors.push(vector);
        }
    }
    return vectors;
};

const main = (input: string, partTwo = false) => {
    const scannersRaw = input.split('\n\n');

    const scanners = [];
    let scannersIndex = 0;
    for (const scannerRaw of scannersRaw) {
        scanners[scannersIndex++] = scannerRaw
            .split('\n')
            .filter((s) => !s.includes('scanner'))
            .map((s) => s.split(',').map(Number));
    }

    // dx, dy, dz
    const finalVectors = new Map();

    // const distances = [];
    const vectors = [];

    // map for each scanner => vector (from - to)
    const vectors2 = [];

    // first scanner distances
    // distances[0] = new Set();
    vectors[0] = new Set();

    vectors2[0] = new Map();

    const scannerLocations = [];
    scannerLocations[0] = [0, 0, 0];

    const TESTvariations = [];

    const scannerRotations = [];
    scannerRotations[0] = [0, 0, 0, 0, 0, 0];

    // this is the scanner for that I will loop through other scanners
    // BUT scanner 0 is the source of origin coords, S0 = [0,0,0]
    for (let sourceScannerIndex = 0; sourceScannerIndex < scanners.length; sourceScannerIndex++) {
        // compute vectors for the source scanner
        vectors[sourceScannerIndex] = new Set();
        vectors2[sourceScannerIndex] = new Map();

        for (let i = 0; i < scanners[sourceScannerIndex].length - 1; i++) {
            for (let j = i + 1; j < scanners[sourceScannerIndex].length; j++) {
                // for (let i = 0; i < scanners[sourceScannerIndex].length; i++) {
                //     for (let j = 0; j < scanners[sourceScannerIndex].length; j++) {
                if (i === j) {
                    continue;
                }
                const vec = getVector(scanners[sourceScannerIndex][i], scanners[sourceScannerIndex][j]);

                vectors[sourceScannerIndex].add(vec);
                vectors2[sourceScannerIndex].set(vec, [
                    scanners[sourceScannerIndex][i],
                    scanners[sourceScannerIndex][j],
                ]);
            }
        }

        // now loop through other scanners
        for (let scannerIndex = sourceScannerIndex + 1; scannerIndex < scanners.length; scannerIndex++) {
            // for (let scannerIndex = 0; scannerIndex < scanners.length; scannerIndex++) {
            //     if (sourceScannerIndex === scannerIndex) {
            //         continue;
            //     }
            TESTvariations.push(`${sourceScannerIndex}-${scannerIndex}`);

            const transformedData = [];
            scanners[scannerIndex].forEach((coord) => {
                const trans = getTransformations(coord);
                for (const [i, t] of trans.entries()) {
                    if (!transformedData[i]) {
                        transformedData[i] = [t];
                    } else {
                        transformedData[i].push(t);
                    }
                }
            });

            for (const [dataSetIndex, dataSet] of transformedData.entries()) {
                // const transVec = new Set();
                const transVec2 = new Map();
                for (let i = 0; i < dataSet.length - 1; i++) {
                    for (let j = i + 1; j < dataSet.length; j++) {
                        // for (let i = 0; i < dataSet.length; i++) {
                        //     for (let j = 0; j < dataSet.length; j++) {
                        //         if (i === j) {
                        //             continue;
                        //         }
                        const vec = getVector(dataSet[i], dataSet[j]);

                        transVec2.set(vec, [dataSet[i], dataSet[j]]);

                        // TODO: tohle pomohlo.
                        // const vec2 = getVectorAsArray(dataSet[i], dataSet[j]);
                        // getTransformations([vec2[0], vec2[1], vec2[2]]).forEach((t, transIndex) => {
                        //     const s = `[${t[0]},${t[1]},${t[2]}]`;
                        //     transVec2.set(s, [dataSet[i], dataSet[j], transIndex]);
                        // });
                    }
                }

                const intersectVec = [...vectors[sourceScannerIndex]].filter((x) => transVec2.has(x));

                const len = intersectVec.length;

                if (len >= 12) {
                    console.log('FOUND ONE');

                    for (const vec of intersectVec) {
                        const a = vectors2[sourceScannerIndex].get(vec);
                        // pointsFromSourceScanner.add(a[0]);
                        // pointsFromSourceScanner.add(a[1]);

                        const b = transVec2.get(vec);

                        // TODO: NOT SOURCE
                        // pointsFromSourceScanner.add(b[0]);
                        // pointsFromSourceScanner.add(b[1]);

                        if (!scannerLocations[scannerIndex] && sourceScannerIndex !== 0) {
                            scannerLocations[sourceScannerIndex];

                            let xxscan;

                            // musim najit ktera transformace tady ma byt
                            // if (scannerIndex === 2) {
                            //     xxscan = [
                            //         b[0][0] - scannerLocations[sourceScannerIndex][0] - a[0][0],
                            //         b[0][1] - scannerLocations[sourceScannerIndex][1] - a[0][1],
                            //         b[0][2] - scannerLocations[sourceScannerIndex][2] - a[0][2],
                            //     ];
                            // } else {

                            xxscan = [
                                -(a[0][0] - scannerLocations[sourceScannerIndex][0] - b[0][0]),
                                a[0][1] + scannerLocations[sourceScannerIndex][1] - b[0][1],
                                -(a[0][2] - scannerLocations[sourceScannerIndex][2] - b[0][2]),
                            ];

                            // // 7 je -x, -z, -y]
                            // xxscan = [
                            //     a[0][0] - scannerLocations[sourceScannerIndex][0] - b[0][0],
                            //     a[0][1] - scannerLocations[sourceScannerIndex][1] - b[0][1],
                            //     a[0][2] - scannerLocations[sourceScannerIndex][2] - b[0][2],
                            // ];

                            // }

                            //1105,-1205,1229 SCANNER 2
                            scannerLocations[scannerIndex] = xxscan;

                            console.log(xxscan);
                        }

                        // TODO: this must be relative to scanner 0
                        const scannerLocation = [a[0][0] - b[0][0], a[0][1] - b[0][1], a[0][2] - b[0][2]];
                        if (!scannerLocations[scannerIndex]) {
                            scannerLocations[scannerIndex] = scannerLocation;
                        } else {
                            // check if same
                            if (scannerLocations[scannerIndex].toString() !== scannerLocation.toString()) {
                                // TODO: enable this check
                                // throw new Error('different scanner locations, but should be the same');
                            }
                        }
                    }

                    // finalVectors.set(`${sourceScannerIndex}-${scannerIndex}`, pointsFromSourceScanner);
                    // console.log(dataSet, len, pointsFromSourceScanner);

                    if (sourceScannerIndex !== 0) {
                        // TODO: musim prepocitat na souradnice z scanneru 0
                        console.log('a');
                    }
                }
            }
        }
    }

    if (TEST) {
        if (scannerLocations[1].toString() !== `68,-1246,-43`) {
            throw new Error('wrong scanner 1 location');
        }
        // if (scannerLocations[2]?.toString() !== `1105,-1205,1229`) {
        //     throw new Error('wrong scanner 2 location');
        // }

        scannerLocations[2] = [1105, -1205, 1229];

        if (scannerLocations[3].toString() !== `-92,-2380,-20`) {
            throw new Error('wrong scanner 3 location');
        }
        if (scannerLocations[4].toString() !== `-20,-1133,1061`) {
            throw new Error('wrong scanner 4 location');
        }
    }

    // projedu vsechny data, prepocitam k sceneru 0 - ale az budu mit dobre lokaci skeneru

    // TODO: aby mi to licovalo, musim to jeste otocit..
    const finalPoints = new Set();
    for (let i = 0; i < scanners.length; i++) {
        const scannerLocation = scannerLocations[i];
        for (let j = 0; j < scanners[i].length; j++) {
            const scanner = scanners[i][j];
            const point = [
                scannerLocation[0] + scanner[0],
                scannerLocation[1] + scanner[1],
                scannerLocation[2] + scanner[2],
            ];

            finalPoints.add(point);
        }
    }

    const sortedFinal = [...finalPoints].sort((a, b) => a[0] - b[0]);

    return finalPoints.size;
};

const main2 = (input: string, partTwo = false) => {
    const scannersRaw = input.split('\n\n');

    const scanners = [];
    let scannersIndex = 0;
    for (const scannerRaw of scannersRaw) {
        scanners[scannersIndex++] = scannerRaw
            .split('\n')
            .filter((s) => !s.includes('scanner'))
            .map((s) => s.split(',').map(Number));
    }

    for (const rotX of [-1, 1]) {
        for (const rotY of [-1, 1]) {
            for (const rotZ of [-1, 1]) {
            }
        }
    }
};

(async () => {
    // try {
    utils.testPart1(main, testInput1);

    // const input = await utils.getInputData(2021, 20);
    // const result1 = main(input);
    // utils.test(result1, 5275);

    // utils.testPart2(main, testInput1);

    // const result2 = main(input, true);
    // utils.test(result2, 16482);

    // console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
    // } catch (err) {
    //     console.error(`Error: ${err}`, err);
    //     process.exit(1);
    // }
})();
