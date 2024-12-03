const data = Deno.readTextFileSync("./input.txt");

//1) we want to scan for mul instructions

const regex = /mul\((\d+),(\d+)\)/g;
let total = 0;

for (const match of data.matchAll(regex)) 
{
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);
    total += num1 * num2;
}

console.log(total);


//2) do it again but also match the do() and don't() instructions

const regex2 = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
let total2 = 0;

let enabled = true; //start enabled

for (const match of data.matchAll(regex2)) 
{
    console.log(match[0]);
    switch(match[0]) 
    {
        case "do()": 
            enabled = true;
            break;
        case "don't()": 
            enabled = false; 
            break;
        default:
            if (enabled) {
                const num1 = parseInt(match[1]);
                const num2 = parseInt(match[2]);
                total2 += num1 * num2;        
            }
            break;        
    }
}

console.log(total2);