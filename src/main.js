import NewPointButtonView from './view/new-point-button-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { render } from './framework/render.js';
import PointsApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic gB5haM57wcl56za2j';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const sitePageElement = document.querySelector('.page-body');
const siteHeaderElement = document.querySelector('.trip-main');
const siteBoardContainerElement = sitePageElement.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const listPresenter = new ListPresenter({boardContainer: siteBoardContainerElement, pointsModel, filterModel, onNewEventDestroy: handleNewEventFormClose});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  pointsModel
});

const newEventButtonComponent = new NewPointButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  listPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, siteHeaderElement);

filterPresenter.init();
listPresenter.init();
pointsModel.init();


