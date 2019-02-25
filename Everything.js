
function every(array, test){
    for(let i=0; i<array.length; i++){
        if(!test(array[i])) return false;
    }
    return true;
}

//OR

function every2(array, test){
    for(let element of array){
     if(!test(element)) return false;   
    }
    return true;
}

// OR

function every3(array, test){           //Still a bit lost on HOfunctions like this one, the others I kind of understand?
    return !array.some(element => !test(element));
}

console.log(every3([1, 2, 3], n => n < 10));
console.log(every3([2, 4, 16], n => n < 10));
console.log(every3([], n => n < 10));
