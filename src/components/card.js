export class Card {
    static selectors = {
        text: ".element__title",
        removeButton: ".element__delete-button",
        likeButton: ".element__like-button",
        likeButtonActive: "element__like-button_active",
        imageButton: ".element__image",
        card: ".element",
        popup: ".popup_gallery",
    };

    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._alt = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle(Card.selectors.likeButtonActive);
    }

    _handleDeleteClick(evt) {
        evt.target.closest(Card.selectors.card).remove();
    }

    _setEventListeners() {
        this._element.querySelector(Card.selectors.removeButton).addEventListener("click", this._handleDeleteClick);
        this._element.querySelector(Card.selectors.likeButton).addEventListener("click", this._handleLikeClick);
        this._element.querySelector(Card.selectors.imageButton).addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _getTemplate(where) {
        const galleryElement = document.querySelector(where).content.cloneNode(true);
        this._cardElement = galleryElement;
        return this._cardElement;
    }

    generateCard() {
        this._element = this._getTemplate(this._cardSelector);
        this._element.querySelector(Card.selectors.imageButton).alt = this._alt;
        this._element.querySelector(Card.selectors.imageButton).src = this._link;
        this._element.querySelector(Card.selectors.text).textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}
