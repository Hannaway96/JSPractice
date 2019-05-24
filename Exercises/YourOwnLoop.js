
function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
        body(value);
    }
}

function Loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
        body(value);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);

/*
    Ok so I think I have a slightly better understanding of higher Order functions.
    Start at 3.
    Test is a function that checks that checks if value is greater than 1
    Update is a function that decrements value by one and sets the new number to Value
    Body is a function that replaces body with Console.log that then displays the number after each iteration
*/