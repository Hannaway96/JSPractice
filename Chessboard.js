
var input = 8;
var rowStr = "";

for(var i=0; i < input; i++){   //loops rows 8 times
    for(var j =0; j < input; j++){ //loops each square
        if((j+i) % 2 ==0){         //if the j+i divisible by 2 or even means
            rowStr += " ";         //square =  " "
        } else {
            rowStr += "#";          // otherwise it is "#"
        }
    }
    rowStr += "\n";                 //then after 8 squares make a new row
}

console.log(rowStr);                //display the chess board