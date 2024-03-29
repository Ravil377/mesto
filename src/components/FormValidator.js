export class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }

    enableValidation() {
        this._disableSubmitButton();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListener(this._form);
    }

    _setEventListener() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        this._form.addEventListener("reset", () => {
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            });
        this._disableSubmitButton();
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        this._disableSubmitButton();

        if (this._hasInvalidInput(this._inputList)) {
            this._disableSubmitButton();
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    _disableSubmitButton() {
        this._buttonElement.setAttribute("disabled", true);
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    }
}
