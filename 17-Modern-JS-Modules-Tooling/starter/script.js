// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//
// console.log('Importing module');
// // console.log(shippingCost);
//
// addToCart('bread', 5);
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

import add, { cart } from './shoppingCart.js';
console.log(cart);
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart);

// const getLastPost = async function () {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   console.log(data);
//
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };
//
// const lastPost = getLastPost();
// console.log(lastPost);

// lastPost.then(data => {
//   console.log(data);
// });

// const lastPost2 = await getLastPost();
// console.log(lastPost2);

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(
      `${quantity} ${product} ordered from supplier (shipping cost is ${shippingCost})`,
    );
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 46);
console.log(ShoppingCart2.totalPrice);
console.log(ShoppingCart2.shippingCost);

import cloneDeep from 'lodash-es/cloneDeep';
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

console.log('Is it working???');

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable/array/find';

import 'regenerator-runtime/runtime';
