import BoardView from '../view/board-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #taskListComponent = new ListView();
  #boardPoints = [];

  #sortComponent = new SortView();
  #noPointComponent = new ListEmptyView();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderPointsList();
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(from, to) {
    this.#boardPoints
      .slice(from, to)
      .forEach((task) => this.#renderPoint(task));
  }

  #renderPointsList() {
    //render(this.#boardComponent, this.#boardContainer);
    if (!this.#boardPoints.length) {
      //render(this.#boardComponent, this.#boardContainer);
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();
      render(this.#taskListComponent, this.#boardContainer);

      //for (let i = 0; i < this.#boardPoints.length; i++) {
       // this.#renderPoint(this.#boardPoints[i]);
      //}
      this.#renderPoints();
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#taskListComponent.element});
    pointPresenter.init(point);
  }
}
