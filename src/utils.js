import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_TIME = 'DD/MM/YY HH:mm';

function humanizeBigDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeStartTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function humanizeStartDataTime(date) {
  return date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (a = 0,b = 1)=>{
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export {getRandomArrayElement, humanizeBigDate, getRandomInteger, humanizeStartTime, humanizeStartDataTime};
