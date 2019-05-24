
function ArrayToList(inArr) {
    let list = null;

    for (let i = inArr.length - 1; i >= 0; i--) {
        list = { value: inArr[i], rest: list };
    }
    return list;
}

function ListToArray(inList) {

    let outArr = [];
    for (node = inList; node; node = node.rest) {
        outArr.push(node.value);
    }
    return outArr;
}

function prepend(element, inList) {

    //takes an element and appends it onto the start of list
    //and out puts new list
    return { value: element, rest: inList };
}

function nth(inList, n) {
    if (!inList) return undefined;   //if not list return undefined 
    else if (n == 0) return inList.value;    // elseif n = current node, return its value
    else return nth(inList.rest, n - 1);  // else nove to the next node in the list 
}

console.log(ArrayToList([10, 20]));
console.log(ListToArray(ArrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(ArrayToList([10, 20, 30,]), 1));