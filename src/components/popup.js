export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupButtonClose = this._popup.querySelector(".popup__button-close");
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._popup.classList.remove("popup_opened");
    }

    _handleEscClose(e) {
        if (e.code === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target === this._popup) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupButtonClose.addEventListener("click", this.close.bind(this));
        this._popup.addEventListener("click", this._handleOverlayClose.bind(this));
    }
}
