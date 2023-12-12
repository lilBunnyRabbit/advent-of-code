import { Day } from "../../utils";

const executeMoves = (
  input: string[],
  onMove: (move: { from: string; to: string; amount: number }, map: Record<string, string[]>) => void
): string => {
  const map: Record<string, string[]> = {};

  let matchColumns = true;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];

    if (row.length === 0) {
      matchColumns = false;
      continue;
    }

    if (matchColumns) {
      if (input[i + 1].length === 0) continue;

      const match = row.match(/(\s{4}|\w+)/g);
      match!.forEach((element, index) => {
        const key = `${index + 1}`;
        if (!(key in map)) map[key] = [];
        if (element[0] !== " ") map[key].unshift(element);
      });

      continue;
    }

    const [move, from, to] = row.match(/\d+/g)!;
    const amount = Number.parseInt(move);

    onMove({ from, to, amount }, map);
  }

  return Object.values(map)
    .map((col) => col[col.length - 1])
    .join("");
};

export default new Day(__filename)
  .addPart(function () {
    return executeMoves(this.input, ({ from, to, amount }, map) => {
      map[to].push(...map[from].splice(-amount, amount).reverse());
    });
  })
  .addPart(function () {
    return executeMoves(this.input, ({ from, to, amount }, map) => {
      map[to].push(...map[from].splice(-amount, amount));
    });
  });
