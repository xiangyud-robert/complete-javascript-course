'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? [...movements].sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
console.log(['a', 'b', 'c', 'd', 'e'].slice(1));
console.log(['a', 'b', 'c', 'd', 'e'].slice(1, 3));
console.log(['a', 'b', 'c', 'd', 'e'].slice(-4, -3));
console.log(['a', 'b', 'c', 'd', 'e'].slice(1, -1));
console.log(['a', 'b', 'c', 'd', 'e'].slice());

console.log('NNNNEEEWWWW');
const arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = arr.splice(1);

console.log(arr);
console.log(arr2);
const arr3 = ['a', 'b', 'c', 'd', 'e'];
const arr4 = arr3.splice(1, 2);
console.log(arr3);
console.log(arr4);

const arrayReverse = ['x', 'y', 'z'];
console.log(arrayReverse.reverse());
console.log(arrayReverse);
console.log(arrayReverse.concat(['x', 'y', 'z']));
console.log(arrayReverse);
console.log([...['a', 'b', 'c'], ...['x', 'y', 'z']]);
console.log(typeof ['x', 'y', 'z'].join(' - '));

const myArray = ['a', 'b', 'c', 'd', 'e'];

console.log(myArray[2], myArray.at(2));
console.log(myArray[myArray.length - 1], myArray.at(-1));

console.log('B737'['B737'.length - 1]);
console.log('B737'.at(-1));

movements.forEach(function (movement, index, entireArr) {
  if (movement > 0) {
    console.log(`Movement ${index}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index}: You withdrew ${Math.abs(movement)}`);
    console.log(`ENtire array is `, entireArr);
  }
});

currencies.forEach(function (value, key, entireMap) {
  console.log(`Show me the money ${value}${key}`);
  console.log(entireMap);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, mySet) {
  console.log(`${key}: ${value} at ${mySet.has(key)}`);
});

///////////////////////////////////////
// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored
the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an
adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the
following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a
shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to
mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years
old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
function checkDogs(dogsJulia, dogsKate) {
  const realDogsJulia = dogsJulia.slice(1, -2);
  const realDogs = realDogsJulia.concat(dogsKate);

  realDogs.forEach(function (dog, index) {
    if (dog >= 3) {
      console.log(
        `Dog number ${index + 1} is an adult, and is ${dog} years old`,
      );
    } else {
      console.log(`Dog number ${index + 1} is still a puppy 🐶`);
    }
  });
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

const movementInUSD = movements.map(mov => {
  return mov * 1.1;
});
console.log(movementInUSD);

const emptyArray = [];
movements.forEach(function (mov) {
  return emptyArray.push(mov * 1.1);
});
console.log(movements);
console.log(emptyArray);

const username = 'Steven Thomas Williams'
  .toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('');
console.log(username);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

console.log(accounts);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

console.log('reduce');
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log('loop starts');
  console.log(acc);
  console.log(cur);
  console.log(i);
  console.log(arr);
  console.log('loop ends');
  return acc + cur;
}, 0);
console.log(balance);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// calcDisplayBalance(account1.movements);
const max = movements.reduce(function (accumulator, element) {
  return accumulator > element ? accumulator : element;
}, movements[0]);
console.log(`reduce max ${max}`);

///////////////////////////////////////
// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (dogAges) {
  const humanAges = dogAges.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4,
  );
  const excludedAges = humanAges.filter(age => age >= 18);
  return excludedAges.reduce(
    (accumulator, current, index, array) =>
      accumulator + current / array.length,
    0,
  );
};

