export class FormValidator {
    static selectors = {
        popupInput: ".popup__input",
        submitButton: ".popup__container-submit-button",
    };

    constructor(form) {
        this._form = form;
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListener(this._form);
    }

    _setEventListener() {
        const inputList = Array.from(this._form.querySelectorAll(FormValidator.selectors.popupInput));
        const buttonElement = this._form.querySelector(FormValidator.selectors.submitButton);
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
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add("popup__input_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("popup__input-error_active");
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove("popup__input_type_error");
        errorElement.classList.remove("popup__input-error_active");
        errorElement.textContent = "";
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        this._disableSubmitButton(buttonElement);

        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute("disabled", true);
            buttonElement.classList.add("popup__container-submit-button_inactive");
        } else {
            buttonElement.removeAttribute("disabled");
            buttonElement.classList.remove("popup__container-submit-button_inactive");
        }
    }

    _disableSubmitButton(buttonElement) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add("popup__container-submit-button_inactive");
    }
}
