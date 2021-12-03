import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getHighest = (numbers: number[]): number => {
    let last = null;
    let highers = 0;
    for (const n of numbers) {
        if (last && n > last) {
            highers++;
        }
        last = n;
    }
    return highers;
};

(async () => {
    try {
        const { data } = await axios.get(
            'https://adventofcode.com/2021/day/1/input',
            {
                method: 'get',
                headers: {
                    Cookie: `session=${process.env.USER_SESSION};`,
                },
            },
        );
        const numbers = data
            .split('\n')
            .filter(Boolean)
            .map(Number);

        console.log(getHighest(numbers)); // part one solution

        const windows = [];
        for (let i = 0; i < numbers.length - 2; i++) {
            windows.push(
                numbers
                    .slice(i, i + 3)
                    .reduce(
                        (a: number, b: number) => a + b,
                    ),
            );
        }
        console.log(getHighest(windows)); // part two solution
    } catch (error) {
        console.log(error);
    }
})();
