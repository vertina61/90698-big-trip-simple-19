import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { filters } from './const.js';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const sitePageElement = document.querySelector('.page-body');
//const siteHeaderElement = document.querySelector('.trip-main');
const siteBoardContainerElement = sitePageElement.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const listPresenter = new ListPresenter({boardContainer: siteBoardContainerElement, pointsModel});

render(new FilterView({
  filters,
  currentFilterType: filters[0].name,
  onFilterTypeChange: () => {}
}), filtersContainer);

listPresenter.init();


