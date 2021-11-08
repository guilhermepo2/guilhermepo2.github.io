function tryTo(description, callback) {
    for(let timeout = 1000; timeout > 0; timeout--) {
        if(callback()) {
            return;
        }
    }

    throw 'Timeout while trying to ' + description;
}

function randomRange(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function shuffle(arr) {
    let temp, r;
    for(let i = 1; i < arr.length; i++) {
        r = randomRange(0, i);
        temp = arr[i];
        arr[i] = arr[r];
        arr[r] = temp;
    }

    return arr;
}

/*
We iterate over an array of strings representing a row of data. 
We pad out each string with spaces until it is 10 characters long and add it to the last string. 
We return the combined string, which should be a perfectly spaced out row of score data.
*/
function rightPad(textArray) {
    let finalText = "";
    textArray.forEach(text => {
        text+=" ";
        for(let i =text.length; i < 10; i++) {
            text += " ";
        }
        finalText += text;
    });
    return finalText;
}