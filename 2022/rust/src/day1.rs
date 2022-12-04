#[allow(dead_code)]
pub fn day_1(data: String) {
  println!("Day 1:");
  println!("- Part 1: {}", part_1(&data));
  println!("- Part 2: {}", part_2(&data));
}

fn part_1(data: &String) -> i32 {
  let max_value = data
    .split("\n\n")
    .into_iter()
    .map(|values| {
      values
        .split("\n")
        .into_iter()
        .map(|value| value.to_string().parse::<i32>().unwrap())
        .sum::<i32>()
    })
    .max();

  return match max_value {
    Some(max) => max,
    None => -1,
  };
}

fn part_2(data: &String) -> i32 {
  let mut values = data
    .split("\n\n")
    .into_iter()
    .map(|values| {
      values
        .split("\n")
        .into_iter()
        .map(|value| value.to_string().parse::<i32>().unwrap())
        .sum::<i32>()
    })
    .collect::<Vec<i32>>();

  values.sort_by(|a, b| b.cmp(a));

  return values.iter().take(3).sum::<i32>();
}