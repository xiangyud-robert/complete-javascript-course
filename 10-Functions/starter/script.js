'use strict';

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123', 2);
createBooking('LH123', undefined, '1000');

function oneWord(str) {
  return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = str => {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', oneWord);

const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};

greet('Hello')('Robert');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
console.log(lufthansa);
lufthansa.book(239, 'Robert DOng');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
console.log(eurowings);
lufthansa.book.call(eurowings, '001', 'Katie Tung');
console.log(eurowings);
lufthansa.book.apply(eurowings, ['001', 'Katie Tung']);
console.log(eurowings);
const euroWingsBooking = lufthansa.book.bind(eurowings);
lufthansa.book.bind(eurowings)('007', 'Katie Xiao');
console.log(eurowings);
lufthansa.book.bind(eurowings, '00787')('Katie Xiao');
console.log(eurowings);

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

lufthansa.buyPlane();
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

const addTax = (rate, value) => value + value * rate;
function convertToVAT(addTax) {
  return function (value) {
    return addTax(0.23, value);
  };
}

const myAddVAT = convertToVAT(addTax);
console.log(myAddVAT);
console.log(myAddVAT(23));

/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for
each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT
  POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer
  52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called
'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string'
option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  result: new Array(4).fill(0),
  registerNewAnswer() {
    const userInput = prompt(
      'What is your favourite programming language?\n' +
        '        0: JavaScript\n' +
        '        1: Python\n' +
        '        2: Rust\n' +
        '        3: C++\n' +
        '        (Write option number)',
    );

    if (userInput >= 0 && userInput <= 3) {
      this.result[userInput]++;
    } else {
      console.log('Invalid Input');
    }
    this.displayResults('string');
    this.displayResults('array');
  },
  displayResults(type = 'array') {
    if (type === 'string') {
      let output = `Poll results are ${this.result.join(', ')}`;
      console.log(output);
    } else if (type === 'array') {
      console.log(this.result);
    } else {
      console.log('Error');
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const bonus = {
  result: [5, 2, 3],
};

poll.displayResults.call(bonus, 'string');
poll.displayResults.call(bonus);

const bonus2 = {
  result: [1, 5, 3, 9, 6, 1],
};
poll.displayResults.call(bonus2, 'string');
poll.displayResults.call(bonus2);

const runOnce = function () {
  console.log('This will never run again');
};

(function (hello) {
  console.log(`${hello} This will never run again`);
})('HEY');

(hello => {
  console.log(`${hello} This will never run again`);
})('HEY');

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const unSecureBooking = function () {
  let reserveSeat = 0;
  return function () {
    reserveSeat++;
    console.log(`${reserveSeat} Seat`);
  };
};

let booker = secureBooking();
booker();
console.dir(booker);
booker = unSecureBooking();
booker();
booker();
console.dir(booker);

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    const perGroup = 999;
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, 1000 * wait);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

/*
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the
selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element
again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about
WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document
    .querySelector('body')
    .addEventListener('click', () => (header.style.color = 'blue'));
})();
