
const data = require('./src/data.json');

let finalResult = simulator();
console.log(finalResult)

// DATA Dycription
function simulator(){    
    let temp = data.gps.split(" ");
    let final = [];
    for (let i = 0; i < data.range.length; i++) {
        res = temp.splice(0, data.range[i].length);
        res = hex2Bin(res)
        if(i === 5){ // Course/Status decryption
            res = courseStatus(res);
        }
        final.push({
            title: data.range[i].title,
            value: res
        });      
    }
    return final;
}

// Course/Status decryption
function courseStatus(array){
    array = array.replace(" ", "").split("");
    let result = [];
    for (let index = 0; index < array.length; index++) {
        if(index === 2){
            if(array[2] === '0'){
                result.push("GPS real-time");
            } else {
                result.push("Differential positioning");
            }
        } else if(index === 3){
            if(array[3] === '0'){
                result.push("GPS having been positioning");
            } else {
                result.push("GPS not having been positioning");
            }
        } else if(index === 4){
            if(array[4] === '0'){
                result.push("East Longitude");
            } else {
                result.push("West Longitude");
            }
        } else if(index === 5){
            if(array[5] === '0'){
                result.push("South Latitude");
            } else {
                result.push("North Latitu");
            }
        } else if(index === 6){
            let temp = array.splice(6, array.length-5);
            var digit = temp.join("");
            digit = parseInt(digit, 2) // Convert Binary to decimal
            result.push("Course: " + digit + "°");
        } else {
            result.push(array[index])
        }      
    }
    return result;
}

// convert Hex to Binary
function hex2Bin(hex){
    let result = '';
    hex.forEach(element => {
        result =  result + " " + ("00000000" + (parseInt(element, 16)).toString(2)).substr(-8)
    });
    return result.trim();    
}

  