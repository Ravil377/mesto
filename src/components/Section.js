export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderer(items, userId) {
        items.forEach((item) => this.addItem(this._renderer(item, userId)));
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
