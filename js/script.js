//      Данные в профиле
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title-text");
const profileSubtitle = profileInfo.querySelector(".profile__subtitle");

//      Popup профиля
const popupContainerEditProfile = document.querySelector(".popup__container_edit-profile");
const profileEdit = popupContainerEditProfile.querySelector(".popup__edit-profile");
const popupInputTypeName = popupContainerEditProfile.querySelector(".popup__input_type_name");
const popupInputTypeInfo = popupContainerEditProfile.querySelector(".popup__input_type_info");

//      Попап добавления карточки
const popupContainerAddCard = document.querySelector(".popup__container_add-card");
const popupAddCard = popupContainerAddCard.querySelector(".popup__add-card");
const popupInputNameCard = popupContainerAddCard.querySelector(".popup__input_name_card");
const popupInputFotoCard = popupContainerAddCard.querySelector(".popup__input_foto_card");

//      Контейнер popup
const popup = document.querySelectorAll(".popup");

//      Шаблон
const galleryTemplate = document.querySelector(".element-template");

//      Кнопка редактирования профиля
const popupButtonOpen = document.querySelector(".profile__edit-button");

//      Кнопка добавления карточки
const popupButtonAdd = document.querySelector(".profile__add-button");

//      Кнопка закрытия попапа
const popupButtonClose = document.querySelectorAll(".popup__button-close");

//      Контейнер карточек
const elements = document.querySelector(".elements");

//      Popup открытой карточки
const popupTypeGallery = document.querySelector(".popup_type_gallery");
const fullImage = document.querySelector(".full-image__image");
const fullImageCaption = document.querySelector(".full-image__caption");

function openPopup(popup) {
    let targetEl = popup.target;
    if (targetEl.id === "edit") {
        popupInputTypeName.value = profileTitle.textContent;
        popupInputTypeInfo.value = profileSubtitle.textContent;
        popupContainerEditProfile.classList.add("popup_opened");
    } else if (targetEl.id === "addButton") {
        popupContainerAddCard.classList.add("popup_opened");
        popupInputFotoCard.value = "";
        popupInputNameCard.value = "";
    } else if (targetEl.id === "image") {
        popupTypeGallery.classList.add("popup_opened");
        fullImage.src = targetEl.src;
        fullImage.alt = targetEl.alt;
        fullImageCaption.textContent = targetEl.alt;
    }
}

function closePopup() {
    popup.forEach((item) => {
        item.classList.remove("popup_opened");
    });
}

/*      Первоначальная загрузка карточек        */
function loadCards() {
    const cardsElements = initialCards.map(getCard);
    elements.append(...cardsElements);
}

/*      Работа с шаблоном карточки        */
function getCard(card) {
    let galleryElement = galleryTemplate.content.cloneNode(true);
    let galleryEl = galleryElement.querySelector(".element__image");
    let galleryElTitle = galleryElement.querySelector(".element__title");
    galleryEl.src = card.link;
    galleryEl.alt = card.name;
    galleryElTitle.textContent = card.name;

    const removeButton = galleryElement.querySelector(".element__delete-button");
    removeButton.addEventListener("click", cardRemove);

    const likeButton = galleryElement.querySelector(".element__like-button");
    likeButton.addEventListener("click", cardLike);

    galleryEl.addEventListener("click", openPopup);

    return galleryElement;
}

//      Добавляем карточку
function cardAppend(evt) {
    evt.preventDefault();
    card[0].name = popupInputNameCard.value;
    card[0].link = popupInputFotoCard.value;
    elements.prepend(...card.map(getCard));
    closePopup();
}

//      Удаляем карточку
function cardRemove(evt) {
    const targetEl = evt.target;
    const targetItem = targetEl.closest(".element");
    targetItem.remove();
}

//      Ставим-убираем класс element__like-button_active с кнопки like
function cardLike(evt) {
    const targetEl = evt.target;
    targetEl.classList.toggle("element__like-button_active");
}

//      Данные с попапа редактирования профиля переносятся в основной профиль   */
function profileSave(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputTypeName.value;
    profileSubtitle.textContent = popupInputTypeInfo.value;
    closePopup();
}

//      Вызов функции первоначальной загрузки карточек
loadCards();

popupAddCard.addEventListener("submit", cardAppend); //  Сохранение карточки
popupButtonAdd.addEventListener("click", openPopup);  //  Открытие попапа добавления карточки
popupButtonOpen.addEventListener("click", openPopup); //  Открытие попапа изменения профиля
profileEdit.addEventListener("submit", profileSave); //   Сохранение данных в профиль

popupButtonClose.forEach((item) => {
    item.addEventListener("click", closePopup); //  Закрытие попапа
});
