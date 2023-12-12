import { executeParts, readFileByLine } from '../utils';

export async function day_4() {
    return executeParts(0, {}, [
        part_1,
        part_2
    ]);
}

async function part_1() {
    return checkPassports(true);
}

async function part_2() {
    return checkPassports(false);
}

function createFields() {
    const fields: { [key: string]: {
        valid: Function,
        count: number
    }} = {};

    const createField = (key: string, valid: Function) => fields[key] = { valid, count: 0 };

    createField("byr", (value: string) => !(value.length < 4 || value < "1920" || value > "2002"));
    createField("iyr", (value: string) => !(value.length < 4 || value < "2010" || value > "2020"));
    createField("eyr", (value: string) => !(value.length < 4 || value < "2020" || value > "2030"));
    createField("hgt", (value: string) => {
        if(value.endsWith("cm")) return !(value < "150cm" || value > "193cm")
        if(value.endsWith("in")) return !(value < "59in" || value > "76in") 
        return false;
    });
    createField("hcl", (value: string) => value.startsWith("#") && /[0-9A-Fa-f]{6}/g.test(value));
    createField("ecl", (value: string) => [ "amb", "blu", "brn", "gry", "grn", "hzl", "oth" ].includes(value));
    createField("pid", (value: string) => value.length == 9);
    return fields;
}

async function checkPassports(ignoreValid: boolean) {
    let fields = createFields();
    let valid = 0;

    await readFileByLine(4, (line: string, row: number) => {
        if(line == "") return newPassport();
        line.split(" ").forEach((pair: string) => {
            const [key, value] = pair.split(":");
            if(fields[key] && (ignoreValid || fields[key].valid(value))) fields[key].count++;
        })
    });  
    newPassport();
    return valid;

    function newPassport() {
        for(const key in fields) if(fields[key].count <= 0) return fields = createFields();
        valid++;
        return fields = createFields();
    }
}