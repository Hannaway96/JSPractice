function verify(regExp, yes, no) {
    let valid = true;
    if (regExp.source == "...") return;
    for (let str of yes) {
        if (!regExp.test(str)) {
            console.log(`Failure to match '${str}'`);
            valid = false;
        }
    }
    for (let str of no) if (regExp.test(str)) {
        console.log(`Unexpected match for '${str}'`);
    }
    if(valid){
        console.log("Passed");
    }
}

verify(/ca[rt]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

verify(/ferr(y|et|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(/ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,
    ["bad punctuation ."],
    ["escape the period"]);

verify(/\w{7}/,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

verify(/\b[^\We]+\b/i,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]);

