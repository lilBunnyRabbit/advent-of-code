import fs from 'fs';
import readline from 'readline';
import path from 'path';

import { day_1 } from './day_1/day_1';
import { day_2 } from './day_2/day_2';
import { day_3 } from './day_3/day_3';

const days = [
    day_1,
    day_2,
    day_3
];

export const year2020 = () => executeDays(0);

export async function executeDay(day: number) {
    console.log(`Day ${day + 1}:`);
    return days[day]();
}

export async function executeDays(index: number): Promise<any> {
    if(index >= days.length) return;
    return executeDay(index).then(() => executeDays(index + 1));
}

export async function executeParts(index: number, input: any, parts: any[]): Promise<any> {
    if(index >= parts.length) return;
    const output = await parts[index](input);
    console.log(`   Part ${index + 1}: ${output}`);
    return executeParts(index + 1, input, parts);
}

export async function readFileByLine(dir: string, callback: any) {
    const fileStream = fs.createReadStream(path.join(dir, 'input.txt'));
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    let row = 0;
    for await (const line of rl) {
        callback(line, row);
        row++;
    }
}