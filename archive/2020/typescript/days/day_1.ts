import { readFileByLine, executeParts } from '../utils';

export async function day_1() {
    const input: number[] = [];
    await readFileByLine(1, (line: string) => input.push(Number.parseInt(line)));

    return executeParts(0, { input }, [
        part_1,
        part_2
    ]);
}

function part_1({ input }: any) {
    for (let i = 0; i < input.length; i++) {
        for (let j = i; j < input.length; j++) {
            if(input[i] + input[j] == 2020) return input[i] * input[j];
        }
    }
}

function part_2({ input }: any) {
    for (let i = 0; i < input.length; i++) {
        for (let j = i; j < input.length; j++) {
            for (let k = j; k < input.length; k++) {
                if(input[i] + input[j] + input[k] == 2020) return input[i] * input[j] * input[k];
            }
        }
    }
}