import { getRandomInteger } from '../utils.js';

const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Smoke in the car',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Choose music',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Upgrade class',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'choose a place',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Bus with toilet',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Nice driver',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'A cup of cofee',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Clean bed linen',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Single coupe',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Extra dinner',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Personal boat',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Dinner in the cabin',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Child seat',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Sports steering wheel',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Сhange the car',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Improve class',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Window seat',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Beautiful flight attendant',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Roof pass',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Swim in fontain',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Drink beer',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Climb the roof',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Bar tour',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Walk around',
        price: getRandomInteger(10, 800)
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Order fried nails',
        price: getRandomInteger(10, 800)
      },
      {
        id: 2,
        title: 'Extra bread',
        price: getRandomInteger(10, 800)
      },
      {
        id: 3,
        title: 'Drink all',
        price: getRandomInteger(10, 800)
      }
    ]
  },
];

export { offersByType };
