function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (a = 0,b = 1)=>{
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getCities = (destinations) => {
  const cities = [];
  destinations.map((destination) => cities.push(destination.name));
  return cities;
};

const findCheckedOffers = (typeOfPoint, offersOfType, offersByType) => {
  const foundOffersType = offersByType.find((item) => item.type === typeOfPoint).offers;
  return foundOffersType.filter((offer) => offersOfType.includes(offer.id));
};

const findDestination = (id, destinations) => destinations.find((destination) => destination.id === id);

export {getRandomArrayElement, getRandomInteger, getCities, findDestination, findCheckedOffers};
