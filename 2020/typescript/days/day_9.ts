import { executeParts, readFileByLine } from '../utils';

export async function day_9() {
    const input: number[] = [];

    await readFileByLine(9, (line: string) => input.push(Number.parseInt(line))); 
    
    const invalid_number = findInvalidNumber(input, 25);
    const set_sum = getSetSum(input, invalid_number);

    return executeParts(0, {}, [
        async () => invalid_number,
        async () => set_sum,
    ]);
}

function findInvalidNumber(input: number[], preamble: number): number {
    for (let i = preamble; i < input.length; i++) if(!sumExists(i)) return input[i];
    return -1

    function sumExists(index: number): boolean {
        for (let i = index - preamble; i < index; i++) {
            for (let j = i; j < index; j++) {
                if(input[i] + input[j] == input[index]) return true;
            }
        }
        return false;
    }
}

function getSetSum(input: number[], invalid_number: number): number {
    for (let i = 0; i < input.length - 1; i++) {
        const set: number[] = [ input[i] ];
        for (let j = i + 1; j < input.length; j++) {
            set.push(input[j]);
            const sum = set.reduce((a, b) => a + b, 0);
            if(sum == invalid_number) return Math.max(...set) + Math.min(...set);
            if(sum > invalid_number) break;
        }
    }
    return -1;
}