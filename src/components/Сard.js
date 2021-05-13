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
        this._element = this._getTemplate(this._cardSelector);
        this._removeButton = this._element.querySelector(Card.selectors.removeButton);
        this._likeButton = this._element.querySelector(Card.selectors.likeButton);
        this._imageButton = this._element.querySelector(Card.selectors.imageButton);
        this._cardText = this._element.querySelector(Card.selectors.text);
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle(Card.selectors.likeButtonActive);
    }

    _handleDeleteClick(evt) {
        evt.target.closest(Card.selectors.card).remove();
    }

    _setEventListeners() {
        this._removeButton.addEventListener("click", this._handleDeleteClick);
        this._likeButton.addEventListener("click", this._handleLikeClick);
        this._imageButton.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _getTemplate(where) {
        const galleryElement = document.querySelector(where).content.cloneNode(true);
        this._cardElement = galleryElement;
        return this._cardElement;
    }

    generateCard() {
        this._imageButton.alt = this._alt;
        this._imageButton.src = this._link;
        this._cardText.textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}