import { sumArray } from "../../tools";
import { Day, readInputSplit } from "../../utils";

export default Day(1, [
  () => {
    return Math.max(...readInputSplit(__dirname, /\n\n/).map((data) => sumArray(data.split(/\n/))));
  },
  () => {
    return sumArray(
      readInputSplit(__dirname, /\n\n/)
        .map((data) => sumArray(data.split(/\n/)))
        .sort((a, b) => b - a)
        .slice(0, 3)
    );
  },
]);
