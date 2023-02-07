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

export {getRandomArrayElement, getRandomInteger, getCities};
