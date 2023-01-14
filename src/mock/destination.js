import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { DESCRIPTION, CITY_NAMES } from '../const.js';

const createDestinations = (count) => {
  const array = [];
  for (let index = 0; index < count; index++) {
    array.push({
      id: index + 1,
      description: getRandomArrayElement(DESCRIPTION),
      name: getRandomArrayElement(CITY_NAMES),
      pictures: [
        {
          src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 10)}`,
          description: getRandomArrayElement(DESCRIPTION),
        }
      ]
    });
  }
  return array;
};

export const destinations = createDestinations(5);
