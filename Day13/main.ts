const data = Deno.readTextFileSync("./input.txt");

//------ DAY 13 ------//

function loadConfigData(data)
{
    //regexp to capture numbers:
    const numberRegex = /\d+/g;

    const clawMachineConfigs = [];
    //read a config and put it in the clawMachineConfigs array
    const configData = data.split('\n').map(line =>line.trim());;
    for (let i = 0; i < configData.length; i+=4) {
        const buttonA = configData[i].match(numberRegex);
        const buttonB =  configData[i+1].match(numberRegex);
        const prize =  configData[i+2].match(numberRegex);

        clawMachineConfigs.push({
            buttonA: {x: parseInt(buttonA[0]), y: parseInt(buttonA[1])},
            buttonB: {x: parseInt(buttonB[0]), y: parseInt(buttonB[1])},
            prizeLocation: {x: parseInt(prize[0]), y: parseInt(prize[1])}
        });
    }

    return clawMachineConfigs;
}

//Load up all configs:
const clawMachineConfigs = loadConfigData(data);

//Part 1
//Button A costs 3 tokens
//Button B costs 1 token
//Find the lowest amount of tokens needed to get to the prize location
//max number of times to press each button is 100

const A_COST = 3;
const B_COST = 1;

function calculateCost(clawMachine, part2)
{    
    //set lowest cost to max int
    let lowestCost = 0;

    const pX = part2 ? clawMachine.prizeLocation.x + 10000000000000 : clawMachine.prizeLocation.x;
    const pY = part2 ? clawMachine.prizeLocation.y + 10000000000000 : clawMachine.prizeLocation.y;

    //theres prob some math we can do to minimize this properly
    //but in theory we could just brute force every combo
    let lowestA = 0;
    let lowestB = 0;
    for (let i = 0; i < 100; i++)
    {
        for (let j = 0; j < 100; j++)
        {
            if (pX === (clawMachine.buttonA.x * i) + (clawMachine.buttonB.x * j) &&
                pY === (clawMachine.buttonA.y * i) + (clawMachine.buttonB.y * j))
            {
                const cost = A_COST * i + B_COST * j;
                if (lowestCost === 0 || cost < lowestCost)
                {
                    lowestCost = cost;
                    lowestA = i;
                    lowestB = j;
                }
            }
        }
    }

    //console.log("lowestCost:", lowestCost, "lowestA:", lowestA, "lowestB:", lowestB);

    return lowestCost;
}

let totalTokens = 0
for (let i = 0; i < clawMachineConfigs.length; i++)
{
    const cost = calculateCost(clawMachineConfigs[i], false);
    //console.log(`Cost for config ${i}: ${cost}`);    
    totalTokens += cost;
}

console.log(`1) Total tokens: ${totalTokens}`);

// let totalTokens2 = 0
// for (let i = 0; i < clawMachineConfigs.length; i++)
// {
//     const cost = calculateCost(clawMachineConfigs[i], true);
//     //console.log(`Cost for config ${i}: ${cost}`);    
//     totalTokens2 += cost;
// }

//console.log(`2) Total tokens: ${totalTokens2}`); //nope!

// Part 2 now we gotta math it!
//use substitution to solve the linear equation
function findCoefficients(prizeLocationX, prizeLocationY, clawMachine) { 

    const A1 = clawMachine.buttonA.x;
    const B1 = clawMachine.buttonB.x;
    const P1 = prizeLocationX;

    const A2 = clawMachine.buttonA.y;
    const B2 = clawMachine.buttonB.y;
    const P2 = prizeLocationY;

    // Solve for j 
    const j = Math.round((P2 - A2 * (P1 / A1)) / (B2 - B1 * (A2 / A1))); 
    // Solve for i using the value of j 
    const i = Math.round((P1 - B1 * j) / A1); 
    return { i, j }; 
}

let totalTokens2 = 0
const len = clawMachineConfigs.length;

for (let ci = 0; ci < len; ci++)
{
    const config = clawMachineConfigs[ci];

    //console.log(`Config ${ci}:`, config);

    const prizeX = config.prizeLocation.x + 10000000000000;
    const prizeY = config.prizeLocation.y + 10000000000000

    const { i, j } = findCoefficients(prizeX, prizeY, config);
    //console.log(`Coefficients for config ${ci}: a: ${i}, b: ${j}`);

    const px = i * config.buttonA.x + j * config.buttonB.x;
    const py = i * config.buttonA.y + j * config.buttonB.y;
    //console.log(`Prize location for config ${ci}: px: ${px}, py: ${py}`);

    //make sure they work
    if ((px === prizeX) && (py === prizeY))
    {
        const cost = i * A_COST + j * B_COST;
        //console.log(`Cost for config ${ci}: ${cost}`);
        totalTokens2 += cost;
    }    
}

console.log(`2) Total tokens: ${totalTokens2}`);