///////////////////////////////////////
// Coding Challenge #3

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAgeChain = dogAges =>
  dogAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce(
      (accumulator, current, index, array) =>
        accumulator + current / array.length,
      0,
    );

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
console.log(calcAverageHumanAgeChain([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeChain([16, 6, 10, 5, 6, 1, 4]));

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(movement => movement > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outcomes = acc.movements
    .filter(movement => movement < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${-outcomes}€`;
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );
  // console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );
    console.log(index);
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

console.log(movements);

console.log(movements.includes(-130));

console.log(movements.some(movement => movement > 0));

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(account4.movements.every(deposit));

console.log([[[1, 2], 3], [4, [5, 6]], 7, 8].flat(2));

console.log(
  accounts
    .map(account => account.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0),
);

console.log(
  accounts
    .flatMap(account => account.movements)
    .reduce((acc, mov) => acc + mov, 0),
);

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

console.log([200, 450, -400, 3000, -650, -130, 70, 1300].sort((a, b) => a - b));

console.log(
  [200, 450, -400, 3000, -650, -130, 70, 1300].sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
  }),
);

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  sorted = !sorted;

  displayMovements(currentAccount.movements, sorted);
});

console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(7).fill(1));
console.log(new Array(7).fill(1, 3));

const arr1 = [1, 2, 3, 4, 5, 6, 7];
arr1.fill(1);
console.log(arr1);

console.log(Array.from({ length: 7 }, (current, index) => index + 1));

labelBalance.addEventListener('click', e => {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')),
  );

  console.log(movementUI);
  console.log(document.querySelectorAll('.movements__value'));
});

let aa = 10;
console.log(aa++);
console.log(++aa);

///////////////////////////////////////
// Coding Challenge #5

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(
  dog => (dog.recommendedFoodPortion = Math.trunc(dog.weight ** 0.75 * 28)),
);

const sarahDogs = dogs.filter(dog => dog.owners.includes('Sarah'));

console.log(sarahDogs);

sarahDogs.forEach(currentDog => {
  if (currentDog.curFood > 1.1 * currentDog.recommendedFoodPortion) {
    console.log('eating too much');
  } else if (currentDog.curFood < 0.9 * currentDog.recommendedFoodPortion) {
    console.log('eating too little');
  }
});

const ownersEatTooMuch = dogs
  .filter(
    currentDog => currentDog.curFood > 1.1 * currentDog.recommendedFoodPortion,
  )
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch.join(' and ') + "'s dogs eat too much!");

const ownersEatTooLittle = dogs
  .filter(
    currentDog => currentDog.curFood < 0.9 * currentDog.recommendedFoodPortion,
  )
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);
console.log(ownersEatTooLittle.join(' and ') + "'s dogs eat too little!");

console.log(dogs.some(dog => dog.curFood === dog.recommendedFoodPortion));
console.log(
  dogs.some(
    dog =>
      dog.curFood < dog.recommendedFoodPortion * 1.1 &&
      dog.curFood > dog.recommendedFoodPortion * 0.9,
  ),
);

console.log(
  dogs.filter(
    dog =>
      dog.curFood < dog.recommendedFoodPortion * 1.1 &&
      dog.curFood > dog.recommendedFoodPortion * 0.9,
  ),
);

console.log(
  dogs
    .slice()
    .sort((a, b) => a.recommendedFoodPortion - b.recommendedFoodPortion),
);

// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
// 9. Group the dogs by the number of owners they have
const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
  if (dog.curFood > 1.1 * dog.recommendedFoodPortion) {
    return 'too-much';
  } else if (dog.curFood < 0.9 * dog.recommendedFoodPortion) {
    return 'too-little';
  } else {
    return 'exact';
  }
});

console.log(dogsGroupedByPortion);

const dogsGroupedByOwners = Object.groupBy(
  dogs,
  dog => `${dog.owners.length}-owners`,
);
console.log(dogsGroupedByOwners);

/////////////////////////////////////////////////////
// The New findLast and findLastIndex Methods
console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

// 'Your latest large movement was X movements ago'
const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000,
);
console.log(latestLargeMovementIndex);
console.log(
  `Your latest large movement was ${
    movements.length - latestLargeMovementIndex
  } movements ago`,
);

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a
technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds
like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console
whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with
the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

const breedName = breeds.find(
  breed =>
    breed.activities.includes('fetch') && breed.activities.includes('running'),
).breed;
console.log(breedName);

const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

const swimmingSet = breeds
  .filter(breed => breed.activities.includes('swimming'))
  .reduce(function (accumulator, breed) {
    // console.log('set ', ...breed.activities);
    // console.log(accumulator);
    breed.activities.forEach(activity => {
      accumulator.add(activity);
    });
    return accumulator;
  }, new Set());
swimmingSet.delete('swimming');
const swimmingAdjacent = [...swimmingSet];
console.log(swimmingAdjacent);

console.log(breeds.every(breed => breed.averageWeight >= 10));
console.log(breeds.some(breed => breed.activities.length >= 3));

const bonus = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .reduce((accumulator, breed) => {
    if (!accumulator) {
      return breed.averageWeight;
    }
    if (accumulator < breed.averageWeight) {
      return breed.averageWeight;
    } else {
      return accumulator;
    }
  }, undefined);
console.log(bonus);

const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals',
);
console.log(groupedMovements);

const groupedByActiveity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) {
    return 'very active';
  }
  if (movementCount >= 3) {
    return 'active';
  }
  if (movementCount >= 1) {
    return 'moderate';
  }
  return 'inactive';
});
console.log(groupedByActiveity);

const groupedAccounts = Object.groupBy(accounts, account => {
  return account.type;
});
console.log(groupedAccounts);

console.log(movements);
const reversedMov = movements.toReversed();
console.log(reversedMov);
console.log(movements);

const newMovements = movements.with(1, 2000);
console.log(movements);
console.log(newMovements);
