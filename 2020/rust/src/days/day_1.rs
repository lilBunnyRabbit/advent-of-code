use crate::utils::utils;

pub fn parts() -> String {
    let mut p: Vec<String> = Vec::new();
    
    if let Ok(lines) = utils::read_lines(utils::input_file_path(1)) {
        let mut vec: Vec<i32> = Vec::new();
        for line in lines {
            if let Ok(line) = line { vec.push(line.parse::<i32>().unwrap()) }
        }
        p.push(part_1(&vec).to_string());
        p.push(part_2(&vec).to_string());
    }

    return utils::format_parts(p);
}

fn part_1(vec: &Vec<i32>) -> i32 {
    for i in 0..vec.len() {
        for j in i..vec.len() {
            if vec[i] + vec[j] == 2020 { 
                return vec[i] * vec[j];
            }
        }
    }
    return 0;
}

fn part_2(vec: &Vec<i32>) -> i32 {
    for i in 0..vec.len() {
        for j in i..vec.len() {
            for k in j..vec.len() {
                if vec[i] + vec[j] + vec[k] == 2020 { 
                    return vec[i] * vec[j] * vec[k];
                }
            }
        }
    }
    return 0;
}