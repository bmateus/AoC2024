const rulesData = Deno.readTextFileSync("./rules.txt");
const sequenceData = Deno.readTextFileSync("./input.txt");

//------ DAY 05 ------//

const sequences = sequenceData.split('\n');
const rules = rulesData.split('\n');

const ruleMap = {};
rules.forEach(r => {
    const rulePair = r.trim().split("|");
    const ruleLeft = parseInt(rulePair[0]);
    const ruleRight = parseInt(rulePair[1]);

    if (!ruleMap[ruleLeft]) {
        ruleMap[ruleLeft] = [];
    }
    ruleMap[ruleLeft].push(ruleRight);     

});

//console.log(ruleMap);

let total = 0;

const wrongOrderSequences = [];

function checkSequence(sequence) : boolean {

    for (let i = 0; i < sequence.length; i++ ) {
        const ruleLeft = sequence[i];
        const rule = ruleMap[ruleLeft];
        //check that every number after sequence[i] is a valid rule        
        for (let j = i+1; j < sequence.length; j++ ) {
            const ruleRight = sequence[j];            
            if (!rule.includes(ruleRight)) {
                //console.log("sequence", sequence, "is invalid", "no rule for", ruleLeft, "and", ruleRight);
                wrongOrderSequences.push(sequence); //for #2
                return false;
            }
        }        
    }
    return true;
}


sequences.forEach(s => {  
        
    //split into a number array on the comma
    const sequence = s.trim().split(",").map(n => parseInt(n));
    //console.log(sequence);
    if (checkSequence(sequence)) {
        //console.log("sequence", sequence, "is valid");
        //add the middle number to total
        const middle = Math.floor(sequence.length / 2);
        //console.log("middle:", sequence[middle]);
        total += sequence[middle];
    }
});

console.log("1) total:",total);

//console.log("2) wrong order sequences:", wrongOrderSequences);

let total2 = 0;

//need to reorder these with the correct rules
wrongOrderSequences.forEach(sequence => {
    //sort based on the rules
    sequence.sort((a,b) => ruleMap[a].includes(b) ? -1 : 1);
    if (checkSequence(sequence)) {
        //should be valid!
        //console.log("sorted sequence", sequence, "is valid");
        const middle = Math.floor(sequence.length / 2);
        //console.log("middle:", sequence[middle]);
        total2 += sequence[middle];
    }
    else
    {
        //console.log("sorted sequence", sequence, "is invalid");
    }
});


console.log("2) total2:",total2);

