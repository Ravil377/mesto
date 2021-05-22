export class Card {
    static selectors = {
        text: ".element__title",
        removeButton: ".element__delete-button",
        likeButton: ".element__like-button",
        likeButtonActive: "element__like-button_active",
        imageButton: ".element__image",
        card: ".element",
        popup: ".popup_gallery",
        likeCount: ".element__like-count",
    };

    constructor(data, userId, cardSelector, handleCardClick, handleCardDelete, handleLikeCount) {
        this._name = data.name;
        this._alt = data.name;
        this._link = data.link;
        this._userId = data.owner._id; // id создателя карточки
        this._id = data._id; // id карточки
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLikeCount = handleLikeCount;
        this._element = this._getTemplate(this._cardSelector);
        this._removeButton = this._element.querySelector(Card.selectors.removeButton);
        this._likeButton = this._element.querySelector(Card.selectors.likeButton);
        this._imageButton = this._element.querySelector(Card.selectors.imageButton);
        this._cardText = this._element.querySelector(Card.selectors.text);
        this._likeCount = this._element.querySelector(Card.selectors.likeCount);
        this._user = userId; // id пользователь
    }

    _handleLikeClick() {
        return this._likeButton.classList.contains(Card.selectors.likeButtonActive);
    }

    addAndRemoveLike(count) {
        this._likeButton.classList.toggle(Card.selectors.likeButtonActive);
        this._likeCount.textContent = count;
    }

    _setEventListeners() {
        if (this._userId === this._user) {
            this._removeButton.addEventListener("click", () => {
                this._handleCardDelete(this._id, this._removeButton.closest(Card.selectors.card));
            });
        }
        this._likeButton.addEventListener("click", () => {
            const isTrue = this._handleLikeClick(this);
            this._handleLikeCount(isTrue, this._id);
        });
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
        this._likeCount.textContent = this._likes.length;
        this._likes.forEach((item) => {
            if (item._id === this._user) {
                this._likeButton.classList.add(Card.selectors.likeButtonActive);
            }
        });
        if (this._userId != this._user) {
            this._removeButton.remove();
        }
        this._setEventListeners();
        return this._element;
    }
}
