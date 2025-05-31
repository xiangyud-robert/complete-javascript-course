'use strict';

const Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  console.log(this);
};

const jon = new Person('John', 'Smith');

console.log(jon);

console.log(jon instanceof Person);

Person.prototype.calcAge = function () {
  console.log('CalcAge');
};

jon.calcAge();
jon.__proto__.calcAge();
Person.prototype.calcAge();
console.log(jon.__proto__);
console.log(Person.prototype);
console.log(Person.prototype === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jon));
console.log(Person.prototype.isPrototypeOf(Person));
console.log(jon.isPrototypeOf(Person.prototype));

console.log(jon.hasOwnProperty('firstName'));
console.log(jon.hasOwnProperty('calcAge'));
console.log(jon.__proto__.hasOwnProperty('calcAge'));

console.log(jon.__proto__.constructor === Person);
console.log(Person.prototype.constructor === Person);

console.log(jon.__proto__);
console.log(jon.__proto__.__proto__);
console.log(jon.__proto__.__proto__.__proto__);

const arr = [3, 6, 6, 5, 6, 9, 9];
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

///////////////////////////////////////
// Coding Challenge #1

/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the
current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    this.calA = function () {
      console.log('CalcA inside constructor');
    };
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  static hey() {
    // this is the static function that is only accessible by PersonCl
    console.log('Hey there');
  }
}

PersonCl.prototype.accelerate = function () {
  console.log('Accelerate');
};

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();
jessica.calA();
jessica.accelerate();

const account = {
  movements: [200, 530, 120, 300],
  // latest: 300,
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 200;
console.log(account.latest);

// End

console.log(Person);
Person.prototype.hey = function () {
  console.log('Hey');
};

Person.hey2 = function () {
  console.log('Hey from Person');
};

jon.hey();
Person.hey2();

PersonCl.hey();

const PersonProto = {
  calcAgeObjectCreate() {
    console.log('CalcAgeObjectCreate');
  },
  init(firstName) {
    this.firstName = firstName;
  },
};

const steven = Object.create(PersonProto);
steven.firstName = 'Steven';
steven.calcAgeObjectCreate();

const sarah = Object.create(PersonProto);
sarah.init('sarah');
sarah.calcAgeObjectCreate();

///////////////////////////////////////
// Coding Challenge #1

/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the
current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

///////////////////////////////////////
// Coding Challenge #2

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

 */

class Cartoon {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }

  accerlerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(mov) {
    this.speed = mov * 1.6;
  }
}

const ford = new Cartoon('Ford', 120);
console.log(ford.speedUS);
ford.accerlerate();
ford.accerlerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);

const Student = function (firstName, lastName, course) {
  Person.call(this, firstName, lastName); // Use call() to override 'this'
  this.course = course;
};
console.log('check');
console.dir(Student.prototype.constructor);

Student.prototype = Object.create(Person.prototype);

console.log('check2');
console.dir(Student.prototype.constructor);

Student.prototype.constructor = Student;
console.log('check3');
console.dir(Student.prototype.constructor);
Student.prototype.introduce = function () {
  console.log(`${this.firstName} studies ${this.course}`);
};

const mike = new Student('Mike', 'Smith', 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike);
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.dir(Student.prototype.constructor);

/*
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a
make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to
'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%.
Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery'
(charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
console.log('one check ');
console.dir(EV.prototype.constructor);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}, with a charge of ${this.charge}%`,
  );
};

const tesla = new EV('Tesla', 120, 23);

tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.brake();
tesla.accelerate();
tesla.chargeBattery(29);
tesla.accelerate();
console.log('double check ');
console.dir(EV.prototype.constructor);

class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear); // Always needs to happen first to produce the 'this'
    this.course = course;
  }
  introduce = function () {
    console.log(`${this.firstName} studies ${this.course}`);
  };
  calcAge() {
    console.log('Override the calcAge() in PersonCl');
  }
}

const martha = new StudentCl('Martha', 2012, 'Math');
martha.calA();
martha.calcAge();
martha.introduce();
console.log(StudentCl.prototype);
console.dir(StudentCl.prototype.constructor);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, course) {
  PersonProto.init.call(this, firstName);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`${this.firstName} studies ${this.course}`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 'Engineering');
jay.introduce();
jay.calcAgeObjectCreate();

class Account {
  locale = navigator.language; // Public field
  #movements = [100, 200]; // Private field
  #pin; // Private field, value assigned in the constructor

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  // Public function
  deposit(val) {
    this.#movements.push(val);
  }

  // Public function
  withdraw(val) {
    this.deposit(-val);
  }

  // Private function
  #approveLoan(val) {
    return true;
  }
}

const account1 = new Account('Account', 'USD', '111');
// account1.#movements; // Error, not accessible
// account1.#approveLoan(123); // Error, not accessible

///////////////////////////////////////
// Coding Challenge #1

/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the
current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

///////////////////////////////////////
// Coding Challenge #2

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

 */

///////////////////////////////////////
// Coding Challenge #3

/*
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a
make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to
'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%.
Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery'
(charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

///////////////////////////////////////
// Coding Challenge #4

/*
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake'
method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accerlerate() {
    this.speed += 10;
    return this;
  }

  brake() {
    this.speed -= 5;
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(mov) {
    this.speed = mov * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 10;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed}, with a charge of ${this.#charge}%`,
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make} going at ${this.speed}, with a charge of ${this.#charge}%`,
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .chargeBattery(50)
  .brake();

console.log(rivian.speedUS);
