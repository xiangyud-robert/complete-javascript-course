'use strict';

// Data needed for a later exercise
const flights2 =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

let a = 1;
let b = 2;
let c;
console.log(a, b);
[a, b] = [b, a];
console.log(a, b);

const nested = [2, 4, [5, 6]];
console.log(nested);

[a, , [b, c]] = nested;
console.log(a, b, c);

const [p = 1, q = 1, r] = [8];
console.log(p, q, r);

let restaurantName = restaurant.name;
let hours = restaurant.openingHours;
let tags = restaurant.categories;
let missing;
console.log(restaurantName, hours, tags);

({
  name: restaurantName,
  openingHours: hours,
  categories: tags,
  www: missing = [],
} = restaurant);
console.log(restaurantName, hours, tags, missing);

let aa = 111,
  bb = 999;
console.log(aa, bb);
const obj = { aa: 23, bb: 7, cc: 14 };
({ aa, bb } = obj);
console.log(aa, bb);

const {
  openingHours: {
    fri: { open: openNested, close },
  },
} = restaurant;
console.log(openNested, close);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

const [pizza1, , risotto1, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza1, risotto1, otherFood);

const { sat: saturada, ...weekdays } = restaurant.openingHours;
console.log(saturada, weekdays);
const add = function (...number) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    sum += number[i];
  }
  console.log('sum is ' + sum);
};

add(2, 3, 4);
add(...[2, 3, 4]);

const abc = null;
const prq = 0;
console.log(abc && prq && '');
console.log(null ?? undefined);
console.log('s ' ?? undefined ?? null);
console.log('!!!!!!!!!!!!!!');
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
rest1.numGuests ??= 10;
rest2.numGuests ||= 10;

console.log(rest1);
console.log(rest2);

///////////////////////////////////////
// Coding Challenge #1

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

const {
  odds: { team1: team1X, x: drawX, team2: team2X },
} = game;
console.log(team1X, drawX, team2X);

