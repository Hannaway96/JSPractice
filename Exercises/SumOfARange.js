
function range(start, end) {
    let numArr = [];

    if (start < end) {
        for (let x = start; x <= end; x++) {
            numArr.push(x);
        }
    }
    else {
        for (let x = start; x >= end; x--) {
            numArr.push(x);
        }
    }
    return numArr;
}

function sum(inputArr) {

    let total = 0;
    for (let value of inputArr) {
        total += value;
    }
    return total;
}

console.log(range(1, 10));
console.log(range(5, 2));
console.log(sum(range(1, 10)));
