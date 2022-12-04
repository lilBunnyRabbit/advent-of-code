#[allow(dead_code)]
use crate::utils;

pub fn day_2(data: String) {
  println!("Day 1:");
  println!("- Part 1: {}", part_1(&data));
  // println!("- Part 2: {}", day_1_part_2(&data));
}

static RPS: [[u32; 3]; 3] = [
  [3, 6, 0],
  [0, 3, 6],
  [6, 0, 3],
];

fn values_to_index(values: &str) -> [u32; 2] {
  return utils::vec_to_n_array::<u32, 2>(
    values
      .split(" ")
      .map(|value| {
        match value {
          "A" | "X" => 0,
          "B" | "Y" => 1,
          "C" | "Z" => 2,
          _ => panic!("Wrong input value!"),
        }
      })
      .collect::<Vec<u32>>()
  );
}

fn part_1(data: &String) -> u32 {
  return data
    .split("\n")
    .map(|values| {
      let [f, s] = values_to_index(values);
      return RPS[f as usize][s as usize] + s + 1;
    })
    .sum::<u32>();
}