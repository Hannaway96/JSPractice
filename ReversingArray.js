
function reverseArray(inputArr){

    let outputArr = [];

    for(i=inputArr.length-1; i>=0; i--){
        outputArr.push(inputArr[i]);
    }
    return outputArr;
}

function reverseArrayInPlace(inputArr){

    for(let i=0; i<= Math.floor(inputArr.length/2); i++){
        let old = inputArr[i];
        inputArr[i] = inputArr[inputArr.length-1 - i];
        inputArr[inputArr.length - 1 - i] = old;
    }   
    return inputArr;
}

console.log(reverseArray(["A", "B", "C", "D"]));

let arrayValue = [1, 2, 3, 4];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);