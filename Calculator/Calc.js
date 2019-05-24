const inputList = [];

function insert(character) {
    inputList.push(character);
    display(inputList);
}

function backSpace() {
    if (inputList.length > 0) {
        inputList.pop();
        display(inputList);
    }
}

function display(input) {
    document.form.textView.value = "";
    if (Array.isArray(input)) {
        for (let char of input) {
            document.form.textView.value = document.form.textView.value + char;
        }
    }
    else {
        document.form.textView.value = input;
    }
    console.log(inputList);
}

function clearInputList() {
    if (inputList.length > 0) {
        inputList.splice(0, inputList.length);
        display(inputList);
    }
}

function equals() {
    let stringArray = "";
    for (let i = 0; i < inputList.length; i++) {
        stringArray += inputList[i];
    }
    let answer = eval(stringArray);
    clearInputList();

    answer = answer.toString();
    for (let i = 0; i < answer.length; i++) {
        inputList.push(answer.charAt(i));
    }

    display(answer);
}