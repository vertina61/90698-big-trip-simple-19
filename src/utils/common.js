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

export {getCities, findDestination, findCheckedOffers};
