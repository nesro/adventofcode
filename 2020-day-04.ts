import * as utils from './utils';

const testInput1 = {
    input: `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`,
    expected: 2,
    expectedPartTwo: 2,
};

const testInput2 = {
    input: `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`,
    expectedPartTwo: 0,
};

const testInput3 = {
    input: `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`,
    expectedPartTwo: 4,
};

const main = (input: string, partTwo = false) => {
    let valid = input
        .split('\n\n')
        .filter(Boolean)
        .filter((line) => {
            for (const x of ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']) {
                if (!line.includes(x)) {
                    return false;
                }
            }
            return true;
        });

    return valid.length;
};

const main2 = (input: string, partTwo = false) => {
    let valid = input
        .split('\n\n')
        .filter(Boolean)
        .map((line) => {
            const l = line
                .split('\n')
                .filter(Boolean)
                .map((line) =>
                    line
                        .split(' ')
                        .flat(1)
                        .map((x) => x.split(':')),
                );
            return [].concat(...l);
        })
        .filter((pass) => {
            for (const x of ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']) {
                if (!pass.filter((p) => p[0] === x).length) {
                    return false;
                }
            }
            for (const p of pass) {
                switch (p[0]) {
                    case 'byr':
                        if (p[1] < 1920 || p[1] > 2002) {
                            return false;
                        }
                        break;
                    case 'iyr':
                        if (p[1] < 2010 || p[1] > 2020) {
                            return false;
                        }
                        break;
                    case 'eyr':
                        if (p[1] < 2020 || p[1] > 2030) {
                            return false;
                        }
                        break;
                    case 'hgt':
                        if (p[1].endsWith('cm')) {
                            if (p[1].slice(0, -2) < 150 || p[1].slice(0, -2) > 193) {
                                return false;
                            }
                        } else if (p[1].endsWith('in')) {
                            if (p[1].slice(0, -2) < 59 || p[1].slice(0, -2) > 76) {
                                return false;
                            }
                        } else {
                            return false;
                        }
                        break;
                    case 'hcl':
                        if (!/^#[0-9a-f]{6}$/.test(p[1])) {
                            return false;
                        }
                        break;
                    case 'ecl':
                        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p[1])) {
                            return false;
                        }
                        break;
                    case 'pid':
                        if (!/^[0-9]{9}$/.test(p[1])) {
                            return false;
                        }
                        break;
                    case 'cid':
                        break;
                    default:
                        return false;
                }
            }
            return true;
        });

    console.log(valid);

    return valid.length;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2020, 4);
    const result1 = main(input);
    utils.test(result1, 235);

    utils.testPart2(main2, testInput1);
    utils.testPart2(main2, testInput2);
    utils.testPart2(main2, testInput3);

    const result2 = main2(input, true);
    utils.test(result2, 194);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
