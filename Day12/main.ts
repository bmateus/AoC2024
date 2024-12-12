const data = Deno.readTextFileSync("./input.txt");

//------ DAY 12 ------//

const map = data.split('\n').map(line => line.trim());

const rows = map.length;
const cols = map[0].length;

console.log("rows:", rows, "cols:", cols);

//need to collect regions, calculate the area of a region
//and calculate the perimeter of a region

function calculateTotalCost(contiguousFences: boolean) {
    
    const visitedMap = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    const regions : {regionId: number, area: number, perimeter: number }[] = [];

    function floodfill(px: number, py: number, region) {

        //console.log("floodfill", px, py, region.regionId);

        visitedMap[py][px] = 1; //mark spot as visited on visited map
        region.area += 1;

        //check up
        if (py - 1 < 0 || map[py - 1][px] != region.regionId) {        

            //only add a perimeter if there is no matching region to the left
            if (!contiguousFences || px - 1 < 0 || (map[py][px - 1] != region.regionId || (py - 1 >= 0 && map[py - 1][px - 1] == region.regionId))) {
                //console.log("adding top perimeter", px, py);
                region.perimeter += 1;    
            }        
        }
        else if (visitedMap[py - 1][px] == 0 )
        {
            floodfill(px, py - 1, region);
        }


        //check left
        if (px - 1 < 0 || map[py][px - 1] != region.regionId) {

            //only add a perimeter if there is no matching region above
            if (!contiguousFences || py - 1 < 0 || map[py - 1][px] != region.regionId || (px - 1 >= 0 && map[py - 1][px - 1] == region.regionId)) {
                //console.log("adding left perimeter", px, py);
                region.perimeter += 1;
            }        
        }
        else if (visitedMap[py][px - 1] == 0 )
        {
            floodfill(px - 1, py, region);
        }

        //check down
        if (py + 1 >= rows || map[py + 1][px] != region.regionId) {

            //only add a perimeter if there is no matching region to the left
            if (!contiguousFences || px - 1 < 0 || (map[py][px - 1] != region.regionId || (py + 1 < rows && map[py + 1][px - 1] == region.regionId))) {
                //console.log("adding bottom perimeter", px, py);
                region.perimeter += 1;
            }
        }
        else if (visitedMap[py + 1][px] == 0 )
        {
            floodfill(px, py + 1, region);
        }

        //check right
        if (px + 1 >= cols || map[py][px + 1] != region.regionId) {
            //only add a perimeter if there is no matching region above
            if (!contiguousFences || py - 1 < 0 || (map[py - 1][px] != region.regionId || (px + 1 < cols && map[py - 1][px + 1] == region.regionId))) {
                //console.log("adding right perimeter", px, py);
                region.perimeter += 1;
            }
        }
        else if (visitedMap[py][px + 1] == 0 )
        {
            floodfill(px + 1, py, region);
        }
    }

    for (let py = 0; py < rows; py++) {
        for (let px = 0; px < cols; px++) {
            if (visitedMap[py][px] == 0) {
                const newRegion = {regionId: map[py][px], area: 0, perimeter: 0};
                floodfill(px, py, newRegion);
                //console.log("new region:", newRegion);
                regions.push(newRegion);
            }
        }
    }

    //we should now have a list of regions with area and perimeter

    let totalCost = 0;

    regions.forEach(region => {
        totalCost += region.area * region.perimeter;
    });

    return totalCost;

}

console.log("1) totalCost:", calculateTotalCost(false));

console.log("2) totalCost with contiguous:", calculateTotalCost(true));


