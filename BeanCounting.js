
function countBs(input){
    var bCount = 0;
    for(let i=0;i<input.length;i++){
        if(input.charAt(i) == "B") 
        bCount++; 
    }
    return bCount;
}

function countChar(input, key){
    var keyCount = 0;
    for(let i=0; i<input.length; i++){
        if(input.charAt(i) == key) 
        keyCount++;
    }
    return keyCount;
}

console.log(countBs("BBCDFTGhBBFb"));

console.log(countChar("Mississippi", "p"));