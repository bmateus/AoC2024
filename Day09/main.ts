const diskMap = Deno.readTextFileSync("./input.txt");

//------ DAY 09 ------//

//console.log(diskMap);

function init(map) {
    const uncompressed = [];    
    const fileList = [];
    const spaceList = [];
    for (let i = 0; i < map.length; i+=2) {
        //The digits alternate between indicating the length of a file and the length of free space.
        const length = parseInt(map[i]);
        const freeSpace = parseInt(map[i+1]);
        const currentID = i/2;

        const pos = uncompressed.length;                
        //insert currentID length times into uncompressed
        uncompressed.push(...Array(length).fill(currentID));
        fileList.push({id: currentID, pos: pos, length: length});

        //insert . freeSpace times into uncompressed
        if (freeSpace > 0)
        {
            const spacePos = uncompressed.length;
            uncompressed.push(...Array(freeSpace).fill('.'));
            spaceList.push({pos: spacePos, length: freeSpace});
        }
    }
    return [uncompressed, fileList, spaceList];
}

//console.log(uncompressed);

//now to compress it, start filling the free spaces by pulling stuff off the end

function compress(data) {

    let dataIdx = data.findLastIndex(x => x != '.');
    let freeIdx = data.findIndex(x => x == '.');
    //console.log(JSON.stringify(uncompressed));
    while (freeIdx < dataIdx) {
        data[freeIdx] = data[dataIdx];
        data[dataIdx] = '.';
        //console.log(JSON.stringify(uncompressed));        
        dataIdx = data.findLastIndex(x => x != '.');
        freeIdx = data.findIndex(x => x == '.');
    }
}

//calculate checksum
function calculateChecksum(data) {

    let checksum = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] != '.')
        {
            checksum += i * data[i];
        }
    }

    return checksum;
}


//1) 
const [data] = init(diskMap);
compress(data);
const checksum = calculateChecksum(data);
console.log("1) checksum:", checksum);
//6349606724455


function compress2(data, files, spaces) {
    for (let i = files.length-1; i >= 0; i--) {
        //try to find a space big enough to fit the file
        for (let j = 0; j < spaces.length; j++) {
            if (spaces[j].length >= files[i].length && spaces[j].pos < files[i].pos)
            {
                console.log("found a space for file", files[i].id);
                //copy the file into the space
                for (let k = 0; k < files[i].length; k++) {
                    data[spaces[j].pos + k] = data[files[i].pos + k];
                    data[files[i].pos + k] = '.';
                }
                //update the space
                spaces[j].pos += files[i].length;
                spaces[j].length -= files[i].length;                
                break;
            }
        }
    }
    return data;
}



//2) 
const [data2, files, spaces] = init(diskMap);
console.log("data2:", data2, "files:", files, "spaces:", spaces);
compress2(data2, files, spaces);
console.log("data2:", data2);
const checksum2 = calculateChecksum(data2);
console.log("2) checksum2:", checksum2);

//8504654861152 too high
//6376648986651 boom