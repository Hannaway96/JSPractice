

let arrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];


console.log(arrays.reduce((flat, current) => flat.concat(current), []));

//honestly have no fucking clue how to read those types of functions???
//But apparently instead of there being an array of 3 arrays, reduce() concats them
//Reduce basically just reduces an array down to a single values