function printGoals(...players) {
  console.log(players);
  console.log(players.length);
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

team1 < team2 && console.log('team 1 is more likely to win');
team2 < team1 && console.log('team 2 is more likely to win');

/*

7. The team with the lower odd is more likely to win. Print to the console
which team is more likely to win, WITHOUT using an if/else statement or the
ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const weekdays1 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays1[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays1[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays1[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
console.log(openingHours);

console.log(restaurant.openingHours.mon?.open); // if mon does not exist, undefined will be returned instead of error. But if openingHours does not exist, error will be returned.

restaurant.openingHours = null;
console.log(restaurant.openingHours?.mon?.open); // nested optional chaining.

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

console.log(Object.values(game));

console.log('Entries ' + Object.entries(game));

for (let entry of Object.entries(game)) {
  console.log(entry);
}

/*
BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

for (const [key, value] of game.scored.entries()) {
  console.log(`Goal ${key + 1}: ${value}`);
}

let startNumber = 0;
for (const value of Object.values(game.odds)) {
  startNumber += value / Object.values(game.odds).length;
}
console.log(startNumber);

for (const [key, value] of Object.entries(game.odds)) {
  let output;
  if (key === 'x') {
    output = `Odd of draw: ${value}`;
  } else {
    output = `Odd of victory ${game[key]}: ${value}`;
  }
  console.log(output);
}

const scorerData = {};

for (const scorer of game.scored.values()) {
  if (scorerData[scorer]) {
    scorerData[scorer]++;
  } else {
    scorerData[scorer] = 1;
  }
}

console.log(scorerData);

/////////////////////////////////////////////////////////
// New Operations to Make Sets Useful!

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

const commonFoods = italianFoods.intersection(mexicanFoods);

console.log('Intersection:', commonFoods);
console.log([...commonFoods]);

const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('Union:', italianMexicanFusion);

console.log(new Set([...italianFoods, ...mexicanFoods]));

const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Difference italian', uniqueItalianFoods);

const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Difference mexican', uniqueMexicanFoods);

const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log('SymmetricDifference', uniqueItalianAndMexicanFoods);

console.log(italianFoods.isDisjointFrom(mexicanFoods));
/////////////////////////////////////////////////////////
// Sets
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
  2,
]);
orderSet.delete('Pizza');
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
// orderSet.clear();
console.log(orderSet);
for (const name of orderSet) {
  console.log(name);
}

console.log([...orderSet]);
console.log(new Set('1122abc'));

const myMap = new Map();
myMap.set('name', 'Classicico');
console.log(myMap.set(1, 'dsffsd'));

myMap.set('name', 'Classico Italiano');
myMap.set(1, 'Firenze, Italy');
myMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(myMap);
// myMap.clear();
console.log(myMap.size);
myMap.set([1, 2], 'test');
console.log(myMap.get([1, 2]));

myMap.set(document.querySelector('h1'), 'Heading');

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);

const questionArr = [1, 2, 3];

console.log(question);

console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
console.log([...question]);

console.log(question.entries());
console.log(question.keys());
console.log(question.values());

console.log(...questionArr.entries());
console.log(...questionArr.keys());
console.log(...questionArr.values());

// Coding Challenge #3

/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the
 game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game
 has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, it was found that the yellow card from minute 64 was unfair. So remove this event from
the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game
 has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45
min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);
gameEvents.delete(64);
console.log(gameEvents);

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`,
);

for (const [time, event] of gameEvents) {
  let output =
    time < 45
      ? `[FIRST HALF] ${time}: ${event}`
      : `[SECOND HALF] ${time}: ${event}`;

  console.log(output);
}

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log('B737'.indexOf('7'));
console.log('B737'.lastIndexOf('7'));
console.log('B737'.slice(1, -1));

console.log(typeof new String('B737')); // Returns Object
console.log(typeof new String('B737').slice(1)); // Returns string

console.log('TAP Air Portugal'.toLowerCase());
console.log('321 \n 321'.toUpperCase());
console.log(' 321  321 '.trim());
console.log(' 321  321 \n'.trim());
console.log(' A320  B737 \n'.trim() === 'A320  B737');

console.log('A320  B737'.replace('7', '6'));
console.log('A320  B737'.replaceAll('7', '6'));

console.log('A320  B737'.includes('320'));
console.log('A320  B737'.startsWith('A320'));
console.log('A320  B737'.endsWith('B737'));
console.log('A320  B737'.split('23'));
console.log('a+very+nice+string'.split('+'));
console.log(['a', 'very', 'nice', 'string'].join('-'));

const message = 'Go to gate 23!';
console.log('Go to gate 23!'.padStart(20, '+').padEnd(30, '+'));
console.log(message.padStart(20, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));
console.log('Stop! '.repeat(5));

// underscore_case and convert them to camelCase
const input =
  'underscore_case\n' +
  ' first_name\n' +
  'Some_Variable \n' +
  '  calculate_AGE\n' +
  'delayed_departure';

const inputText = input.split('\n');
console.log(inputText);
let counter = 0;
let counter1 = 0;

for (const originalInputString of inputText) {
  const inputString = originalInputString.trim().toLowerCase().split('_');
  let outputString = '';
  for (const word of inputString) {
    if (word === inputString[0]) {
      outputString += word;
      continue;
    }
    outputString += word[0].toUpperCase() + word.slice(1);
  }
  const outputString1 = outputString
    .padEnd(20, ' ')
    .padEnd(20 + ++counter, '✅');

  console.log(outputString1);
  const outputString2 = outputString.padEnd(20, ' ') + '✅'.repeat(++counter1);
  console.log(outputString2);
}

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const items = flights.split('+');
for (const row of items) {
  const item = row.split(';');
  const status = item[0].trim().replaceAll('_', ' ');
  const finalStatus = status.includes('Delayed') ? '🔴' + status : status;
  const fromAirport = item[1].toUpperCase().slice(0, 3);
  const toAirport = item[2].toUpperCase().slice(0, 3);
  const duration = item[3].replace(':', 'h');
  let message = `${finalStatus} from ${fromAirport} to ${toAirport} (${duration})`;

  const finalMessage = message.padStart(45);
  console.log(finalMessage);
}

console.log();
