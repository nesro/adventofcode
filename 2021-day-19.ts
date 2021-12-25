import * as utils from './utils';

const TEST = true;

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
    expectedPartTwo: 3621,
};

const distance = (a: [x: number, y: number, z: number], b: [x: number, y: number, z: number]) =>
    Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2) + Math.pow(b[2] - a[2], 2));

// [signX, signY, signZ, posX, posY, posZ]
const getTransformations = () => {
    const trans = [];

    // [-1, 1].forEach((a) => {
    //     [-1, 1].forEach((b) => {
    //         [-1, 1].forEach((c) => {
    //             trans.push([a, b, c, 0, 1, 2]);
    //             trans.push([a, b, c, 1, 2, 0]);
    //             trans.push([a, b, c, 2, 0, 1]);

    //             trans.push([a, b, c, 0, 2, 1]);
    //             trans.push([a, b, c, 2, 1, 0]);
    //             trans.push([a, b, c, 1, 0, 2]);
    //         });
    //     });
    // });
    // return trans;

    // // trans.push([x, y, z]); /* TRANS = 0 */
    // // trans.push([1, 2, 3]);
    trans.push([1, 1, 1, 0, 1, 2]);

    // // // ROT 2 ( ''_ ): [front 1=x, top 2=-z, left 3=y] - (x, y, z) => (x, -z, y)
    // // // trans.push([s1, s2, s3]);
    // // // trans.push([x, -z, y]); /* TRANS = 1 */
    trans.push([1, -1, 1, 0, 2, 1]);

    // // // ROT 3 ( ꓞ ): [front 1=x, top 4=-y, left 2=-z] - (x, y, z) => (x, -y, -z)
    // // // trans.push([s1, s4, s2]);
    // // // trans.push([x, -y, -z]); /* TRANS = 2 */
    trans.push([1, -1, -1, 0, 1, 2]);

    // // ROT 4 ( -,, ): [front 1=x, top 5=z, left 4=-y] - (x, y, z) => (x, z, -y)
    // // trans.push([s1, s5, s4]);
    // // trans.push([x, z, y]); /* TRANS = 3 */
    trans.push([1, 1, -1, 0, 2, 1]);

    // // FACE 2,[front 6=-x]

    // // ROT 1 ( F ): [front 6=-x, top 3=y, left 2=-z] - (x, y, z) => (-x, y, -z)
    // // trans.push([s6, s3, s2]);
    // // trans.push([-x, y, -z]); /* TRANS = 4 */
    trans.push([-1, 1, -1, 0, 1, 2]);

    // // ROT 2 ( ''_ ): [front 6=-x, top 5=z, left 3=y] - (x, y, z) => (-x, z, y)
    // // trans.push([s6, s5, s3]);
    // // trans.push([-x, z, y]); /* TRANS = 5 */
    trans.push([-1, 1, 1, 0, 2, 1]);

    // // ROT 3 ( ꓞ ): [front 6=-x, top 4=-y, left 5=z] - (x, y, z) => (-x, -y, z)
    // // trans.push([s6, s4, s5]);
    // // trans.push([-x, -y, z]); /* TRANS = 6 */
    trans.push([-1, -1, 1, 0, 1, 2]);

    // // ROT 4 ( -,, ): [front 6=-x, top 2=-z, left 5=-y] - (x, y, z) => (-x, -z, -y)
    // // trans.push([s6, s2, s4]);
    // // trans.push([-x, -z, -y]); /* TRANS = 7 */
    trans.push([-1, -1, -1, 0, 2, 1]);

    // // FACE 3, [front 3=y]
    // // trans.push([y, -x, z]); /* TRANS = 8 */
    // // trans.push([y, -z, -x]); /* TRANS = 9 */
    // // trans.push([y, x, -z]); /* TRANS = 10 */
    // // trans.push([y, z, x]); /* TRANS = 11 */
    trans.push([1, -1, 1, 1, 0, 2]);
    trans.push([1, -1, -1, 1, 2, 0]);
    trans.push([1, 1, -1, 1, 0, 2]);
    trans.push([1, 1, 1, 1, 2, 0]);

    // // FACE 4, [front 4=-y]
    // // trans.push([-y, x, z]); /* TRANS = 12 */
    // // trans.push([-y, -z, x]); /* TRANS = 13 */
    // // trans.push([-y, -x, -z]); /* TRANS = 14 */
    // // trans.push([-y, z, -x]); /* TRANS = 15 */
    trans.push([-1, 1, 1, 1, 0, 2]);
    trans.push([-1, -1, 1, 1, 2, 0]);
    trans.push([-1, -1, -1, 1, 0, 2]);
    trans.push([-1, 1, -1, 1, 2, 0]);

    // // FACE 5, [front 5=z]
    // // trans.push([z, x, y]); /* TRANS = 16 */
    // // trans.push([z, -y, x]); /* TRANS = 17 */
    // // trans.push([z, -x, -y]); /* TRANS = 18 */
    // // trans.push([z, y, -x]); /* TRANS = 19 */
    trans.push([1, 1, 1, 2, 0, 1]); //??
    trans.push([1, -1, 1, 2, 1, 0]);
    trans.push([1, -1, -1, 2, 0, 1]);
    trans.push([1, 1, -1, 2, 1, 0]);

    // // FACE 6, [front 2=-z]
    // // trans.push([-z, x, -y]); /* TRANS = 20 */
    // // trans.push([-z, y, x]); /* TRANS = 21 */
    // // trans.push([-z, -x, y]); /* TRANS = 22 */
    // // trans.push([-z, -y, -x]); /* TRANS = 23 */
    trans.push([-1, 1, -1, 2, 0, 1]);
    trans.push([-1, 1, 1, 2, 1, 0]);
    trans.push([-1, -1, 1, 2, 0, 1]);
    trans.push([-1, -1, -1, 2, 1, 0]);

    return trans;
};

