// @ts-nocheck
onmessage = (e) => {
  const [mapsMapping, start, range] = e.data;

  function getMapsValue(seed) {
    let value = seed;

    main: for (let i = 0; i < mapsMapping.length; i++) {
      for (let j = 0; j < mapsMapping[i].length; j++) {
        const [source, range, destination, index] = mapsMapping[i][j];
        if (value < source || value >= source + range) continue;

        const diff = value - source;
        value = destination + diff;
        i = index;

        continue main;
      }
    }

    return value;
  }

  let min = Infinity;
  for (let j = 0; j < range; j++) {
    const seed = start + j;

    const value = getMapsValue(seed);

    if (value < min) {
      min = value;
      postMessage(min);
    }
  }

  postMessage("end");
};
