import { sumArray } from "../../tools";
import { Day } from "../../utils";

export default new Day(__filename)
  .addPart(function () {
    return Math.max(...this.getInput(/\n\n/).map((data) => sumArray(data.split(/\n/))));
  })
  .addPart(function () {
    return sumArray(
      this.getInput(/\n\n/)
        .map((data) => sumArray(data.split(/\n/)))
        .sort((a, b) => b - a)
        .slice(0, 3)
    );
  });
