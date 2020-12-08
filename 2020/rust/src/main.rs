mod utils { pub mod utils; }

mod days { 
    pub mod day_1; 
    pub mod day_2; 
    pub mod day_3; 
}
fn main() {
    for i in 1..4 { execute_day(i) }
}

fn execute_day(i: i8) {
    return println!("Day {}:\n{}", i, match i {
        1 => days::day_1::parts,
        2 => days::day_2::parts,
        3 => days::day_3::parts,
        _ => panic!("False value")
    }());
}