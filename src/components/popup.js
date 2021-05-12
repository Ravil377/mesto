export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupButtonClose = this._popupSelector.querySelector(".popup__button-close");
    }
    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
    }

    _handleEscClose(e) {
        if (e.code === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target === this._popupSelector) {
            window.addEventListener("mouseup", (e) => {
                if (e.target === this._popupSelector) {
                    this.close();
                }
            });
        }
    }

    setEventListeners() {
        this._popupButtonClose.addEventListener("click", this.close.bind(this));
        this._popupSelector.addEventListener("click", this._handleOverlayClose.bind(this));
    }
}
