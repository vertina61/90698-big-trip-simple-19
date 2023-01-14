import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import {render} from './render.js';
import PointsModel from './model/points-model.js';

const pointsModel = new PointsModel();

const sitePageElement = document.querySelector('.page-body');
const siteHeaderElement = document.querySelector('.trip-main');
const siteBoardContainerElement = sitePageElement.querySelector('.trip-events');
const listPresenter = new ListPresenter({boardContainer: siteBoardContainerElement, pointsModel});

render(new FilterView(), siteHeaderElement);
listPresenter.init();


