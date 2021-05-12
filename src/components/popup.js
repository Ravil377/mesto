export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._popupButtonClose = this._popupSelector.querySelector(".popup__button-close");
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
    }

    _handleEscClose(e) {
        if (e.code === "Escape") {
            document.removeEventListener("keydown", this._handleEscClose);
            this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target === this._popupSelector) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupButtonClose.addEventListener("click", this.close.bind(this));
        this._popupSelector.addEventListener("click", this._handleOverlayClose.bind(this));
    }
}
