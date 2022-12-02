import { readInput } from "../utils";

export default function () {
  let count = 0;
  readInput("day-1", "\n").reduce((p, c) => {
    if (c > p) count++;
    return c;
  });
  
  // readInput("day-1", "\n").reduce((p, c) => {
  //   if (p != "") {
  //     if (c > p[0]) {
  //       count++;
  //       console.log(`${c} (increased)`);
        
  //     } else {
  //       console.log(`${c} (decreased)`);
  //     }
      
  //   } else {
  //     console.log(`${c} (N/A)`)
  //   }

  //   return c;
  // }, "")

  console.log({ count });
  
  return readInput("day-1", "\n").reduce<any>((p, c) => [p[0] + (c > p[1] ? 1 : 0), c], [-1, ""])[0];
}