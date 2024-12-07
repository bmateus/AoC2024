const data = Deno.readTextFileSync("./input.txt");

//------ DAY 06 ------//

const map = data.split('\n');

const rows = map.length;
const cols = map[0].length;

//find the security guard (^) start position

let startX = 0;
let startY = 0;

for (let py = 0; py < rows; py++) {
    for (let px = 0; px < cols; px++) {
        if (map[py][px] === '^') {
            console.log("found ^ at", px, py);
            startX = px;
            startY = py;
        }        
    }
}

//now we do the security protocol:

let possibleLoopingPaths = 0; //for #2

function checkPath(fakeWallX: number, fakeWallY: number) : { visited: number, looping: boolean} {

    let guardX = startX;
    let guardY = startY;

    //start facing up/north
    let dirX = 0;
    let dirY = -1;

    //function to rotate the direction 90 degrees
    //(0, -1) -> (1, 0) -> (0, 1) -> (-1, 0)
    function rot90() {
        const temp = dirX;
        dirX = -dirY;
        dirY = temp;
    }

    //keep track of the unique locations the guard has visited
    const visited = new Set();
    visited.add(`${guardX},${guardY}`);

    let loopCounter = 0;

    //while the security guard is still on the map keep moving according to the rules
    while (loopCounter < rows * cols && guardX + dirX >= 0 && guardX + dirX < cols && guardY + dirY >= 0 && guardY + dirY < rows) {

        const nextX = guardX + dirX;
        const nextY = guardY + dirY;

        if (map[nextY][nextX] === '#') {
            //console.log("found wall at", nextX, nextY);
            rot90();
            //console.log("new direction:", dirX, dirY);
        } 
        else if (nextX === fakeWallX && nextY === fakeWallY) {
            //console.log("found fake wall at", nextX, nextY);
            rot90();            
        }
        else {

            //console.log("moving to", nextX, nextY);
            
            const nextVisited = `${nextX},${nextY}`;
            
            if (visited.has(nextVisited)) {
                loopCounter++;
            }
            else {
                loopCounter = 0;
                visited.add(nextVisited);
                
                // 2) for every location in the map that the security officer walks to, try adding a blocker and see if that results in a possible loop
                if (fakeWallX == -1 && fakeWallY == -1) {
                    //test fake wall
                    const fakeResult = checkPath(nextX, nextY);
                    if (fakeResult.looping) {
                        possibleLoopingPaths++;
                    }
                }                
            }

            //there are row * col possible locations.... if the guard hasn't visited any new locations in the last row*col moves... it's probably a loop??
            if (loopCounter === rows * cols) {
                //console.log("loop detected!");
                return {"visited":visited.size, "looping":true};
            }

            guardX = nextX;
            guardY = nextY;

        }
    }

    return {"visited":visited.size, "looping":false};
}

const result = checkPath(-1, -1);

console.log("1) visited:", result.visited);

console.log("2) possible looping paths:", possibleLoopingPaths);


