'use strict';

const keyword = "11";

function calcAge1(birth1Year) {
    return 2037 - birth1Year;
}

const calcAge2 = function (birth1Year) {
    return 2037 - birth1Year;
}

const calcAge3 = birth1Year => 2037 - birth1Year;

const calcAge4 = birth1Year => {
    return 2037 - birth1Year;
}

console.log(calcAge1(2020));
console.log(calcAge2(2020));
console.log(calcAge3(1));
