const data = Deno.readTextFileSync("./input.txt");

//------ DAY 08 ------//

const map = data.split('\n').map(line => line.trim());

const rows = map.length;
const cols = map[0].length;

console.log("rows:", rows, "cols:", cols);


const antennas = {};

for (let py = 0; py < rows; py++) {
    for (let px = 0; px < cols; px++) {
        const locationVal = map[py][px];
        if (locationVal != '.') {
            //console.log("found antenna", map[py][px] ,"at", px, py);
            if (antennas[locationVal] === undefined) {
                antennas[locationVal] = [];
            }
            antennas[locationVal].push({x: px, y: py});
        }        
    }
}

function getAntinodes(antennas, resonant) 
{
    const antinodes = [];
    //for each pair of antennas, check for antinodes:
    for (let i = 0; i < antennas.length; i++) {
        for (let j = i + 1; j < antennas.length; j++) {
            
            //console.log("checking antenna pairs at locations:", `(${antennas[i].x},${antennas[i].y})`, `(${antennas[j].x},${antennas[j].y})`); 
            
            let k = 2;
            let inBounds = true;

            //check antinodes in one direction:
            do {
                            
                const antinodeX = antennas[i].x + (antennas[j].x - antennas[i].x) * k;
                const antinodeY = antennas[i].y + (antennas[j].y - antennas[i].y) * k;
            
                inBounds = (antinodeX >= 0 && antinodeX < cols && antinodeY >= 0 && antinodeY < rows);
                
                if (inBounds)
                {
                    //console.log("found antinode at", antinodeX, antinodeY);
                    antinodes.push({x: antinodeX, y: antinodeY});
                    k++;
                }
                                
            } while (resonant && inBounds);

            k = 2;
            inBounds = true;

            //check antinodes in other direction:
            do {                
                const antinodeX2 = antennas[j].x + (antennas[i].x - antennas[j].x) * k;
                const antinodeY2 = antennas[j].y + (antennas[i].y - antennas[j].y) * k;
                
                inBounds = (antinodeX2 >= 0 && antinodeX2 < cols && antinodeY2 >= 0 && antinodeY2 < rows);
                if (inBounds)
                {
                    //console.log("found antinode at", antinodeX2, antinodeY2);
                    antinodes.push({x: antinodeX2, y: antinodeY2});
                    k++;
                }
            } while (resonant && inBounds);
        }
    }

    return antinodes;
}

const uniqueAntinodeLocations = new Set();

for (let key in antennas) {
    //console.log(key, antennas[key]);
    const antinodes = getAntinodes(antennas[key], false);
    //console.log("key", key, "has", antennas[key].length, "antennas", "and has", antinodes.length, "antinodes");
    //add teach antinode location to the set:
    antinodes.forEach(antinode => uniqueAntinodeLocations.add(`${antinode.x},${antinode.y}`));    
}

//console.log([...uniqueAntinodeLocations].sort());
console.log("1) unique antinode locations:", uniqueAntinodeLocations.size);

const uniqueAntinodeLocations2 = new Set();


for (let key in antennas) {
    //console.log(key, antennas[key]);
    const antinodes = getAntinodes(antennas[key], true);
    //console.log("key", key, "has", antennas[key].length, "antennas", "and has", antinodes.length, "antinodes");
    //add teach antinode location to the set:
    antinodes.forEach(antinode => uniqueAntinodeLocations2.add(`${antinode.x},${antinode.y}`));    

    //also add antennas
    antennas[key].forEach(a => uniqueAntinodeLocations2.add(`${a.x},${a.y}`));
}

//console.log([...uniqueAntinodeLocations2].sort());
console.log("2) unique resonant antinode locations:", uniqueAntinodeLocations2.size);

//845 was too low <-- had to add antennas too

