const data = Deno.readTextFileSync("./input.txt");

//------ DAY 10 ------//

const map = data.split('\n').map(line => line.trim());

const rows = map.length;
const cols = map[0].length;

console.log("rows:", rows, "cols:", cols);


function checkPath(px, py) {
    
    //check up/down/left/right recursively as long as they are in bounds and the are increasing from center value 
    const val = parseInt(map[py][px]);

    //console.log("checking", px, py, "val:", val);

    let tops = new Set();

    if (val == 9) {
        //we reached the top
        //console.log("reached top", px, py);
        tops.add(`${px},${py}`);
        return tops;
    }
    
    //check up
    if (py - 1 >= 0 && (parseInt(map[py - 1][px]) - val) == 1) {
        const result = checkPath(px, py - 1);
        result.forEach(top => { tops.add(top); });
    }
    //check down
    if (py + 1 < rows && (parseInt(map[py + 1][px]) - val) == 1) {
        const result = checkPath(px, py + 1);
        result.forEach(top => { tops.add(top); });
    }
    //check left
    if (px - 1 >= 0 && (parseInt(map[py][px - 1]) - val) == 1) {
        const result = checkPath(px - 1, py);
        result.forEach(top => { tops.add(top); });
    }
    //check right
    if (px + 1 < cols && (parseInt(map[py][px + 1]) - val) == 1) {
        const result = checkPath(px + 1, py);
        result.forEach(top => { tops.add(top); });
    }

    return tops;
}

let totalScore = 0;
for (let py = 0; py < rows; py++) {
    for (let px = 0; px < cols; px++) {
        if (map[py][px] == '0') {
            //console.log("found trailhead at", px, py);
            const tops = checkPath(px, py);            
            totalScore += tops.size;
        }
    }
}

console.log("1) total score:", totalScore);


function checkRating(px, py) {
    
    //check up down left right recursively as long as they are in bounds and the are increasing from center value    
    const val = parseInt(map[py][px]);

    //console.log("checking", px, py, "val:", val);

    if (val == 9) {
        //we reached the top
        //console.log("reached top", px, py);        
        return 1;
    }
    
    let rating = 0;

    //check up
    if (py - 1 >= 0 && (parseInt(map[py - 1][px]) - val) == 1) {
        rating += checkRating(px, py - 1);
    }
    //check down
    if (py + 1 < rows && (parseInt(map[py + 1][px]) - val) == 1) {
        rating += checkRating(px, py + 1);
    }
    //check left
    if (px - 1 >= 0 && (parseInt(map[py][px - 1]) - val) == 1) {
        rating += checkRating(px - 1, py);
    }
    //check right
    if (px + 1 < cols && (parseInt(map[py][px + 1]) - val) == 1) {
        rating += checkRating(px + 1, py);
    }

    return rating;
}


let totalRating = 0;
for (let py = 0; py < rows; py++) {
    for (let px = 0; px < cols; px++) {
        if (map[py][px] == '0') {
            //console.log("found trailhead at", px, py);
            totalRating += checkRating(px, py);            
        }
    }
}

console.log("2) total rating:", totalRating);