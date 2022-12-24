import BoardView from '../view/board-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  boardComponent = new BoardView();
  taskListComponent = new ListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.taskListComponent, this.boardComponent.getElement());
    render(new EditPointView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.taskListComponent.getElement());
    }
  }
}
