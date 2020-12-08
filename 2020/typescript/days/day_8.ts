import { executeParts, readFileByLine } from '../utils';

export async function day_8() {
    const instructions = await getInstructions();
    return executeParts(0, { instructions, index: 0, accumulator: 0 }, [
        async (data: any) => part_1(JSON.parse(JSON.stringify(data))),
        async (data: any) => part_2(JSON.parse(JSON.stringify(data))),
    ]);
}

async function part_1({ instructions, index, accumulator }: any): Promise<any> {
    const operations: {[key: string]: Function} = {
        nop: () => index++,
        acc: (value: number) => {
            index++;
            accumulator += value;
        },
        jmp: (value: number) => index += value,
    }

    while (index != null) {
        const instruction = instructions[index];
        if(instruction.counter > 0) {
            index = null;
            break;
        }
        instructions[index].counter++;
        operations[instruction.key](instruction.value);
    }

    return accumulator;
}

async function part_2({ instructions, index, accumulator, switched = false }: any): Promise<number> {
    const operations: {[key: string]: Function} = {
        nop: (value: number, jmp?: boolean) => jmp ? operations.jmp(value) : index + 1,
        acc: (value: number) => {
            accumulator += value;
            return index + 1;
        },
        jmp: (value: number, nop?: boolean) => nop ? operations.nop(value) : index + value,
    }

    while (true) {
        if(index >= instructions.length) break;
        
        const instruction = instructions[index];
        if(instruction.counter > 0) return -1;
        instructions[index].counter++;

        if(!switched && instruction.key != "acc") {
            const output = await part_2({
                instructions: JSON.parse(JSON.stringify(instructions)),
                index: operations[instruction.key](instruction.value, true), 
                accumulator,
                switched: true
            });
            if(output != -1) return output;
        }

        index = operations[instruction.key](instruction.value);
    }
    return accumulator;
}

async function getInstructions(): Promise<{ key: string, value: number, counter: number }[]> {
    const instructions: { key: string, value: number, counter: number }[] = [];

    await readFileByLine(8, (line: string) => {
        const [key, value] = line.split(" ");
        return instructions.push({
            key,
            value: Number.parseInt(value),
            counter: 0
        })
    }); 
    return instructions;
}