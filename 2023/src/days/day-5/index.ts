import { Day } from "../../utils";

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

export default new Day(__filename, "Day 5")
  .addPart(function () {
    // const [iSeeds, ...iMaps] = this.getInput(/\n\n/g);
    // const seeds = splitSpaceToNumber(iSeeds.replace("seeds: ", ""));

    // const maps = iMaps.map((map) => extractMapValues(map));

    // function getMapValue(map: number[][], value: number) {
    //   for (const [destinationStart, sourceStart, range] of map) {
    //     if (value < sourceStart || value >= sourceStart + range) continue;

    //     const diff = value - sourceStart;
    //     return destinationStart + diff;
    //   }

    //   return value;
    // }

    // return seeds.reduce((p, seed) => {
    //   let value = seed;
    //   for (const map of maps) {
    //     value = getMapValue(map, value);
    //   }

    //   if (value < p) return value;
    //   return p;
    // }, Infinity);
    return 0;
  })
  .addPart(function () {
    const [iSeeds, ...iMaps] = this.getInput(/\n\n/g);
    const seeds = splitSpaceToNumber(iSeeds.replace("seeds: ", ""));
    const maps = iMaps.map((map) => extractMapValues(map));
    console.log(`Seeds: ${seeds.length}, maps: ${maps.length}`);

    const getMapValue = (mapIndex: number, value: number) => {
      for (const [destinationStart, sourceStart, range] of maps[mapIndex]) {
        if (value < sourceStart || value >= sourceStart + range) continue;

        const diff = value - sourceStart;
        return destinationStart + diff;
      }

      return value;
    };

    function getMapsValue(seed: number) {
      let value = seed;

      for (let i = 0; i < maps.length; i++) {
        value = getMapValue(i, value);
      }

      return value;
    }

    let min = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
      const start = seeds[i];
      const range = seeds[i + 1];

      for (let j = 0; j < range; j++) {
        const seed = start + j;

        const value = getMapsValue(seed);

        if (value < min) {
          min = value;
        }
      }
    }

    return min;
  });
