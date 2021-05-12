import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._popupSelector = popupSelector;
        this._form = this._popupSelector.querySelector(".form");
        this._inputList = this._form.querySelectorAll(".popup__input");
        this._buttonSubmit = this._popupSelector.querySelector(".popup__container-submit-button");
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        document.removeEventListener("keydown", super._handleEscClose.bind(this));
        this._popupSelector.classList.remove("popup_opened");
        setTimeout(() => this._form.reset(), 400); // очистка формы с задержкой, из-за анимации
    }

    setEventListeners() {
        this._popupButtonClose.addEventListener("click", this.close.bind(this));
        this._popupSelector.addEventListener("click", this._handleOverlayClose.bind(this));
        this._form.addEventListener("submit", () => {
            this._formSubmit(this._getInputValues());
            this.close();
        });
    }
}
