for(var i =0; i < 100; i++){ //standard for loop
    var output = "";         //var or let for variables
    if(i % 3 == 0 && i % 5 == 0) output += "FizzBuzz";
    continue;
    if(i % 3 == 0) output += "Fizz"; //if i is divisible by 3 output fizz instead
    if(i % 5 == 0) output += "Buzz";
     //if i is divisible by 5 output buzz instead
    console.log(output || i);   // log output or i
}

//Output will always return to an empty string so will be null
// so when the program reaches the bottom it will it will result to false
// thus the log output will then be i
//Buzzing with gettting the extra part right :))))