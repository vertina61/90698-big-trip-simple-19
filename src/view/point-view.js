import AbstractView from '../framework/view/abstract-view.js';
import { humanizeBigDate, humanizeStartTime } from '../utils/point.js';
import { destinations } from '../mock/destination.js';

const createOffersTemplate = (offers) => {
  if (offers !== null) {
    return (
      `<ul class="event__selected-offers">
      ${offers.map(({ title, price }) =>
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`).join('')}
      </ul>`);
  } else {
    return '<ul class="event__selected-offers"></ul>';
  }
};

function createPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, offers, type } = point;
  const offersTemplate = createOffersTemplate(offers);
  const pointDestination = destinations.find((item) => point.destination === item.id);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${humanizeBigDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${pointDestination ? pointDestination.name : ''}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${humanizeStartTime(dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${humanizeStartTime(dateTo)}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
        ${offersTemplate}
        <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class PointView extends AbstractView {
  #point = null;
  #handleEditClick = null;

  constructor({point, onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
