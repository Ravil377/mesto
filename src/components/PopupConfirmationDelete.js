import { Popup } from "./Popup.js";

export class PopupConfirmationDelete extends Popup {
    constructor(popupSelector, popupButton, confirmSubmit) {
        super(popupSelector);
        this._confirmSubmit = confirmSubmit;
        this._confirmButton = this._popup.querySelector(popupButton);
        this._id = '';
        this._handleCardDelete = '';
    }
    open(id, handleCardDelete) {
        super.open();
        this._id = id;
        this._handleCardDelete = handleCardDelete;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener("click", () => {
            this._confirmSubmit(this._id, this._handleCardDelete);
            this.close();
        });
    }
}