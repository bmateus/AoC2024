const data = Deno.readTextFileSync("./input.txt");

//------ DAY 07 ------//

const equations = data.split('\n');

function checkEquation(answer : number, operands : number[]) {

    //console.log("answer:", answer, "operands:", operands);

    //check each operand with + or * and see if it matches the answer
    
    //how many combinations do we have to check?
    //2^(operands.length - 1)?
    //so if we have 3 operands we have 2^(3 - 1) = 4 combinations
    //a + b + c
    //a + b * c
    //a * b + c
    //a * b * c

    for (let i = 0; i < Math.pow(2, operands.length - 1); i++) {

        const bits = i.toString(2).padStart(operands.length - 1, '0');
        
        let calculatedAnswer = operands[0];

        for (let j = 0; j < bits.length; j++)
        {

            if (bits[j] == '0') {
                calculatedAnswer += operands[j + 1];
            }    
            else {
                calculatedAnswer *= operands[j + 1];
            }
        }    
            
        //console.log(operands, bits, answer);
        if (calculatedAnswer === answer) {
            //console.log("found answer:", calculatedAnswer, bits, JSON.stringify(operands));
            return answer;
        }
        
    }

    return 0;
}


let result = 0;
equations.forEach(equation => {

    //break the equation into the answer and the list of operands
    const splitEq = equation.split(':');
    const answer = parseInt(splitEq[0]);
    const operands = splitEq[1].trim().split(' ').map(n => parseInt(n));

    result += checkEquation(answer, operands);    
});

console.log("1) result:", result);

//haha #2 is crazy...

function checkEquation2(answer : number, operands : string[]) {

    //for this one, we can concat all the operands and feed them into the first checkEquation function
    //how many ways can we concat?
    // a b c (no concat)
    // a || b c
    // a b || c
    // a || b || c
    //so basically the same thing as the first one but with || or not || instead

    for (let i = 0; i < Math.pow(2, operands.length - 1); i++) {
        
        const bits = i.toString(2).padStart(operands.length - 1, '0');

        const newOperands : string[] = [operands[0]];

        for (let j = 0; j < bits.length; j++)
        {
            if (bits[j] == '0') {
                newOperands.push(operands[j+1]);
            }
            else //concat the last operand
            {
                const lastOperand = newOperands[newOperands.length - 1];
                newOperands[newOperands.length - 1] = lastOperand.concat(operands[j+1]);
            }            
        }    
        
        //console.log(answer, operands, bits, newOperands);

        //now we check the new, possibly concatenated operands
        const nums = newOperands.map(n => parseInt(n));
        if (nums.length == 1) {
            if (nums[0] == answer) {
                //console.log("found answer:", answer, bits, JSON.stringify(operands), JSON.stringify(nums));
                return answer;       
            }         
        }        
        else if (checkEquation(answer, nums) > 0) {
            if (operands.length != nums.length)
            {
                //console.log("\tfound answer:", answer, bits, JSON.stringify(operands), JSON.stringify(nums));
            }
            return answer;
        }
    }

    return 0;
}


let result2 = 0;
equations.forEach(equation => {

    //break the equation into the answer and the list of operands
    const splitEq = equation.split(':');
    const answer = parseInt(splitEq[0]);
    const operands = splitEq[1].trim().split(' ');

    result2 += checkEquation2(answer, operands);    
});

console.log("2) result:", result2);        
//its not 14302644691517 :(
          
//oh my order of operations is totally wrong
//everything should be evaluated left to right still
//try again:

function checkEquation3(answer : number, operands : string[]) {

    for (let i = 0; i < Math.pow(3, operands.length - 1); i++) {

        const bits = i.toString(3).padStart(operands.length - 1, '0');
        
        let calculatedAnswer = parseInt(operands[0]);

        for (let j = 0; j < bits.length; j++)
        {

            if (bits[j] == '0') {
                calculatedAnswer += parseInt(operands[j + 1]);
            }    
            else if (bits[j] == '1') {
                calculatedAnswer *= parseInt(operands[j + 1]);
            }
            else {
                calculatedAnswer = parseInt(calculatedAnswer.toString().concat(operands[j + 1]));
            }
        }    
            
        //console.log(operands, bits, answer);
        if (calculatedAnswer === answer) {
            //console.log("found answer:", calculatedAnswer, bits, JSON.stringify(operands));
            return answer;
        }
        
    }

    return 0;
}

let result3 = 0;
equations.forEach(equation => {

    //break the equation into the answer and the list of operands
    const splitEq = equation.split(':');
    const answer = parseInt(splitEq[0]);
    const operands = splitEq[1].trim().split(' ');

    result3 += checkEquation3(answer, operands);    
});

console.log("3) result:", result3);        
//106016735664498 //success!