const transform = (trans, point: [x: number, y: number, z: number]) => [
    trans[0] * point[trans[3]],
    trans[1] * point[trans[4]],
    trans[2] * point[trans[5]],
];

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

const mapInc = (map, key) => {
    const item = map.get(key);

    if (item) {
        map.set(key, item + 1);
    } else {
        map.set(key, 1);
    }
};

const mainX = (input: string, partTwo = false) => {
    const scannersRaw = input.split('\n\n');

    const scanners = [];
    let scannersIndex = 0;
    for (const scannerRaw of scannersRaw) {
        scanners[scannersIndex++] = scannerRaw
            .split('\n')
            .filter((s) => !s.includes('scanner'))
            .map((s) => s.split(',').map(Number));
    }

    const vectors = [];
    // map for each scanner => vector (from - to)
    const vectors2 = [];

    vectors[0] = new Set();
    vectors2[0] = new Map();

    const scannerLocations = [];
    scannerLocations[0] = [0, 0, 0];

    const TESTvariations = [];

    const scannerTransformations = [];
    scannerTransformations[0] = [1, 1, 1, 0, 1, 2];

    // until DONE
    for (;;) {
        let missingAny = false;
        for (let i = 0; i < scanners.length; i++) {
            if (!scannerLocations[i]) {
                missingAny = true;
                break;
            }
        }
        if (!missingAny) {
            break;
        }

        // this is the scanner for that I will loop through other scanners
        // BUT scanner 0 is the source of origin coords, S0 = [0,0,0]
        for (let sourceScannerIndex = 0; sourceScannerIndex < scanners.length; sourceScannerIndex++) {
            // if (scannerTransformations[sourceScannerIndex] === undefined) {
            //     console.error(`scannerTransformations[${sourceScannerIndex}] is undefined, continue, maybe later`);
            //     continue;
            // }

            // compute vectors for the source scanner
            vectors[sourceScannerIndex] = new Set();
            vectors2[sourceScannerIndex] = new Map();

            // TODO: je tohle dobre? = jo tohle je dobre
            // for (let i = 0; i < scanners[sourceScannerIndex].length - 1; i++) {
            //     for (let j = i + 1; j < scanners[sourceScannerIndex].length; j++) {
            for (let i = 0; i < scanners[sourceScannerIndex].length; i++) {
                for (let j = 0; j < scanners[sourceScannerIndex].length; j++) {
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
            // for (let scannerIndex = sourceScannerIndex + 1; scannerIndex < scanners.length; scannerIndex++) {
            for (let scannerIndex = 0; scannerIndex < scanners.length; scannerIndex++) {
                if (sourceScannerIndex === scannerIndex) {
                    continue;
                }
                TESTvariations.push(`${sourceScannerIndex}-${scannerIndex}`);

                for (const trans of getTransformations()) {
                    const beacons = [];
                    for (let beaconIndex = 0; beaconIndex < scanners[scannerIndex].length; beaconIndex++) {
                        const beacon = scanners[scannerIndex][beaconIndex];
                        const beaconTransformed = transform(trans, beacon);
                        beacons.push(beaconTransformed);
                    }

                    const beaconVectors = new Map();
                    // for (let i = 0; i < beacons.length - 1; i++) {
                    //     for (let j = i + 1; j < beacons.length; j++) {
                    for (let i = 0; i < beacons.length; i++) {
                        for (let j = 0; j < beacons.length; j++) {
                            if (i === j) {
                                continue;
                            }
                            const vec = getVector(beacons[i], beacons[j]);
                            beaconVectors.set(vec, [beacons[i], beacons[j]]);
                        }
                    }

                    const intersectVec = [...vectors[sourceScannerIndex]].filter((x) => beaconVectors.has(x));

                    if (intersectVec.length >= 120 /*12*/) {
                        console.log('MATCH', sourceScannerIndex, scannerIndex, intersectVec, trans);

                        // TODO: --

                        // const distancesX = new Map();
                        // const distancesY = new Map();
                        // const distancesZ = new Map();
                        const distances3D = new Map();
                        for (let i = 0; i < scanners[sourceScannerIndex].length; i++) {
                            const sourcePoint = scanners[sourceScannerIndex][i];
                            for (let j = 0; j < scanners[scannerIndex].length; j++) {
                                const t = transform(trans, scanners[scannerIndex][j]);

                                const dX = sourcePoint[0] - t[0];
                                const dY = sourcePoint[1] - t[1];
                                const dZ = sourcePoint[2] - t[2];

                                // mapInc(distancesX, dX);
                                // mapInc(distancesY, dY);
                                // mapInc(distancesZ, dZ);

                                mapInc(distances3D, `[${dX}, ${dY}, ${dZ}]`);
                            }
                        }

                        // let originX = -666;
                        // let originY = -666;
                        // let originZ = -666;

                        // for (const [k, v] of distancesX) {
                        //     if (v >= 12) {
                        //         if (originX !== -666) {
                        //             console.error('ERROR: originX !== -666');
                        //         }

                        //         originX = k;
                        //         // break;
                        //     }
                        // }
                        // for (const [k, v] of distancesY) {
                        //     if (v >= 12) {
                        //         if (originY !== -666) {
                        //             console.error('ERROR: originY !== -666');
                        //         }
                        //         originY = k;
                        //         // break;
                        //     }
                        // }
                        // for (const [k, v] of distancesZ) {
                        //     if (v >= 12) {
                        //         if (originZ !== -666) {
                        //             console.error('ERROR: originZ !== -666');
                        //         }
                        //         originZ = k;
                        //         // break;
                        //     }
                        // }

                        let origin;
                        for (const [k, v] of distances3D) {
                            if (v >= 12) {
                                origin = k;
                                break;
                            }
                        }

                        // pouze pokud jsem nasel rozumny origin, jinak zkusit znova
                        // TODO: proc mi to sem leze i kdyz mam scannerIndex = 0 ?
                        if (
                            !scannerLocations[scannerIndex] &&
                            scannerIndex !== 0
                            // originX !== -666 &&
                            // originY !== -666 &&
                            // originZ !== -666
                        ) {
                            // TODO: proc mam spatne ty rotace tady. jak to zjistim? co s cim a jaky znainka
                            // originX=160    =>   160 + -68 -  = -92
                            // originY=-1134  => -1134 + -1246 = -2380
                            // originZ=-23    =>   -23 - -43 = 20

                            // ----

                            // scanner2 (sourceScannerIndex = 4)
                            // originX = 168
                            // originY = -1125
                            // originZ = 72

                            // sourceX -20,
                            // sourceY -1133
                            // sourceZ 1061

                            // goalX 1105
                            // goalY -1205 HOTOVO
                            // goalZ 1229

                            // X: ??? (musim pridat -) 1061 (sourceZ) - originZ    = 1105  ZATIM NEMAM  ( 1061+72 =1133)
                            // Y: -1133 (sourceY) + -1 (trans) * origin[trans[4]=>2] 72 ==> -1133 + -72 = -1205 == TO JE OK

                            // Z: 1061+168=1229 (nevim jak to udelat)
                            // Z: (originX + sourceZ) * -1

                            // trans4: [1, -1, -1, 1, 2, 0]

                            // v-trans4
                            // x y =>   168 (originX) +  1061 (scannerZ) = 1229
                            // y z =>    72 (originZ) + -1133 (scannerY) = -1205
                            // z x => -1125 (originY) -   -20 (scannerX) = -1133

                            // todo: dvojta tranformce??

                            if (!scannerTransformations[sourceScannerIndex]) {
                                continue;
                            }

                            // const origin = [originX, originY, originZ];
                            // const translatedOrigin = transform(scannerTransformations[sourceScannerIndex], [
                            //     originX,
                            //     originY,
                            //     originZ,
                            // ]);

                            // const pokusX = 1 * translatedOrigin[0] + scannerLocations[sourceScannerIndex][0];
                            // const pokusY = 1 * translatedOrigin[1] + scannerLocations[sourceScannerIndex][1];
                            // const pokusZ = 1 * translatedOrigin[2] + scannerLocations[sourceScannerIndex][2];

                            // originX =
                            //     scannerLocations[sourceScannerIndex][0] +
                            //     scannerTransformations[sourceScannerIndex][0] *
                            //         origin[scannerTransformations[sourceScannerIndex][3]];
                            // originY =
                            //     scannerLocations[sourceScannerIndex][1] +
                            //     scannerTransformations[sourceScannerIndex][1] *
                            //         origin[scannerTransformations[sourceScannerIndex][4]];
                            // originZ =
                            //     scannerLocations[sourceScannerIndex][2] +
                            //     scannerTransformations[sourceScannerIndex][2] *
                            //         origin[scannerTransformations[sourceScannerIndex][5]];

                            // TODO: u toho scanneru 2 musim asi jeste otocit neco..
                            // 1: 68,-1246,-43
                            // 2: 1105,-1205,1229
                            // 3: -92,-2380,-20
                            // 4: -20,-1133,1061

                            // scannerLocations[scannerIndex] = [originX, originY, originZ];

                            const originParsed = JSON.parse(origin);
                            scannerLocations[scannerIndex] = originParsed;
                            scannerTransformations[scannerIndex] = trans;

                            for (let i = 0; i < scanners[scannerIndex].length; i++) {
                                if (scannerIndex === 2) {
                                    scanners[scannerIndex][i] = transform(
                                        scannerTransformations[4],
                                        scanners[scannerIndex][i],
                                    );
                                }

                                // !!!! MENIM SOURCE DATA !!!!
                                scanners[scannerIndex][i] = transform(trans, scanners[scannerIndex][i]);
                            }

                            console.log('hu');
                        }

                        // const sourceTransformed = transform(trans, scannerLocations[sourceScannerIndex]);

                        // TODO: --

                        // const a = vectors2[sourceScannerIndex].get(intersectVec[0]);
                        // const b = beaconVectors.get(intersectVec[0]);
                        // const scannerLocation = [
                        //     // a[0][0] + scannerLocations[sourceScannerIndex][0] - b[0][0],
                        //     // a[0][1] - scannerLocations[sourceScannerIndex][1] - b[0][1],
                        //     // a[0][2] + scannerLocations[sourceScannerIndex][2] - b[0][2],
                        //     a[0][trans[3]] + -trans[0] * scannerLocations[sourceScannerIndex][0] - b[0][0],
                        //     a[0][trans[4]] + -trans[1] * scannerLocations[sourceScannerIndex][1] - b[0][1],
                        //     a[0][trans[5]] + -trans[2] * scannerLocations[sourceScannerIndex][2] - b[0][2],
                        // ];
                        // console.log('a');

                        // // TODO: tady znovu projedu vsechny orig a transform body

                        // if (scannerLocations[scannerIndex]) {
                        //     if (scannerLocations[scannerIndex].toString() !== scannerLocation.toString()) {
                        //         // throw new Error('different scanner locations, but should be the same');
                        //     }
                        // } else {
                        //     scannerLocations[scannerIndex] = scannerLocation;
                        //     scannerTransformations[scannerIndex] = trans;
                        //     // kdyz ted vim, ze matchuju s S0, muzu otocit vsechny beamy
                        //     for (let i = 0; i < scanners[scannerIndex]; i++) {
                        //         // !!!! MENIM SOURCE DATA !!!!
                        //         // scanners[scannerIndex][i] = transform(trans, scanners[scannerIndex][i]);
                        //     }
                        // }
                    }
                }

                // const transformedData = [];
                // scanners[scannerIndex].forEach((coord) => {
                //     const trans = getTransformations(coord);
                //     for (const [i, t] of trans.entries()) {
                //         if (!transformedData[i]) {
                //             transformedData[i] = [t];
                //         } else {
                //             transformedData[i].push(t);
                //         }
                //     }
                // });

                // for (const [dataSetIndex, dataSet] of transformedData.entries()) {
                //     // const transVec = new Set();
                //     const transVec2 = new Map();
                //     for (let i = 0; i < dataSet.length - 1; i++) {
                //         for (let j = i + 1; j < dataSet.length; j++) {
                //             // for (let i = 0; i < dataSet.length; i++) {
                //             //     for (let j = 0; j < dataSet.length; j++) {
                //             //         if (i === j) {
                //             //             continue;
                //             //         }
                //             const vec = getVector(dataSet[i], dataSet[j]);

                //             transVec2.set(vec, [dataSet[i], dataSet[j]]);

                //             // TODO: tohle pomohlo.
                //             // const vec2 = getVectorAsArray(dataSet[i], dataSet[j]);
                //             // getTransformations([vec2[0], vec2[1], vec2[2]]).forEach((t, transIndex) => {
                //             //     const s = `[${t[0]},${t[1]},${t[2]}]`;
                //             //     transVec2.set(s, [dataSet[i], dataSet[j], transIndex]);
                //             // });
                //         }
                //     }

                //     const intersectVec = [...vectors[sourceScannerIndex]].filter((x) => transVec2.has(x));

                //     const len = intersectVec.length;

                //     if (len >= 12) {
                //         console.log('FOUND ONE');

                //         for (const vec of intersectVec) {
                //             const a = vectors2[sourceScannerIndex].get(vec);
                //             // pointsFromSourceScanner.add(a[0]);
                //             // pointsFromSourceScanner.add(a[1]);

                //             const b = transVec2.get(vec);

                //             // TODO: NOT SOURCE
                //             // pointsFromSourceScanner.add(b[0]);
                //             // pointsFromSourceScanner.add(b[1]);

                //             if (!scannerLocations[scannerIndex] && sourceScannerIndex !== 0) {
                //                 scannerLocations[sourceScannerIndex];

                //                 let xxscan;

                //                 // musim najit ktera transformace tady ma byt
                //                 // if (scannerIndex === 2) {
                //                 //     xxscan = [
                //                 //         b[0][0] - scannerLocations[sourceScannerIndex][0] - a[0][0],
                //                 //         b[0][1] - scannerLocations[sourceScannerIndex][1] - a[0][1],
                //                 //         b[0][2] - scannerLocations[sourceScannerIndex][2] - a[0][2],
                //                 //     ];
                //                 // } else {

                //                 xxscan = [
                //                     -(a[0][0] - scannerLocations[sourceScannerIndex][0] - b[0][0]),
                //                     a[0][1] + scannerLocations[sourceScannerIndex][1] - b[0][1],
                //                     -(a[0][2] - scannerLocations[sourceScannerIndex][2] - b[0][2]),
                //                 ];

                //                 // // 7 je -x, -z, -y]
                //                 // xxscan = [
                //                 //     a[0][0] - scannerLocations[sourceScannerIndex][0] - b[0][0],
                //                 //     a[0][1] - scannerLocations[sourceScannerIndex][1] - b[0][1],
                //                 //     a[0][2] - scannerLocations[sourceScannerIndex][2] - b[0][2],
                //                 // ];

                //                 // }

                //                 //1105,-1205,1229 SCANNER 2
                //                 scannerLocations[scannerIndex] = xxscan;

                //                 console.log(xxscan);
                //             }

                //             // TODO: this must be relative to scanner 0
                //             const scannerLocation = [a[0][0] - b[0][0], a[0][1] - b[0][1], a[0][2] - b[0][2]];
                //             if (!scannerLocations[scannerIndex]) {
                //                 scannerLocations[scannerIndex] = scannerLocation;
                //             } else {
                //                 // check if same
                //                 if (scannerLocations[scannerIndex].toString() !== scannerLocation.toString()) {
                //                     // TODO: enable this check
                //                     // throw new Error('different scanner locations, but should be the same');
                //                 }
                //             }
                //         }

                //         // finalVectors.set(`${sourceScannerIndex}-${scannerIndex}`, pointsFromSourceScanner);
                //         // console.log(dataSet, len, pointsFromSourceScanner);

                //         if (sourceScannerIndex !== 0) {
                //             // TODO: musim prepocitat na souradnice z scanneru 0
                //             console.log('a');
                //         }
                //     }
                // }
            }
        }
    }

    // ENDE
    console.log(scannerTransformations);

    // if (TEST) {
    //     if (scannerLocations[1].toString() !== `68,-1246,-43`) {
    //         throw new Error('wrong scanner 1 location');
    //     }
    //     // if (scannerLocations[2]?.toString() !== `1105,-1205,1229`) {
    //     //     throw new Error('wrong scanner 2 location');
    //     // }

    //     scannerLocations[2] = [1105, -1205, 1229];

    //     if (scannerLocations[3].toString() !== `-92,-2380,-20`) {
    //         throw new Error('wrong scanner 3 location');
    //     }
    //     if (scannerLocations[4].toString() !== `-20,-1133,1061`) {
    //         throw new Error('wrong scanner 4 location');
    //     }
    // }

    // projedu vsechny data, prepocitam k sceneru 0 - ale az budu mit dobre lokaci skeneru

    // scannerLocations[2] = [1105, -1205, 1229];

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
            finalPoints.add(point.toString());
        }
    }

    // const sortedFinal = [...finalPoints].sort((a, b) => a[0] - b[0]);

    return finalPoints.size;
};

