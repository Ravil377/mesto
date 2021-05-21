import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector(".form");
        this._inputList = this._form.querySelectorAll(".popup__input");
        this._buttonSubmit = this._popup.querySelector(".popup__container-submit-button");
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        setTimeout(() => {
            this._form.reset();
            this._buttonSubmit.textContent = "Сохранить";
        }, 400); // очистка формы с задержкой, из-за анимации
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", () => {
            this._formSubmit(this._getInputValues());
            this._buttonSubmit.textContent = "Сохранение...";
        });
    }
}
