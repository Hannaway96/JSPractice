let map = {
    one: true,
    two: true,
    hasOwnProperty: true
};

//fix this so I can use "hasOwnProperty" with the object
//console.log(map.hasOwnProperty("one"));

//you use this to get to the core object methods
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
