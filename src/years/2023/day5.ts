import { Day } from "../../core";
import input from "./day5.txt?raw";

const day = new Day(5, input);

function splitSpaceToNumber(input: string) {
  return input
    .trim()
    .split(/\s+/g)
    .map((v) => Number.parseInt(v));
}

function extractMapValues(map: string) {
  const [_, ...rows] = map.split("\n");
  return rows.map(splitSpaceToNumber);
}

day.addPart(function (parser) {
  const [iSeeds, ...iMaps] = parser.input(2);

  const seeds = splitSpaceToNumber(iSeeds.replace(/(sudo\s*)?seeds:\s*/, ""));

  const maps = iMaps.map((map) => extractMapValues(map));

  function getMapValue(map: number[][], value: number) {
    for (const [destinationStart, sourceStart, range] of map) {
      if (value < sourceStart || value >= sourceStart + range) continue;

      const diff = value - sourceStart;
      return destinationStart + diff;
    }

    return value;
  }

  return seeds.reduce((p, seed) => {
    let value = seed;
    for (const map of maps) {
      value = getMapValue(map, value);
    }

    if (value < p) return value;
    return p;
  }, Infinity);
});

function isSubset(first: [start: number, range: number], second: [start: number, range: number]) {
  return first[0] <= second[0] && first[0] + first[1] >= second[0] + second[1];
}

function areSubsets(first: [start: number, range: number], second: [start: number, range: number]) {
  return isSubset(first, second) || isSubset(second, first);
}

day.addPart(async function (parser) {
  const [iSeeds, ...iMaps] = parser.input(2);

  if (!iSeeds.startsWith("sudo ")) {
    throw new Error(
      'I suggest you don\'t run this... It\'s not optimized and done with web workers. If you still want to run it replace the "seeds:" with "sudo seeds:" and check the console for live values. One of them should be the correct one :)'
    );
  }

  const seeds = splitSpaceToNumber(iSeeds.replace(/(sudo\s*)?seeds:\s*/, ""));
  const maps = iMaps.map((map) => extractMapValues(map));

  const mapsMapping: Array<Array<[source: number, range: number, destination: number, index: number]>> = [];

  for (let i = maps.length - 1; i >= 0; i--) {
    const mappings: [source: number, range: number, destination: number, index: number][] = [];

    for (let j = 0; j < maps[i].length; j++) {
      const [D_b, S_b, R_b] = maps[i][j];

      if (i !== maps.length - 1) {
        for (let j = 0; j < mapsMapping[i + 1].length; j++) {
          const [S_a, R_a, D_a, I_a] = mapsMapping[i + 1][j];
          if ((D_b >= S_a && D_b <= S_a + R_a) || (D_b < S_a && D_b + R_b >= S_a)) {
            const x_1 = Math.max(S_a, D_b);
            const x_2 = Math.min(S_a + R_a, D_b + R_b);
            const R_x = x_2 - x_1;

            const S_x = S_b + (x_1 - D_b);
            const D_x = D_a + (x_1 - S_a);

            const sameIndex = mappings.findIndex(([s, r]) => areSubsets([S_x, R_x], [s, r]));

            if (sameIndex > -1) {
              const same = mappings[sameIndex];

              if (
                I_a > same[3] ||
                (I_a === same[3] && D_x < same[2]) ||
                (I_a === same[3] && S_x <= same[0] && S_x + R_x >= same[0] + same[1])
              ) {
                mappings[sameIndex] = [S_x, R_x, D_x, I_a];
              }
            } else {
              mappings.push([S_x, R_x, D_x, I_a]);
            }
          }
        }
      }

      mappings.push([S_b, R_b, D_b, i]);
    }

    mapsMapping[i] = Array.from(mappings).sort((a, b) => {
      if (a[3] > b[3]) return -1;
      if (a[3] < b[3]) return 1;

      if (a[2] > b[2]) return 1;
      if (a[2] < b[2]) return -1;

      return 0;
    });
  }

  let min = Infinity;

  const promises: Promise<number>[] = [];

  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const range = seeds[i + 1];

    promises.push(
      new Promise((resolve) => {
        const worker = new Worker(new URL("./day5.worker.js", import.meta.url));

        let minInternal = Infinity;

        worker.onmessage = (e) => {
          if (typeof e.data === "number") {
            minInternal = e.data;

            if (minInternal < min) {
              min = minInternal;
            }

            console.log(`Global min: ${min}, Internal min: ${minInternal}`);
          } else {
            worker.terminate();
            resolve(minInternal);
          }
        };

        worker.postMessage([mapsMapping, start, range]);
      })
    );
  }

  const mins = await Promise.all(promises);
  return Math.min(...mins);
});

export default day;
