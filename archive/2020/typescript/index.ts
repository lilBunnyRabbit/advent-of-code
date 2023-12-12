import { executeDay, executeDays } from './utils';

import { day_1 } from './days/day_1';
import { day_2 } from './days/day_2';
import { day_3 } from './days/day_3';
import { day_4 } from './days/day_4';
import { day_5 } from './days/day_5';
import { day_6 } from './days/day_6';
import { day_7 } from './days/day_7';
import { day_8 } from './days/day_8';
import { day_9 } from './days/day_9';

const days = [
    day_1,
    day_2,
    day_3,
    day_4,
    day_5,
    day_6,
    day_7,
    day_8,
    day_9
];

executeDay(days, 8);
// executeDays(days);