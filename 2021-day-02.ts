import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    try {
        const { data } = await axios.get(
            'https://adventofcode.com/2021/day/2/input',
            {
                method: 'get',
                headers: {
                    Cookie: `session=${process.env.USER_SESSION};`,
                },
            },
        );
        const commands = data.split('\n').filter(Boolean);

        {
            let horizontal = 0;
            let depth = 0;
            for (const command of commands) {
                const split = command.split(' ');
                const type = split[0];
                const value = parseInt(split[1], 10);

                switch (type) {
                    case 'forward':
                        horizontal += value;
                        break;
                    case 'up':
                        depth -= value;
                        break;
                    case 'down':
                        depth += value;
                        break;
                    default:
                        throw new Error(
                            `Unknown command ${type}`,
                        );
                }
            }
            const result = horizontal * depth;
            console.log({
                horizontal,
                depth,
                result,
            });
        }

        {
            let aim = 0;
            let horizontal = 0;
            let depth = 0;
            for (const command of commands) {
                const split = command.split(' ');
                const type = split[0];
                const value = parseInt(split[1], 10);

                switch (type) {
                    case 'forward':
                        horizontal += value;
                        depth += aim * value;
                        break;
                    case 'up':
                        aim -= value;
                        break;
                    case 'down':
                        aim += value;
                        break;
                    default:
                        throw new Error(
                            `Unknown command ${type}`,
                        );
                }
            }

            const result = horizontal * depth;
            console.log({
                horizontal,
                depth,
                aim,
                result,
            });
        }
    } catch (error) {
        console.log(error);
    }
})();
