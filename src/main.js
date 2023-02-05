import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const sitePageElement = document.querySelector('.page-body');
//const siteHeaderElement = document.querySelector('.trip-main');
const siteBoardContainerElement = sitePageElement.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const listPresenter = new ListPresenter({boardContainer: siteBoardContainerElement, pointsModel, filterModel,});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  pointsModel
});


filterPresenter.init();
listPresenter.init();


