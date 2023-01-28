import {nanoid} from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { TYPES } from '../const.js';
import { offersByType } from './offer.js';

const generatePoint = (count) => {
  const array = [];
  for (let index = 0; index < count; index++) {
    const randType = getRandomArrayElement(TYPES);
    array.push({
      basePrice: getRandomInteger(1000, 10000),
      dateFrom: '2019-05-10T22:55:56.845Z',
      dateTo: '2019-05-11T11:22:13.375Z',
      destination: getRandomInteger(1, 5),
      id: getRandomInteger(1, 5),
      offers: offersByType.find((elem) => elem.type === randType).offers,
      type: randType
    });
  }
  return array;
};

const points = generatePoint(10);

function getRandomPoint () {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points)
  };
}
export { getRandomPoint };
