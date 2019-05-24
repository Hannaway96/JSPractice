async function locateScalpel(nest){
    let current = nest.name;
    for(;;){
        let next = await anyStorage(nest, current, "scalpel");
        if(next == current) return current;
        current = next;
    }
}

function locateScalpel2(nest){
    
}