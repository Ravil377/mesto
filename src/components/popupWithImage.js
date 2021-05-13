import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullImage = this._popup.querySelector(".full-image__image");
        this._fullImageCaption = this._popup.querySelector(".full-image__caption");
    }

    open(name, link) {
        super.open();
        this._fullImage.src = link;
        this._fullImageCaption.alt = name;
        this._fullImageCaption.textContent = name;
    }
}