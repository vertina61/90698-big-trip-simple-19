import AbstractView from '../framework/view/abstract-view.js';
import { humanizeBigDate, humanizeStartTime } from '../utils/point.js';
import { destinations } from '../mock/destination.js';

function createPointTemplate(point) {
  const {dateFrom, type, basePrice, dateTo} = point;
  const pointDestination = destinations.find((item) => point.destination === item.id);
  const checkedOffers = point.offers.map((element) => element.id);

  const offersTemplate = () => {
    if (!checkedOffers.length) {
      return `<li class="event__offer">
    <span class="event__offer-title">No additional offers</span>
    </li>`;
    } else {
      const template = point.offers.map((offer) => `
      <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');

      return template;
    }
  };

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${humanizeBigDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${pointDestination.name}</h3>
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
    <ul class="event__selected-offers">
    ${offersTemplate()}
    </ul>
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
