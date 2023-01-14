import {createElement} from '../render.js';
import { destinations } from '../mock/destination.js';
import { humanizeStartDataTime } from '../utils.js';

function createEventTypeItemEditTemplate(offers) {
  const elementEditTypes = offers.map((elements) => `
  <div class="event__type-item"> 
  <input id="event-type-${elements.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${elements.type}">
  <label class="event__type-label  event__type-label--${elements.type}" for="event-type-${elements.type}-1">${elements.type}</label>
</div>`).join('');
  return elementEditTypes;
}

const chooseDestination = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

function createSectionOffersEditTemplate(type, offers) {
  const elementEditOffers = offers.map((elements) => `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name=${elements.title} ${offers.includes(elements.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${elements.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${elements.price}</span>
      </label>
      </div>`).join('');

  return elementEditOffers;
}

function createEditPointTemplate(point) {
  const {offers, type, dateFrom, dateTo, basePrice} = point;
  const pointDestination = destinations.find((item) => point.destination === item.id);

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createEventTypeItemEditTemplate(offers)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value='${pointDestination.name}' list="destination-list-1">
      <datalist id="destination-list-1">
      ${chooseDestination}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeStartDataTime(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeStartDataTime(dateTo)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${createSectionOffersEditTemplate(type, offers)}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>
    </section>
  </section>
</form>`;
}

export default class EditPointView {
  #element = null;
  #point = null;

  constructor({point}) {
    this.#point = point;
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
