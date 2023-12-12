import { Day } from "../../utils";

const findMarker = (input: string, characters: number): number => {
  for (let i = characters; i < input.length; i++) {
    if (new Set(input.substring(i - characters, i)).size === characters) return i;
  }

  return 0;
};

export default new Day(__filename)
  .addPart(function () {
    return findMarker(this.input[0], 4);
  })
  .addPart(function () {
    return findMarker(this.input[0], 14);
  });
