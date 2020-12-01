import { day_1 } from './day_1/day_1';

export const year2020 = () => executeDay();

function executeDay(day?: number) {
    const days: { [key: number]: Function } = {
        1: day_1
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