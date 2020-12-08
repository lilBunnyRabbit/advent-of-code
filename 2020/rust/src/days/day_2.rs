use crate::utils::utils;

struct LineData {
    password: String,
    character: String,
    min: usize,
    max: usize
}

pub fn parts() -> String {
    let mut p: Vec<String> = Vec::new();
    let mut valid_range: i32 = 0;
    let mut valid_position: i32 = 0;

    if let Ok(lines) = utils::read_lines(utils::input_file_path(2)) {
        for line in lines {
            if let Ok(line) = line { 
                let ld = get_data_from_line(line.as_str());
                let occurences = ld.password.matches(ld.character.as_str()).count();
                if occurences >= ld.min && occurences <= ld.max { valid_range += 1 }
                
                let mut occured = 0;
                let chars: Vec<char> = ld.password.chars().collect();
                if chars[ld.min - 1].to_string() == ld.character { occured += 1 }
                if chars[ld.max - 1].to_string() == ld.character { occured += 1 }
                if occured == 1 { valid_position += 1 }
            }
        }
    }

    p.push(valid_range.to_string());
    p.push(valid_position.to_string());

    return utils::format_parts(p);
}

fn get_data_from_line(line: &str) -> LineData {
    let line_split: Vec<&str> = line.split(": ").collect();
    let (data, password) = (line_split[0], line_split[1]);
    let data_split: Vec<&str> = data.split(" ").collect();
    let (minmax, character) = (data_split[0], data_split[1]);
    let minmax_split: Vec<&str> = minmax.split("-").collect();
    let (min, max) = (minmax_split[0], minmax_split[1]);

    return LineData {
        password: String::from(password),
        character: String::from(character),
        min: min.parse::<usize>().unwrap(),
        max: max.parse::<usize>().unwrap()
    }
}