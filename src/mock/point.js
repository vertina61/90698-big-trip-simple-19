import { getRandomArrayElement, getRandomInteger } from '../utils.js';
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
      destination: getRandomInteger(1, 11),
      id: getRandomInteger(0, 11),
      offers: offersByType.find((elem) => elem.type === randType).offers,
      type: randType
    });
  }
  return array;
};

const points = generatePoint(10);

const getRandomPoint = () => getRandomArrayElement(points);
export { getRandomPoint };
