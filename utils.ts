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
    if (typeof input !== typeof expected) {
        throw new Error(
            `Input type is not the same as expected type. Expected: ${typeof expected}, got: ${typeof input}`,
        );
    }

    if (typeof input === 'object') {
        if (JSON.stringify(input) !== JSON.stringify(expected)) {
            throw new Error(
                `Input is not the same as expected. Expected: ${JSON.stringify(expected)}, got: ${JSON.stringify(
                    input,
                )}`,
            );
        }
    } else if (input !== expected) {
        throw new Error(`Expected ${expected} but got ${input}`);
    }
};

export const testPart1 = (
    func: (input: string, partTwo: boolean) => unknown,
    { input, expected }: { input: string; expected: unknown },
) => {
    test(func(input, false), expected);
};

export const testPart2 = (
    func: (input: string, partTwo: boolean) => unknown,
    { input, expected }: { input: string; expected: unknown },
) => {
    test(func(input, true), expected);
};
