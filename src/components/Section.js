export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderer() {
        this._renderedItems.forEach((item) => {
            this.addItem(this._renderer(item));
        });
    }

    addItem(element) {
        this._container.append(element);
    }
}
