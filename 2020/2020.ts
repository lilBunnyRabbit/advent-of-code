import { day_1 } from './day_1/day_1';
import { day_2 } from './day_2/day_2';

export const year2020 = () => executeDay(2);

function executeDay(day?: number) {
    const days: { [key: number]: Function } = {
        1: day_1,
        2: day_2
    }

    if(day) {
        console.log(`Day ${day}:`);
        return days[day]();
    } else {
        for (const day in days) {
            console.log(`Day ${day}:`);
            return days[day]();
        }
    }
}