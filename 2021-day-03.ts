import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TEST_DATA = false;

(async () => {
    try {
        let binary;
        if (TEST_DATA) {
            binary = [
                '00100',
                '11110',
                '10110',
                '10111',
                '10101',
                '01111',
                '00111',
                '11100',
                '10000',
                '11001',
                '00010',
                '01010',
            ];
        } else {
            const { data } = await axios.get(
                'https://adventofcode.com/2021/day/3/input',
                {
                    method: 'get',
                    headers: {
                        Cookie: `session=${process.env.USER_SESSION};`,
                    },
                },
            );
            binary = data.split('\n').filter(Boolean);
        }

        const len = binary[0].length;
        const total = binary.length;
        let countOnes = [];
        for (const b of binary) {
            for (let i = 0; i < len; i++) {
                if (b[i] === '1') {
                    countOnes[i] = (countOnes[i] || 0) + 1;
                }
            }
        }

        let gamma = '';
        for (let i = 0; i < len; i++) {
            if (countOnes[i] > total / 2) {
                gamma += '1';
            } else {
                gamma += '0';
            }
        }

        const resGamma = parseInt(gamma, 2);
        const eps = gamma
            .replace(/1/g, '2')
            .replace(/0/g, '1')
            .replace(/2/g, '0');
        const resEps = parseInt(eps, 2);
        const res = resGamma * resEps;

        console.log(res);

        let oxygen = [...binary];
        for (let i = 0; i < len; i++) {
            countOnes = [];
            for (const o of oxygen) {
                if (o[i] === '1') {
                    countOnes[i] = (countOnes[i] || 0) + 1;
                }
            }

            const mostCommon =
                countOnes[i] >= oxygen.length / 2
                    ? '1'
                    : '0';

            oxygen = oxygen.filter(
                (o) => o[i] === mostCommon,
            );
            if (oxygen.length === 1) {
                break;
            }
        }
        const oxygenRes = parseInt(oxygen[0], 2);

        let co2 = [...binary];
        for (let i = 0; i < len; i++) {
            countOnes = [];
            for (const c of co2) {
                if (c[i] === '1') {
                    countOnes[i] = (countOnes[i] || 0) + 1;
                }
            }
            const leastCommon =
                countOnes[i] >= co2.length / 2 ? '0' : '1';

            co2 = co2.filter((o) => o[i] === leastCommon);
            if (co2.length === 1) {
                break;
            }
        }
        const co2Res = parseInt(co2[0], 2);

        const res2 = oxygenRes * co2Res;
        console.log(res2);
    } catch (error) {
        console.log(error);
    }
})();
