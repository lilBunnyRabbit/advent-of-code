mod day1;

use std::fs;

fn main() {
  day1::day1(fs::read_to_string("./src/inputs/day1.txt").expect("Should have been able to read \"day1.txy\""));
}