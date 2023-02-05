import BoardView from '../view/board-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPointPriceDown, sortPointDateDown } from '../utils/point.js';
import { filter } from '../utils/filter.js';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new ListView();

  #sortComponent = null;
  #noPointComponent = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({boardContainer, pointsModel, filterModel, onNewEventDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#boardComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    if (this.#currentSortType === SortType.PRICE) {
      return filteredPoints.sort(sortPointPriceDown);
    }

    return filteredPoints.sort(sortPointDateDown);
  }

  init() {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:

        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };


  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#noPointComponent = new ListEmptyView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange});
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSort(this.#currentSortType);
      render(this.#pointListComponent, this.#boardContainer);
      points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }
}
