import BoardView from '../view/board-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointPriceDown, sortPointDateDown } from '../utils/point.js';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new ListView();
  #boardPoints = [];

  #sortComponent = null;
  #noPointComponent = new ListEmptyView();
  #pointPresenter = new Map();
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points].sort(sortPointDateDown);

    this.#sourcedBoardPoints = [...this.#pointsModel.points].sort(sortPointDateDown);

    this.#renderPointsList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    if (sortType === SortType.PRICE) {
      this.#boardPoints.sort(sortPointPriceDown);
    } else {
      this.#boardPoints = [...this.#sourcedBoardPoints];
    }
  }

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };


  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange});
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints(from, to) {
    this.#boardPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointsList() {
    render(this.#boardComponent, this.#boardContainer);
    if (!this.#boardPoints.length) {
      render(this.#boardComponent, this.#boardContainer);
      this.#renderNoPoints();
    }
    else {
      this.#renderSort(SortType.DAY);
      render(this.#pointListComponent, this.#boardContainer);

      //for (let i = 0; i < this.#boardPoints.length; i++) {
      // this.#renderPoint(this.#boardPoints[i]);
      //}
      this.#renderPoints();
    }
  }

}
