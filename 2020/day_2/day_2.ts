import fs from 'fs';
import readline from 'readline';
import path from 'path';

export async function day_2() {
    const output_1 = await part_1();
    console.log(`   Part 1: ${output_1}`);

    const output_2 = await part_2();
    console.log(`   Part 2: ${output_2}`);
}

async function part_1(): Promise<number> {
    const fileStream = fs.createReadStream(path.join(__dirname, 'input.txt'));
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    let valid: number = 0;
    for await (const line of rl) {
        const [data, password] = line.split(": ");
        const [minmax, character] = data.split(" ");
        const [min, max] = minmax.split("-");
        const occurences = (password.match(new RegExp(character, "g")) || []).length;
        if(occurences < Number.parseInt(min)) continue;
        if(occurences > Number.parseInt(max)) continue;
        valid++;
    }
    return valid;
}

async function part_2(): Promise<number> {
    const fileStream = fs.createReadStream(path.join(__dirname, 'input.txt'));
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    let valid: number = 0;
    for await (const line of rl) {
        const [data, password] = line.split(": ");
        const [minmax, character] = data.split(" ");
        const [min, max] = minmax.split("-");
        let occured = 0;
        if(password[Number.parseInt(min) - 1] == character) occured++;
        if(password[Number.parseInt(max) - 1] == character) occured++;
        if(occured == 1) valid++;
    }
    return valid;
}