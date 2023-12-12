mod day1;
mod day2;
mod utils;

use std::fs;

fn main() {
  // day1::day_1(fs::read_to_string("./src/inputs/day1.txt").expect("Should have been able to read \"day1.txt\""));
  day2::day_2(fs::read_to_string("./src/inputs/day2.txt").expect("Should have been able to read \"day2.txt\""));
}