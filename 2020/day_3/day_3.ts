import { executeParts, readFileByLine } from '../2020';

export async function day_3() {
    return executeParts(0, {}, [
        part_1,
        part_2
    ]);
}

async function part_1() {
    return tobogganTrajectory([
        [3, 1]
    ]);
}

async function part_2() {
    return tobogganTrajectory([
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ]);
}

async function tobogganTrajectory(options: number[][]): Promise<number> {
    await readFileByLine(__dirname, (line: string, row: number) => {
        for (let i = 0; i < options.length; i++) {
            if(options[i].length == 2) Array.prototype.push.apply(options[i], [0, 0]);
            const [right, down, positionX] = options[i];
            if(row % down != 0) return; 
            if(line[positionX % line.length] == "#") options[i][3]++;
            options[i][2] += right;
        }
    });  

    return options.reduce((total: number, option: number[]) => total * option[3], 1);
}