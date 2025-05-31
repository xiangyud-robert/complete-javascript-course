'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
        <article class='country ${className}'>
          <img class='country__img' src='${data.flag}' />
          <div class='country__data'>${data.name}
            <h3 class='country__name'></h3>
            <h4 class='country__region'>${data.region}</h4>
            <p class='country__row'><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)}</p>
            <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
            <p class='country__row'><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  const endpoint = `https://restcountries.com/v2/name/${country}`;

  request.open('GET', endpoint);
  const data = request.send();
  console.log(data);

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(request.responseText);
    console.log(data);

    renderCountry(data);
  });
};

const getCountryAndNeighborhood = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  const endpoint = `https://restcountries.com/v2/name/${country}`;
  request.open('GET', endpoint);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(request.responseText);
    console.log(data);

    renderCountry(data);

    // Get neighbor country 2
    const [neighborCode] = data.borders;

    if (!neighborCode) {
      return;
    }

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    const endpoint = `https://restcountries.com/v2/alpha/${neighborCode}`;
    request2.open('GET', endpoint);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(request2.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighborhood('portugal');
// getCountryAndNeighborhood('usa');
// getCountryAndNeighborhood('germany');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(function (response) {
    console.log(response);
    if (!response.ok) {
      throw new Error(`${errorMsg} with status ${response.status}`);
    }
    return response.json();
  });
};

const getCountryDataPromise = function (country) {
  // country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw new Error(
          `Could not find ${country} with status ${response.status}`,
        );
      }
      return response.json();
    })
    .then(function (data) {
      renderCountry(data[0]);
      const neighborCode = data[0].borders?.[0];

      if (!neighborCode) {
        return;
      }

      // country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighborCode}`, {});
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountry(data, 'neighbour');
    })
    .catch(function (error) {
      console.log(`${error} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${error.message}. Try again!`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};

const getCountryDataPromiseGetJSON = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(function (data) {
      renderCountry(data[0]);
      const neighborCode = data[0].borders?.[0];
      console.log(neighborCode);

      if (!neighborCode) {
        throw new Error('No neighbor found!');
      }

      // country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighborCode}`,
        'Country not found',
      );
    })
    .then(function (data) {
      renderCountry(data, 'neighbour');
    })
    .catch(function (error) {
      console.log(`${error} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${error.message}. Try again!`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function (event) {
  getCountryDataPromise('portugal');
});

// getCountryDataPromiseGetJSON('germany1');
// getCountryDataPromise('china');
// getCountryDataPromiseGetJSON('australia');
///////////////////////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that,
 you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS
 coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful
location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API
and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the
provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403.
This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to
reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API
result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no
need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
const whereAmI = function (lat, lng) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  fetch(url)
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw new Error(`ERROR on HTTP response code ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (!data) {
        throw new Error('data was not found');
      }
      if (!data.city) {
        throw new Error('City was not found');
      }
      if (!data.countryName) {
        throw new Error('CountryName was not found');
      }
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`ERROR on HTTP response code ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      renderCountry(data);
    })
    .catch(function (error) {
      console.error(` Error: ${error.message}`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

console.log('Test start');
setTimeout(function () {
  console.log('0 sec timer');
}, 0);

Promise.resolve('Resolve promise 1').then(function (res) {
  console.log(res);
});

Promise.resolve('Resolve promise 2').then(function (res) {
  // for (let i = 0; i < 1e9; i++) {}
  console.log(res);
});

console.log('Test end');

const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() < 0.5) {
    reject('You lost your money');
  } else {
    resolve('You WIN');
  }
});

lotteryPromise
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });

const lotteryPromiseAsync = new Promise(function (resolve, reject) {
  console.log('Lottery draw us happening');
  setTimeout(function () {
    if (Math.random() < 0.5) {
      reject(new Error('You lost your money'));
    } else {
      resolve('You WIN');
    }
  }, 1000);
});

lotteryPromiseAsync
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });

const wait = function (milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
};

// wait(1000)
//   .then(function () {
//     console.log('I waited 1000 milliseconds!');
//     return wait(2000);
//   })
//   .then(function () {
//     console.log('I waited 2000 milliseconds!');
//   });
//
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
//
// wait(1000)
//   .then(function () {
//     console.log('1 second passed from wait()');
//     return wait(1000);
//   })
//   .then(function () {
//     console.log('2 second passed from wait()');
//     return wait(1000);
//   })
//   .then(function () {
//     console.log('3 second passed from wait()');
//     return wait(1000);
//   })
//   .then(function () {
//     console.log('4 second passed from wait()');
//     return wait(1000);
//   });

Promise.resolve('Resolve promise 1').then(function (response) {
  console.log(response); // response here is 'Resolve promise 1'
});

Promise.reject('Reject promise 2').catch(function (error) {
  console.error(error); // error here is 'Reject promise 2'
});

const getPositionBeforeSimplifying = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        resolve(position);
      },
      function (error) {
        reject(error);
      },
    );
  });
};

// getPositionBeforeSimplifying()
//   .then(function (position) {
//     console.log(position);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition()
//   .then(function (position) {
//     console.log(position);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

