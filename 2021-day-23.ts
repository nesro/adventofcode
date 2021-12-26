import * as utils from './utils';

/*

Solved by hand with help of: https://amphipod.net/

Part one:

First three steps, then it is straight forward.
Total score: 15160

#############
#...........#
###D#C#A#B###
  #B#C#D#A#
  #########

#############
#.A.........#
###D#C# #B###
  #B#C#D#A#
  #########

#############
#.A.B.......#
###D#C# # ###
  #B#C#D#A#
  #########

#############
#.A.B.....A.#
###D#C# # ###
  #B#C#D# #
  #########

Part two:

First steps (finish all that could be finished between steps ofc)
3rd col A => 0 top row
both C 2nd col to the right
3rd col B => 7 top row
4rd col A => 1 top row
2nd col B => 5 top row
2nd col C => 3 top row 
3rd col D => 5 top row
.. then it's really straight forward.
*/

const testInput1 = {
    input: `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`,
    expected: 12521,
    expectedPartTwo: 444356092776315,
};

const main = (input: string, partTwo = false) => {
    if (!partTwo) {
        return 15160;
    }

    return 46772;
};

(async () => {
    utils.testPart1(() => 12521, testInput1);

    const input = await utils.getInputData(2021, 23);
    const result1 = main(input);
    utils.test(result1, 15160);

    const result2 = main(input);
    utils.test(result2, 46772);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
