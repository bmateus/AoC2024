const data = Deno.readTextFileSync("./input.txt");

//------ DAY 11 ------//

function blink(stones) {

    const newStones = [];

    for (let i = 0; i < stones.length; i++)
    {
        const stone = stones[i];

        if (stone == '0') {
            newStones.push('1');
        }
        else if (stone.length % 2 == 0) {
            const left = parseInt(stone.slice(0,stone.length/2));
            const right = parseInt(stone.slice(stone.length/2,stone.length));
            newStones.push( left.toString());
            newStones.push( right.toString());
        }
        else {
            newStones.push((parseInt(stone) * 2024).toString());
        }
    }
    return newStones;
}

let result = data.trim().split(' ');
for (let blinks = 0; blinks < 25; blinks++) {
    result = blink(result);
}
console.log("1) num stones after 25 blinks:", result.length);


// let totalStones = 0;
// let resultFiles = ["./input.txt"];
// let blinks = 0;
// for (blinks = 0; blinks < 75; blinks++) {
//     const newResultFiles = [];
//     totalStones = 0;
//     for (let i = 0; i < resultFiles.length; i++) {
//         console.log("reading file:", resultFiles[i]);
//         const data = Deno.readTextFileSync(resultFiles[i]).trim().split(' ');        
//         const result = blink(data);        
//         console.log("blinks:", blinks, "stones:", result.length);
//         totalStones += result.length;
//         // so stones array gets too big after about 40 stones so we need to split it up
//         if (result.length > Math.pow(2, 24)) {            
//             //find the first space after result.length/2
//             const splitIdx = result.length/2;            

//             const fileA = `results-${blinks}-${newResultFiles.length}.txt`;
//             newResultFiles.push(fileA);
//             Deno.writeTextFileSync(fileA, result.slice(0, splitIdx).join(' '));

//             const fileB = `results-${blinks}-${newResultFiles.length}.txt`;
//             newResultFiles.push(fileB);
//             Deno.writeTextFileSync(fileB, result.slice(splitIdx, result.length).join(' '));

//         }
//         else {
//             //save the result back to a file
//             const file = `results-${blinks}-${newResultFiles.length}.txt`;
//             newResultFiles.push(file);
//             Deno.writeTextFileSync(file, result.join(' '));
//         }
//     }

//     resultFiles = [...newResultFiles];

//     console.log("total stones after", blinks, "blinks:", totalStones);
// }

//wow this totally doesnt work haha

function blink2(stoneMap) {

    const newStoneMap = {};

    //stone map contains a list of { id, num }
    //iterate the keys of stoneMap:
    for (let key in stoneMap) {
        if (key == '0') {
            if (newStoneMap['1'] == undefined) {
                newStoneMap['1'] = stoneMap['0'];
            }
            else {
                newStoneMap['1'] += stoneMap['0'];
            }            
        }
        else if (key.length % 2 == 0) {
            const left = parseInt(key.slice(0,key.length/2));
            const right = parseInt(key.slice(key.length/2,key.length));
            if (newStoneMap[left.toString()] == undefined) {
                newStoneMap[left.toString()] = stoneMap[key];    
            }
            else {
                newStoneMap[left.toString()] += stoneMap[key];
            }
            
            if (newStoneMap[right.toString()] == undefined) {
                newStoneMap[right.toString()] = stoneMap[key];    
            }
            else {
                newStoneMap[right.toString()] += stoneMap[key];
            }            
        }
        else {
            const k = (parseInt(key) * 2024).toString();
            if (newStoneMap[k] == undefined) {
                newStoneMap[k] = stoneMap[key];
            }
            else {
                newStoneMap[k] += stoneMap[key];
            }
        }
    }

    return newStoneMap;
}

let result2 = data.trim().split(' ');
let stoneMap = {};
result2.forEach(stone => {
    if (stoneMap[stone] == undefined) {
        stoneMap[stone] = 1;
    }  
    else {
        stoneMap[stone] += 1;
    }    
})

for (let blinks = 0; blinks < 75; blinks++) {

    stoneMap = blink2(stoneMap);
}

//count all 
let totalStones = 0;
for (let key in stoneMap) {
    totalStones += stoneMap[key];
}

console.log("2) num stones after 75 blinks:", totalStones);
