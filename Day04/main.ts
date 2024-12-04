const data = Deno.readTextFileSync("./input.txt");

//------ DAY 04 ------//

//       -=*=-
//         /\
//        /  \
//       /  O \
//      / *    \
//     /   o *  \
//    / o   *  o \
//   /   o      * \
//  /  *      O    \
// / O    o  *   O  \
// -------------------
//        |  |
//        |  |

//for each line convert it to an array of characters
const lines = data.split('\n');

//now starting from every X, we want to check in every direction if it spells XMAS
let count = 0;

const rows = lines.length;
const cols = lines[0].length;

function search(startX, startY, dirX, dirY, remainingChars) : boolean {
    if (remainingChars.length === 0) {
        return true;
    }

    const nextX = startX + dirX;
    const nextY = startY + dirY;
    
    if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
        return false;
    }

    const nextChar = remainingChars[0];
    //console.log("searching", nextX, nextY, nextChar);

    if (lines[nextY][nextX] === nextChar) {
        return search(nextX, nextY, dirX, dirY, remainingChars.slice(1));
    }

    return false;
}


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (lines[i][j] === 'X') {
            
            //console.log("X found at", j, i);
            
            //now search in every direction...i'm assuming X can be part of multiple XMAS sequences
            
            if (search(j, i, 0, -1, "MAS")) 
            { 
                //console.log("XMAS found UP at ", i, j); 
                count++; 
            }
            if (search(j, i, -1, 0, "MAS")) 
            { 
                //console.log("XMAS found LEFT at ", i, j); 
                count++; 
            }
            if (search(j, i, 0, 1, "MAS")) 
            { 
                //console.log("XMAS found DOWN at ", i, j); 
                count++; 
            }
            if (search(j, i, 1, 0, "MAS")) 
            { 
                //console.log("XMAS found RIGHT at ", i, j); 
                count++; 
            }            
            if (search(j, i, -1, -1, "MAS")) count++;
            if (search(j, i, 1, 1, "MAS")) count++;
            if (search(j, i, 1, -1, "MAS")) count++;
            if (search(j, i, -1, 1, "MAS")) count++;

        }
    }
}

console.log("1) XMAS count:", count);


//2) look for the MAS X's

let count2 = 0;

function searchMAS(startX, startY) : boolean {

    //MAM + SAS not good!
    //M S
    // A
    //S M

    const TR = lines[startY-1][startX+1];
    const TL = lines[startY-1][startX-1];
    const BR = lines[startY+1][startX+1];    
    const BL = lines[startY+1][startX-1];

    function isValidLetter(letter : string) : boolean {
        return letter === 'M' || letter === 'S';
    }

    return isValidLetter(TR) && isValidLetter(TL) && isValidLetter(BR) && isValidLetter(BL)
        && TR != BL && TL != BR;
}


for (let i = 1; i < rows-1; i++) {
    for (let j = 1; j < cols-1; j++) {
        if (lines[i][j] === 'A') {
            //console.log("A found at", j, i);
            //now search in every direction...i'm assuming X can be part of multiple XMAS sequences
            
            if (searchMAS(j, i)) 
            {    
                //console.log("it's good");         
                count2++; 
            }            

        }
    }
}


console.log("2) X-MAS count:", count2);




