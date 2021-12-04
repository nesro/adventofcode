import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TEST_DATA = false;

(async () => {
    let input;
    if (TEST_DATA) {
        input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;
    } else {
        const { data } = await axios.get('https://adventofcode.com/2021/day/4/input', {
            method: 'get',
            headers: {
                Cookie: `session=${process.env.USER_SESSION};`,
            },
        });
        input = data;
    }

    const lines = input.split('\n').filter(Boolean);

    const numbersDrawn = lines[0].split(',').map(Number);

    const fiveSquared = [];
    for (let i = 1, j = 0; i < lines.length; i += 5, j++) {
        fiveSquared[j] = [];
        for (let k = 0; k < 5; k++) {
            fiveSquared[j][k] = lines[i + k].trim().split(/[ ]+/).map(Number);
        }
    }

    for (let i = 4; i < numbersDrawn.length; i++) {
        const alreadyDrawn = numbersDrawn.slice(0, i + 1);

        for (let j = 0; j < fiveSquared.length; j++) {
            // ^ each square

            for (const rowOrCol of ['row', 'col']) {
                // ^ each row or column

                for (let k = 0; k < fiveSquared[j].length; k++) {
                    // ^ each row

                    let anyMissing = false;
                    for (let l = 0; l < fiveSquared[j].length; l++) {
                        // ^ each column

                        const n = rowOrCol === 'row' ? fiveSquared[j][k][l] : fiveSquared[j][l][k];
                        if (!alreadyDrawn.includes(n)) {
                            anyMissing = true;
                            break;
                        }
                    }
                    if (!anyMissing) {
                        // ^ solution found

                        // sum of all unmarked numbers in the square
                        let sum = 0;
                        for (let l = 0; l < fiveSquared[j].length; l++) {
                            for (let m = 0; m < fiveSquared[j].length; m++) {
                                const n = fiveSquared[j][l][m];
                                if (!alreadyDrawn.includes(n)) {
                                    sum += fiveSquared[j][l][m];
                                }
                            }
                        }
                        const result1 = sum * numbersDrawn[i];

                        console.log({ result1 });
                        return;
                    }
                }
            }
        }
    }
})();
