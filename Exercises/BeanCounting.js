
function countBs(input) {
    let bCount = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == "B")
            bCount++;
    }
    return bCount;
}

function countChar(input, key) {
    let keyCount = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == key)
            keyCount++;
    }
    return keyCount;
}

console.log(countBs("BBCDFTGhBBFb"));

console.log(countChar("Mississippi", "p"));