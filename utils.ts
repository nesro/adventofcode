import axios from 'axios';
import fs from 'fs-extra';
import dotenv from 'dotenv';

dotenv.config();

export const getInputData = async (year: number, day: number) => {
    const inputPath = `inputs/${year}-${day}.txt`;

    if (fs.pathExistsSync(inputPath)) {
        return await fs.readFile(inputPath, 'utf8');
    } else {
        if (!process.env.USER_SESSION) {
            throw new Error('process.env.USER_SESSION is not defined');
        }

        const { data } = await axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
            method: 'get',
            headers: {
                Cookie: `session=${process.env.USER_SESSION};`,
            },
        });
        await fs.outputFile(inputPath, data);
        return data;
    }
};

export const test = (input: unknown, expected: unknown) => {
    if (input !== expected) {
        throw new Error(`Expected ${expected} but got ${input}`);
    }
};
