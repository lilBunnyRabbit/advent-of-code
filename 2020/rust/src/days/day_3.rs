use crate::utils::utils;

pub fn parts() -> String {
    let mut p: Vec<String> = Vec::new();
    toboggan_trajectory(utils::input_file_path(2), vec![
        [3, 1, 0, 0]
    ]);


    return utils::format_parts(p);
}

fn toboggan_trajectory(filename: String, mut options: Vec<[usize; 4]>) -> i32 {
    let mut row: usize = 0;
    for result_line in utils::get_lines(filename){
        row += 1;
        let line = match result_line { Ok(line) => line, Err(_) => continue };
        for option in &options {
            let (right, down, position_x) = (option[0], option[1], option[2]);
            if row % down != 0 { continue }
            let chars: Vec<char> = line.chars().collect();
            if chars[position_x % chars.len()] == '#' {}
        }
    }

    return 0;
}

/*
async function part_1() {
    return tobogganTrajectory([
        [3, 1]
    ]);
}

async function part_2() {
    return tobogganTrajectory([
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ]);
}

async function tobogganTrajectory(options: number[][]): Promise<number> {
    await readFileByLine(__dirname, (line: string, row: number) => {
        for (let i = 0; i < options.length; i++) {
            if(options[i].length == 2) Array.prototype.push.apply(options[i], [0, 0]);
            const [right, down, positionX] = options[i];
            if(row % down != 0) return; 
            if(line[positionX % line.length] == "#") options[i][3]++;
            options[i][2] += right;
        }
    });  

    return options.reduce((total: number, option: number[]) => total * option[3], 1);
}
*/