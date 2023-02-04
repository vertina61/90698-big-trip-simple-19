import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/point.js';

const POINT_COUNT = 5;

export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }
}
