use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

pub fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

pub fn get_lines(filename: String) -> io::Lines<io::BufReader<File>>{
    return match read_lines(filename) {
        Ok(lines) => lines,
        Err(_) => panic!("Error when reading lines")
    };
}

pub fn format_parts(parts: Vec<String>) -> String {
    let parts_size = parts.len();
    let formatted_parts: Vec<String> = parts.into_iter()
        .rev()
        .enumerate()
        .map(|(i, part)| format!("  - Part {}: {}", parts_size - i, part))
        .rev()
        .collect();
    return formatted_parts.join("\n");
}

pub fn input_file_path(number: i8) -> String {
    format!("../inputs/input_{}.txt", number)
}