// -------------

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

    const scannerLocations = [];
    scannerLocations[0] = [0, 0, 0];
    const scannerTransformations = [];
    scannerTransformations[0] = [1, 1, 1, 0, 1, 2];

    // scanner I am trying to solve
    for (let unsolvedScannerIndex = 0; unsolvedScannerIndex < scanners.length; unsolvedScannerIndex++) {
        // scanner that I will try to be the solution
        for (let testedScannerIndex = 0; testedScannerIndex < scanners.length; testedScannerIndex++) {
            if (testedScannerIndex === unsolvedScannerIndex) {
                continue;
            }
            // already solved!
            if (scannerLocations[unsolvedScannerIndex]) {
                continue;
            }

            // tested scanner not solved yet
            if (!scannerLocations[testedScannerIndex]) {
                continue;
            }

            for (const trans of getTransformations()) {
                const distances = new Map();

                for (
                    let unsolvedBeamIndex = 0;
                    unsolvedBeamIndex < scanners[unsolvedScannerIndex].length;
                    unsolvedBeamIndex++
                ) {
                    const unsolvedBeam = scanners[unsolvedScannerIndex][unsolvedBeamIndex];

                    for (
                        let testedBeamIndex = 0;
                        testedBeamIndex < scanners[testedScannerIndex].length;
                        testedBeamIndex++
                    ) {
                        const testedBeam = scanners[testedScannerIndex][testedBeamIndex];
                        const transformedTestedBeam = transform(trans, testedBeam);

                        const distX = transformedTestedBeam[0] - unsolvedBeam[0];
                        const distY = transformedTestedBeam[1] - unsolvedBeam[1];
                        const distZ = transformedTestedBeam[2] - unsolvedBeam[2];

                        mapInc(distances, `[${distX},${distY},${distZ}]`);
                    }
                }

                let origin;
                for (const [k, v] of distances) {
                    if (v >= 12) {
                        console.log(k, v);
                        origin = JSON.parse(k);
                        break;
                    }
                }

                if (!origin) {
                    continue;
                }

                let originT = transform(trans, origin);
                scannerLocations[unsolvedScannerIndex] = originT;
                scannerTransformations[unsolvedScannerIndex] = trans;
                console.log(testedScannerIndex);
                for (let i = 0; i < scanners[unsolvedScannerIndex].length; i++) {
                    scanners[unsolvedScannerIndex][i] = transform(trans, scanners[unsolvedScannerIndex][i]);
                    scanners[unsolvedScannerIndex][i][0] + scannerLocations[unsolvedScannerIndex][0];
                    scanners[unsolvedScannerIndex][i][1] + scannerLocations[unsolvedScannerIndex][1];
                    scanners[unsolvedScannerIndex][i][2] + scannerLocations[unsolvedScannerIndex][2];
                }

                // if (TEST) {
                //     if (unsolvedScannerIndex === 1 && scannerLocations[1].toString() !== `68,-1246,-43`) {
                //         throw new Error('wrong scanner 1 location');
                //     }
                //     if (unsolvedScannerIndex === 2 && scannerLocations[2]?.toString() !== `1105,-1205,1229`) {
                //         throw new Error('wrong scanner 2 location');
                //     }
                //     if (unsolvedScannerIndex === 3 && scannerLocations[3].toString() !== `-92,-2380,-20`) {
                //         throw new Error('wrong scanner 3 location');
                //     }
                //     if (unsolvedScannerIndex === 4 && scannerLocations[4].toString() !== `-20,-1133,1061`) {
                //         throw new Error('wrong scanner 4 location');
                //     }
                // }

                break;
            }
        }
    }

    const finalPoints = new Set();
    for (let i = 0; i < scanners.length; i++) {
        for (let j = 0; j < scanners[i].length; j++) {
            finalPoints.add(scanners[i][j].toString());
        }
    }
    return finalPoints.size;
};

