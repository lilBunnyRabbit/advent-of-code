import fs from 'fs';
import readline from 'readline';
import path from 'path';

export async function day_1() {
    const fileStream = fs.createReadStream(path.join(__dirname, 'input.txt'));
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    const input: number[] = [];
    for await (const line of rl) input.push(Number.parseInt(line));

    const output_1 = part_1(input);
    console.log(`   Part 1: ${output_1}`);

    const output_2 = part_2(input);
    console.log(`   Part 2: ${output_2}`);
}

function part_1(input: number[]) {
    for (let i = 0; i < input.length; i++) {
        for (let j = i; j < input.length; j++) {
            if(input[i] + input[j] == 2020) return input[i] * input[j];
        }
    }
}

function part_2(input: number[]) {
    for (let i = 0; i < input.length; i++) {
        for (let j = i; j < input.length; j++) {
            for (let k = j; k < input.length; k++) {
                if(input[i] + input[j] + input[k] == 2020) return input[i] * input[j] * input[k];
            }
        }
    }
}