const whereAmIAdvanced = function () {
  getPosition()
    .then(function (position) {
      console.log('whereAMI');
      console.log(position.coords);
      const { latitude: lat, longitude: lng } = position.coords;
      // const lat = position.coords.latitude;
      // const lng = position.coords.longitude;
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
      return fetch(url);
    })
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw new Error(`ERROR on HTTP response code ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (!data) {
        throw new Error('data was not found');
      }
      if (!data.city) {
        throw new Error('City was not found');
      }
      if (!data.countryName) {
        throw new Error('CountryName was not found');
      }
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`ERROR on HTTP response code ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      renderCountry(data);
    })
    .catch(function (error) {
      console.error(` Error: ${error.message}`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};

// whereAmIAdvanced();

///////////////////////////////////////
// Coding Challenge #2

/*
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on
your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a
new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is
done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should
be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use
the image element returned by the createImage promise to hide the current image. You will need a global variable for
that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to
'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
const imagePath1 = 'img/img-1.jpg';
const imagePath2 = 'img/img-2.jpg';
const imagePath3 = 'img/img-3.jpg';

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imgContainer.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(new Error('Image could not be found'));
    });
  });
};

let currentImage;

// createImage(imagePath1)
//   .then(function (image) {
//     console.log('Image 1 loaded');
//     currentImage = image;
//     return wait(2000);
//   })
//   .then(function () {
//     currentImage.style.display = 'none';
//     return createImage(imagePath2);
//   })
//   .then(function (image) {
//     console.log('Image 2 loaded');
//     currentImage = image;
//     return wait(2000);
//   })
//   .then(function () {
//     currentImage.style.display = 'none';
//     return createImage(imagePath3);
//   })
//   .then(function (image) {
//     console.log('Image 3 loaded');
//     currentImage = image;
//     return wait(2000);
//   })
//   .then(function () {
//     currentImage.style.display = 'none';
//   })
//   .catch(function (error) {
//     alert(error.message);
//   });

const whereAmIAsync = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
    const responseGeo = await fetch(url);
    if (!responseGeo.ok) {
      throw new Error('Problem getting geolocation');
    }
    const geoData = await responseGeo.json();

    const response = await fetch(
      `https://restcountries.com/v2/alpha/${geoData.countryCode}`,
    );
    if (!response.ok) {
      throw new Error('Problem getting country');
    }
    const data = await response.json();
    renderCountry(data);
    countriesContainer.style.opacity = 1;

    return `You are in ${geoData.city}, ${geoData.countryName}`;
  } catch (error) {
    console.error(error);
    renderError(`${error.message}`);
    countriesContainer.style.opacity = 1;
  }
};

const whereAmIAsync2 = async function () {
  try {
    const response = await fetch(`https://restcountries.com/v2/alpha/CHN`);
    if (!response.ok) {
      throw new Error('Problem getting country');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

console.log('1: Will get location');
whereAmIAsync()
  .then(function (city) {
    console.log(`2: ${city}`);
  })
  .catch(function (error) {
    console.error(`2: ${error.message}`);
  })
  .finally(function () {
    console.log('3: Finished getting location');
  });

console.log('1: Will get location');
(async function () {
  try {
    const city = await whereAmIAsync();
    console.log(`2: ${city}`);
  } catch (error) {
    console.error(`2: ${error.message}`);
  } finally {
    console.log('3: Finished getting location');
  }
})();

const get3CountriesAll = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data);

    console.log(
      data.map(d => {
        return d[0].capital;
      }),
    );
  } catch (err) {
    console.error(err);
  }
};

const get3CountriesRace = async function (c1, c2, c3) {
  try {
    const data = await Promise.race([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data);

    console.log(data[0].capital);
  } catch (err) {
    console.error(err);
  }
};

get3CountriesAll('portugal', 'canada', 'tanzania');
get3CountriesRace('italy', 'egypt', 'mexico');

const timeout = function (seconds) {
  return new Promise((resolve, reject) =>
    setTimeout(function () {
      reject(new Error('Timeout, request took too long'));
    }, seconds * 1000),
  );
};

Promise.race([fetch(`https://restcountries.com/v2/alpha/CHN`), timeout(0.0001)])
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.error(error);
  });

Promise.all([
  Promise.resolve('all: first success'),
  Promise.resolve('all: second success'),
  Promise.reject('all: first error'),
  Promise.reject('all: second error'),
])
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.error(error);
  });

Promise.allSettled([
  Promise.resolve('allSettled: first success'),
  Promise.resolve('allSettled: second success'),
  Promise.reject('allSettled: first error'),
  Promise.reject('allSettled: second error'),
])
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.error(error);
  });

Promise.any([
  Promise.resolve('allSettled: first success'),
  Promise.resolve('allSettled: second success'),
  Promise.reject('allSettled: first error'),
  Promise.reject('allSettled: second error'),
])
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.error(error);
  });

///////////////////////////////////////
// Coding Challenge #2

/*
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on
your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a
new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is
done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should
be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use
the image element returned by the createImage promise to hide the current image. You will need a global variable for
that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to
'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

///////////////////////////////////////
// Coding Challenge #3

/*
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part
where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like
more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const loadNPause = async function () {
  try {
    let currentTempImage;

    currentTempImage = await createImage(imagePath1);
    console.log('Image 1 loaded');
    await wait(2000);

    currentTempImage.style.display = 'none';
    currentTempImage = await createImage(imagePath2);
    console.log('Image 2 loaded');
    await wait(2000);

    currentTempImage.style.display = 'none';
    currentTempImage = await createImage(imagePath3);
    console.log('Image 3 loaded');
    await wait(2000);

    currentTempImage.style.display = 'none';
  } catch (error) {
    alert(error.message);
  }
};

// (async function () {
//   await loadNPause();
// })();
// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async function (img) {
      return createImage(img);
    });
    console.log('imgs loaded');
    console.log(imgs);

    const imageHTMLArr = await Promise.all(imgs);
    console.log('imageHTMLArr');
    console.log(imageHTMLArr);

    imageHTMLArr.forEach(function (imageEl) {
      imageEl.classList.add('parallel');
    });
  } catch (error) {
    console.error(error);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
