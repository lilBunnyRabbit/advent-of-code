import { executeParts, readFileByLine } from '../utils';

export async function day_5() {
    const solution = await solve();
    return executeParts(0, {}, [
        async () => solution.highest,
        async () => solution.my,
    ]);
}

async function solve(): Promise<any> {
    let highest_seat_id = -1;
    let my_seat_id = -1;
    
    const seat_ids: any = [];
    await readFileByLine(5, (line: string) => {
        const row: {[key: string]: number} = { t: 127, b: 0 };
        const column: {[key: string]: number} = { t: 7, b: 0 };
        const calc = (top: boolean, data: any) => data[top ? "t" : "b"] = (top ? Math.floor : Math.ceil)((data.t - data.b) / 2) + data.b;
        for(const letter of line) {
            letter == "F" ? calc(true, row) :
            letter == "B" ? calc(false, row) :
            letter == "L" ? calc(true, column) :
            letter == "R" ? calc(false, column) : null;
        }
        const seat_id = row.t * 8 + column.b;
        seat_ids.push(seat_id);
        if(seat_id > highest_seat_id) highest_seat_id = seat_id;
    }); 
    
    const sorted_seat_ids = seat_ids.sort();
    for (let i = 1; i < sorted_seat_ids.length; i++) {
        if(sorted_seat_ids[i + 1] - sorted_seat_ids[i] > 1) {
            my_seat_id = sorted_seat_ids[i] + 1;
            break;
        }
    }

    return { highest: highest_seat_id, my: my_seat_id };
}