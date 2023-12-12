import fs from 'fs';

export function readInput(path: string, delimiter: string): string[] {
    let data: string = "";
    try {
        data = fs.readFileSync(`${path}/input.txt`, "utf-8");
    } catch { }

    return data.split(delimiter);
}