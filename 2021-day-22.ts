import * as utils from './utils';

const testInput1 = {
    input: `on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682`,
    expected: 590784,
    // expectedPartTwo: 444356092776315,
};

const main = (input: string, partTwo = false) => {
    let commands = input
        .split('\n')
        .filter(Boolean)
        .map((line) => {
            const s = line.split(' ');
            return [
                s[0] === 'on' ? 1 : 0,
                s[1].split(',').map((x) =>
                    x
                        .split('=')[1]
                        .split('..')
                        .map((y) => parseInt(y, 10)),
                ),
            ];
        });

    commands = commands.filter((c) => {
        let bad = false;
        [0, 1, 2].forEach((i) => {
            [0, 1].forEach((j) => {
                if (Math.abs((c[1] as any)[i][j]) > 50) {
                    bad = true;
                }
            });
        });
        return !bad;
    });

    const grid = new Map();
    for (const command of commands) {
        for (let i = command[1][0][0]; i <= command[1][0][1]; i++) {
            for (let j = command[1][1][0]; j <= command[1][1][1]; j++) {
                for (let k = command[1][2][0]; k <= command[1][2][1]; k++) {
                    if (command[0] === 1) {
                        grid.set(`${i},${j},${k}`, 1);
                    } else {
                        grid.delete(`${i},${j},${k}`);
                    }
                }
            }
        }
    }

    return grid.size;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2021, 22);
    const result1 = main(input);
    utils.test(result1, 568000);

    // utils.testPart2(main2, testInput1);

    // const result2 = main2(input);
    // utils.test(result2, 716241959649754);

    console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
