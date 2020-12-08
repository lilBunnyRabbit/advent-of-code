import fs from 'fs';
import readline from 'readline';
import path from 'path';

export async function executeDay(days: any[], day: number = 0) {
    console.log(`Day ${day + 1}:`);
    return days[day]();
}

export async function executeDays(days: any[], index: number = 0): Promise<any> {
    if(index >= days.length) return;
    return executeDay(days, index).then(() => executeDays(days, index + 1));
}

export async function executeParts(index: number, input: any, parts: any[]): Promise<any> {
    if(index >= parts.length) return;
    const output = await parts[index](input);
    console.log(`  - Part ${index + 1}: ${output}`);
    return executeParts(index + 1, input, parts);
}

export async function readFileByLine(day: number, callback: any) {
    const fileStream = fs.createReadStream(path.join(__dirname, `../inputs/input_${day}.txt`));
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    let row = 0;
    for await (const line of rl) {
        callback(line, row);
        row++;
    }
}