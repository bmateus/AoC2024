const mapData = Deno.readTextFileSync("./map.txt");
const movesData = Deno.readTextFileSync("./moves.txt");

//------ DAY 15 ------//

//const map = mapData.split('\n').map(line => line.trim().split(''));
//const rows = map.length;
//const cols = map[0].length;
//console.log("rows:", rows, "cols:", cols);

//find shark ('@')
function findShark(mapState) {
    let sharkX = -1;
    let sharkY = -1;

    //find shark ('@')
    for (let py = 0; py < mapState.length; py++) {
        for (let px = 0; px < mapState[0].length; px++) {
            if (mapState[py][px] === '@') {
                //console.log("found shark at", px, py);
                sharkX = px;
                sharkY = py;
                break;
            }        
        }
    }

    return {sharkX, sharkY};
}

function updateMapPosition(mapState, px, py, dx, dy) {

    const c = mapState[py][px];

    //move whatever is at the position if able
    if (c === '.') 
        return true; //there is an empty space to move to so success

    if (c === 'O' || c === '@') {

        if (updateMapPosition(mapState, px+dx, py+dy, dx, dy)) {
            //copy this space to the new position
            mapState[py][px] = mapState[py+dy][px+dx];
            mapState[py+dy][px+dx] = c;
            return true;
        }
    }

    if (c === '[' || c === ']')
    {        
        //need to check both parts of the box if moving up or down.. sideways is same logic as O
        if (dy !== 0)
        {
            const boxOffsetX = c === '[' ? 1 : -1;
            if (updateMapPosition(mapState, px, py+dy, 0, dy) 
                && updateMapPosition(mapState, px+boxOffsetX, py+dy, 0, dy)) {
                //copy this space to the new position
                mapState[py][px] = mapState[py+dy][px];                
                mapState[py+dy][px] = c;
                //and the other side of the box
                mapState[py][px+boxOffsetX] = mapState[py+dy][px+boxOffsetX];
                mapState[py+dy][px+boxOffsetX] = c === '[' ? ']' : '[';
                return true;
            }
        }
        else 
        if (updateMapPosition(mapState, px+dx, py+dy, dx, dy)) {
            //copy this space to the new position
            mapState[py][px] = mapState[py+dy][px+dx];
            mapState[py+dy][px+dx] = c;
            return true;
        }
    }

    //hit a wall
    return false;
    
}



function updateMapState(mapState, move) {

    let { sharkX, sharkY } = findShark(mapState);
    
    let dx = 0;
    let dy = 0;    

    //move shark with the provided move
    switch (move) {
        case '^': dy = -1; break;
        case 'v': dy = 1; break;            
        case '>': dx = 1; break;            
        case '<': dx = -1; break;            
    }

    if (dx !== 0 || dy !== 0) {

        //console.log("moving shark from", sharkX, sharkY, "to", sharkX+dx, sharkY+dy);

        if (!updateMapPosition(mapState, sharkX, sharkY, dx, dy)) {        
            //console.log("no move possible");
        }

    }

    return mapState;
}

function calculateGPS(mapState) {
    let score = 0;
    for (let py = 0; py < mapState.length; py++) {
        for (let px = 0; px < mapState[0].length; px++) {
            const c = mapState[py][px];
            if (c === 'O' || c === '[') {
                score += 100 * py + px;
            }
        }
    }
    return score;
}



function drawMap(mapState) {
    for (let i = 0; i < mapState.length; i++) {
        console.log(mapState[i].join(''));
    }    
}

(async function part1() {

    const mapState = mapData.split('\n').map(line => line.trim().split(''));
    for (let i=0; i < movesData.length; i++) {
        updateMapState(mapState, movesData[i]);
        //console.log("moving:", movesData[i]);
        //drawMap(mapState);        
        //await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("1) GPS:", calculateGPS(mapState));

})()



//#2

function modifyMap(mapState) {
    const newMap = [];

    for (let py = 0; py < mapState.length; py++) {
        newMap[py] = [];
        for (let px = 0; px < mapState[0].length; px++) {
            const c = mapState[py][px];
            switch (c) {
                case '#':
                    newMap[py].push('#'); 
                    newMap[py].push('#'); 
                    break;
                case '.':
                    newMap[py].push('.');
                    newMap[py].push('.');
                    break;
                case 'O':
                    newMap[py].push('['); 
                    newMap[py].push(']');
                    break;
                case '@':
                    newMap[py].push('@'); 
                    newMap[py].push('.'); 
                    break;     
            }
        }
    }

    return newMap;
}

(async function part2() {
    const mapState2 = modifyMap(mapData.split('\n').map(line => line.trim().split('')));
    for (let i=0; i < movesData.length; i++) {        
        updateMapState(mapState2, movesData[i]);    
        //console.log("moving:", movesData[i]);
        //drawMap(mapState2);        
        //await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log("2) GPS:", calculateGPS(mapState2));

})();

//1524026 too high?