// test 33 -----

const findMatch = (scanners, scannerSolved, scannerTested) => {
    for (const trans of getTransformations()) {
        const distances = new Map();
        for (const beamSolved of scanners[scannerSolved]) {
            for (const beamTested of scanners[scannerTested]) {
                const transBeam = transform(trans, beamTested);
                mapInc(
                    distances,
                    `[${beamSolved[0] - transBeam[0]},${beamSolved[1] - transBeam[1]},${beamSolved[2] - transBeam[2]}]`,
                );
            }
        }
        for (const [k, v] of distances) {
            if (v >= 12) {
                return { trans, origin: JSON.parse(k) };
            }
        }
    }
};

const main = (input: string, partTwo = false) => {
    const scannersRaw = input.split('\n\n').filter(Boolean);

    const scanners = [];
    let scannersIndex = 0;
    for (const scannerRaw of scannersRaw) {
        scanners[scannersIndex++] = scannerRaw
            .split('\n')
            .filter(Boolean)
            .filter((s) => !s.includes('scanner'))
            .map((s) => s.split(',').map(Number));
    }

    const scannerLocations = [[0, 0, 0]];
    const scannerTransformations = [[1, 1, 1, 0, 1, 2]];
    const stack = [0];

    while (stack.length) {
        const scannerIndex = stack.pop()!;

        for (let i = 0; i < scanners.length; i++) {
            if (scannerTransformations[i]) {
                continue;
            }

            const match = findMatch(scanners, scannerIndex, i);

            if (!match) {
                continue;
            }

            scannerTransformations[i] = match.trans;
            scannerLocations[i] = match.origin;

            for (let j = 0; j < scanners[i].length; j++) {
                scanners[i][j] = transform(match.trans, scanners[i][j]);
                scanners[i][j][0] += match.origin[0];
                scanners[i][j][1] += match.origin[1];
                scanners[i][j][2] += match.origin[2];
            }

            stack.push(i);
        }
    }

    const finalPoints = new Set();
    for (let i = 0; i < scanners.length; i++) {
        for (let j = 0; j < scanners[i].length; j++) {
            finalPoints.add(scanners[i][j].toString());
        }
    }

    if (!partTwo) {
        return finalPoints.size;
    }

    let maxDistance = 0;
    for (let i = 0; i < scanners.length; i++) {
        for (let j = 0; j < scanners.length; j++) {
            maxDistance = Math.max(
                maxDistance,
                Math.abs(scannerLocations[i][0] - scannerLocations[j][0]) +
                    Math.abs(scannerLocations[i][1] - scannerLocations[j][1]) +
                    Math.abs(scannerLocations[i][2] - scannerLocations[j][2]),
            );
        }
    }
    return maxDistance;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2021, 19);
    const result1 = main(input);
    utils.test(result1, 303);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 9621);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
