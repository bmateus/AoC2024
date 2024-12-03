const data = Deno.readTextFileSync("./input.txt");

const checkLevelSequence = (sequence : number[], dampner : number) : boolean=> {

    let lastDir = 0;
    let lastNum = 0;
    
    for (let i = 0; i < sequence.length; i++) {
    
        const num = sequence[i];

        if (i > 0) {
        
            const delta = num - lastNum;
            const dir = delta > 0 ? 1 : -1;
            const absDelta = Math.abs(delta);

            if (absDelta < 1 || absDelta > 3 || (lastDir != 0 && lastDir != dir))
            {                
                if (dampner > 0) {                    
                    //if dampner > 0, then this sequence is good as long as there is one subsequence that is good
                    for (let j = 0; j < sequence.length; j++) {
                        const subSequence = sequence.slice(0, j).concat(sequence.slice(j+1));    
                        if(checkLevelSequence(subSequence, dampner - 1))
                        {
                            //console.log("...subsequence safe!");
                            return true;
                        }
                    }                
                }                                                                      
                return false;                
            }

            lastDir = dir;                                        

        }

        lastNum = num;
    }

    return true;
}

// 1) check the sequences

const levels = data.split('\n');

let safeCount = 0;

levels.forEach(line => {

    const numbers = line.trim().split(/\s+/).map(n => parseInt(n));
    if(checkLevelSequence(numbers, 0))
    {
        safeCount++;
    }    

});

console.log("1) safe count:", safeCount);

//2) now we do it again but this time use 1 dampner
safeCount = 0;

levels.forEach((line, idx) => {

    const numbers = line.trim().split(/\s+/).map(n => parseInt(n));  
    if (checkLevelSequence(numbers, 1))
    {
        safeCount++;
        console.log(idx, ")", JSON.stringify(numbers), "[SAFE]", safeCount);
    }    
    else
    {     
        console.log(idx, ")", JSON.stringify(numbers), "[X]", safeCount);
    }  

});

console.log("2)safe count:", safeCount);

console.log("total levels:", levels.length);