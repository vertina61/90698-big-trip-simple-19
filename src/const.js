const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',];
const CITY_NAMES = ['Moscow', 'Nevada', 'Minvody', 'Arhiz', 'USA', 'Kazan','Orel', 'Voronezh', 'Dubai', 'Lych'];
const POINTS_AMOUNT = {
  MIN: 3,
  MAX: 6
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const filterTypes = [
  {
    name: FilterType.EVERYTHING
  },
  {
    name: FilterType.FUTURE
  }
];

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

export {CITY_NAMES, DESCRIPTION, TYPES, POINTS_AMOUNT, FilterType, SortType, UserAction, UpdateType, filterTypes, Keys};

