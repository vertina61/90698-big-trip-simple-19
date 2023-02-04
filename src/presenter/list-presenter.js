import BoardView from '../view/board-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import { SortType } from '../const.js';
import { sortPointPriceDown, sortPointDateDown } from '../utils/point.js';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new ListView();

  #sortComponent = null;
  #noPointComponent = new ListEmptyView();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    if (this.#currentSortType === SortType.PRICE) {
      return [...this.#pointsModel.points].sort(sortPointPriceDown);
    }

    return this.#pointsModel.points.sort(sortPointDateDown);
  }

  init() {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #handlePointChange = (updatedPoint) => {
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };


  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
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

  #clearBoard() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderBoard() {
    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSort(SortType.DAY);
      render(this.#pointListComponent, this.#boardContainer);
      points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }
}
