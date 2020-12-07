import { executeParts, readFileByLine } from '../2020';

export async function day_6() {
    return executeParts(0, {}, [
        part_1,
        part_2
    ]);
}

async function part_1(): Promise<any> {
    let yes_counter = new Set();
    let total = 0;

    await readFileByLine(__dirname, (line: string) => {
        if(line == "") {
            total += yes_counter.size;
            return yes_counter.clear();
        }
        for(const letter of line) yes_counter.add(letter);
    }); 
    total += yes_counter.size;
    return total;
}

async function part_2(): Promise<any> {
    let yes_counter: any = false;
    let total = 0;

    await readFileByLine(__dirname, (line: string) => {
        if(line == "") {
            total += yes_counter.length || 0;
            return yes_counter = false;
        } 

        yes_counter = !yes_counter ? line.split("") 
                    : yes_counter.filter((yes_count: string) => line.includes(yes_count));
    }); 
    total += yes_counter.length || 0;
    return total;
}