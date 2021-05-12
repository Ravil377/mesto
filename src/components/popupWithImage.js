import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullImage = this._popupSelector.querySelector(".full-image__image");
        this._fullImageCaption = this._popupSelector.querySelector(".full-image__caption");
    }

    open(name, link) {
        this._fullImage.src = link;
        this._fullImageCaption.alt = name;
        this._fullImageCaption.textContent = name;
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener("keydown", super.close.bind(this));
    }
}
