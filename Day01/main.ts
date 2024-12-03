
const data = Deno.readTextFileSync("./input.txt");

const list1 : number[] = [];
const list2 : number[] = [];

data.split('\n').forEach(line => {
    //each line contains 2 numbers seprated by space
    const numbers = line.trim().split(/\s+/);    

    const num1 = parseInt(numbers[0]);
    const num2 = parseInt(numbers[1]);

    //check if they are valid numbers (not NAN)
    if (!isNaN(num1) && !isNaN(num2)) {
        list1.push(num1);
        list2.push(num2);
    }
});

list1.sort();
list2.sort();

let totalDistance = 0;
for (let i = 0; i < list1.length; i++) {
    
    totalDistance += Math.abs(list1[i] - list2[i]);
    //console.log(list1[i], list2[i], totalDistance);
}
console.log('Total Distance:', totalDistance);

//1) count how many times each number appears in list 2
const counts : Record<number, number> = {};
list2.forEach(num => {
    if (counts[num]) {
        counts[num]++;
    } else {
        counts[num] = 1;
    }
})

//2) now go through each number in list 1 and multiply it by the count
let similarityScore = 0;
for (let i = 0; i < list1.length; i++) {
    const num = list1[i];
    const appearances = counts[num] || 0;
    similarityScore += num * appearances;
}
console.log('Similarity Score:', similarityScore);
