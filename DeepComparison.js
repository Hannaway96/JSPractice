
function deepEqual(a, b){

    if(a === b) return true; // compares if they are two values are exact same

    if(a == null || typeof a != "object" || 
       b == null || typeof b != "object") return false; //compares if they aren't objects or are empty 

    let keysA = Object.keys(a); // data bindings for object properties
    let keysB = Object.keys(b);

    if(keysA.length != keysB.length) return false; // compares if objects have the same properties

    for(let key of keysA){ // deep comparison to compare each property in each object
        if(!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    
    return true;
}

let obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));