import { executeParts, readFileByLine } from '../2020';

export async function day_2() {
    return executeParts(0, {}, [
        part_1,
        part_2
    ]);
}

async function part_1(): Promise<number> {
    let valid: number = 0;
    await readFileByLine(__dirname, (line: string) => {
        const [data, password] = line.split(": ");
        const [minmax, character] = data.split(" ");
        const [min, max] = minmax.split("-");
        const occurences = (password.match(new RegExp(character, "g")) || []).length;
        if(occurences < Number.parseInt(min)) return;
        if(occurences > Number.parseInt(max)) return;
        valid++;
    });

    return valid;
}

async function part_2(): Promise<number> {
    let valid: number = 0;
    await readFileByLine(__dirname, (line: string) => {
        const [data, password] = line.split(": ");
        const [minmax, character] = data.split(" ");
        const [min, max] = minmax.split("-");
        let occured = 0;
        if(password[Number.parseInt(min) - 1] == character) occured++;
        if(password[Number.parseInt(max) - 1] == character) occured++;
        if(occured == 1) valid++;
    });
    return valid;
}