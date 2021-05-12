export class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListener(this._form);
    }

    _setEventListener() {
        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        this.disableSubmitButton(buttonElement);

        if (this._hasInvalidInput(inputList)) {
            this.disableSubmitButton(buttonElement);
        } else {
            buttonElement.removeAttribute("disabled");
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    disableSubmitButton(buttonElement) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add(this._settings.inactiveButtonClass);
    }
}
