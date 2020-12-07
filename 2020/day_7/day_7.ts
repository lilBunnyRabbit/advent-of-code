import { executeParts, readFileByLine } from '../2020';

export async function day_7() {
    const result: any = await solve();

    return executeParts(0, {}, [
        async () => result.bags,
        async () => result.shiny_contains,
    ]);
}

async function solve(): Promise<any> {
    const SHINY_KEY = "shiny gold";
    const rules: {[key: string]: any} = {};
    await readFileByLine(__dirname, (line: string) => {
        let [key, values]: any = line.replace(".", "").split(" bags contain ");
        const children: {[key: string]: number} = {};
        values.split(", ")
            .filter((value: string) => value != "no other bags")
            .forEach((value: string) => {
                const [ amount, ...name ] = value.split(" ");
                children[name.filter((element: string) => ![ "bag", "bags" ].includes(element)).join(" ")] = Number.parseInt(amount);
            });
        rules[key] = { children };
    }); 

    return {
        bags: Object.keys(rules).filter((key: string) => containsShiny(key)).length,
        shiny_contains: bagCount(SHINY_KEY) - 1
    };

    function containsShiny(key: string): boolean {
        if(!rules[key]) return false;
        if(rules[key].children[SHINY_KEY]) return true;
        for(const child_key in rules[key].children) {
            const child_shiny = containsShiny(child_key);
            if(child_shiny) return true;
        }
        return false;
    }

    function bagCount(key: string): number {
        let count = 1;
        for(const child_key in rules[key].children) {
            const child_count = bagCount(child_key);
            count += rules[key].children[child_key] * child_count;
        }
        return count;
    }
}