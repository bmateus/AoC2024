const data = Deno.readTextFileSync("./input.txt");

//------ DAY 14 ------//

function loadConfigData(data)
{
    //regexp to capture numbers:
    const numberRegex = /[-+]?\d+/g;

    const robotConfigs = [];
    //read a config and put it in the clawMachineConfigs array
    const configData = data.split('\n').map(line =>line.trim());;
    for (let i = 0; i < configData.length; i++) {
        const values = configData[i].match(numberRegex);
        
        robotConfigs.push({
            posX: parseInt(values[0]),
            posY: parseInt(values[1]),
            velX: parseInt(values[2]),
            velY: parseInt(values[3])
        });
    }

    return robotConfigs;
}

const robotConfigs = loadConfigData(data);

//console.log("robotConfigs:", robotConfigs);

//the size of the room is 101 x 103

const roomSizeX = 101;
const roomSizeY = 103;

//calculate the number of robots in each quadrant (50x50) after 100 seconds
//and multiply to get the safety factor

const robots = [...robotConfigs];

function mod(a, b) {
    return ((a % b) + b) % b;
}

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < robots.length; j++) {
        robots[j].posX = mod(robots[j].posX + robots[j].velX, roomSizeX);
        robots[j].posY = mod(robots[j].posY + robots[j].velY, roomSizeY);        
        //console.log("setting robot", j, "to", robots[j].posX, robots[j].posY);
    }
}


function calculateSafetyFactor(robots, qX, qY) {
    
    const map = new Array(roomSizeY).fill(0).map(() => new Array(roomSizeX).fill(0));

    for (let i = 0; i < robots.length; i++) {
        const x = robots[i].posX;
        const y = robots[i].posY;
        map[y][x]++;
    }

    let q1 = 0;
    for (let i = 0; i < qY; i++) {
        for (let j = 0; j < qX; j++) {
            q1 += map[i][j];
        }
    }

    let q2 = 0;
    for (let i = 0; i < qY; i++) {
        for (let j = roomSizeX-qX; j < roomSizeX; j++) {
            q2 += map[i][j];
        }
    }

    let q3 = 0;
    for (let i = roomSizeY-qY; i < roomSizeY; i++) {
        for (let j = 0; j < qX; j++) {
            q3 += map[i][j];
        }
    }


    let q4 = 0;
    for (let i = roomSizeY-qY; i < roomSizeY; i++) {
        for (let j = roomSizeX-qX; j < roomSizeX; j++) {
            q4 += map[i][j];
        }
    }

    const safetyFactor = q1 * q2 * q3 * q4;

    return { safetyFactor, q1, q2, q3, q4 };

}

console.log("1) Safety factor:", calculateSafetyFactor(robots, 50, 51));

//not 215574000

function getMap(robots) {
    const map = new Array(roomSizeY).fill(0).map(() => new Array(roomSizeX).fill(0));

    for (let i = 0; i < robots.length; i++) {
        const x = robots[i].posX;
        const y = robots[i].posY;
        map[y][x]++;
    }
    return map;
}

function checkMap(map) {
    for (let i = 0; i < map.length; i++) {
        if (map[i].join('').includes("111111111111111")) { return true; }
    }
    return false
}

function drawMap(map)
{
    for (let i = 0; i < map.length; i++) {        
        const line = map[i].join('').replaceAll('0', '.');
        console.log(line);
    }
}

async function question2()
{
    const robots2 = [...robotConfigs];
    for (let i = 0; i < 100000; i++) {
        for (let j = 0; j < robots2.length; j++) {
            robots2[j].posX = mod(robots2[j].posX + robots2[j].velX, roomSizeX);
            robots2[j].posY = mod(robots2[j].posY + robots2[j].velY, roomSizeY);                    
        }
        const map = getMap(robots2);        
        if (checkMap(map)) 
        {
            console.log("seconds:", i+1);
            drawMap(map);
            //wait
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

question2();
//happens on iteration 6392
//not 6392 or 6393 or 6391?