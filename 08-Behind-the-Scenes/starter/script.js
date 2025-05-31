'use strict';

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
//
// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
//
// calcAge(1991);
//
// calcAgeArrow(1991);
//
// const amelia = {
//   onlyFunction: birthYear => {
//     console.log(2037 - birthYear);
//     console.log(this);
//   },
//   onlyFunction2: calcAge,
// };
//
// const jonas = {
//   year: 1991,
//   firstFunction: calcAge,
//   secondFunction: calcAgeArrow,
//   thirdFunction: amelia.onlyFunction,
//   fourthFunction: function () {
//     console.log(this);
//   },
// };
//
// jonas.firstFunction(1991);
// jonas.secondFunction(1991);
// console.log('third');
// jonas.thirdFunction(1991);
// jonas.fourthFunction();
//
// console.log('amelia call');
// amelia.onlyFunction2(2000);

// const firstName = 'firstName';
// var firstName2 = 'firstName22';
// const object1 = {
//   firstName: 'obj1',
//   greet: function () {
//     console.log(`Hey ${this.firstName}`);
//   },
//   greet2: () => console.log(`Hey ${this.firstName2}`),
// };
//
// object1.greet();
// object1.greet2();

function fun22(a, b) {
  return a + b;
}

const func2 = function (a, b) {
  console.log(arguments);
  return a + b;
};

// console.log(func1(1, 2));
console.log(func2(1, 2, 3, 4, 5));
