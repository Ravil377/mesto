import { initialCards } from "./initial-cards.js";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

//      Данные в профиле
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title-text");
const profileSubtitle = profileInfo.querySelector(".profile__subtitle");

//      Popup профиля
const popupContainerEditProfile = document.querySelector(".popup_edit-profile");
const profileEdit = popupContainerEditProfile.querySelector(".edit-profile");
const popupInputTypeName = popupContainerEditProfile.querySelector(".popup__input_type_name");
const popupInputTypeInfo = popupContainerEditProfile.querySelector(".popup__input_type_info");

//      Попап добавления карточки
const popupContainerAddCard = document.querySelector(".popup_add-card");
const cardAdd = popupContainerAddCard.querySelector(".add-card");
const popupInputNameCard = popupContainerAddCard.querySelector(".popup__input_name_card");
const popupInputFotoCard = popupContainerAddCard.querySelector(".popup__input_foto_card");

//      Контейнер popup
const popups = document.querySelectorAll(".popup");

//      Кнопка редактирования профиля
const popupButtonOpen = document.querySelector(".profile__edit-button");

//      Кнопка добавления карточки
const popupButtonAdd = document.querySelector(".profile__add-button");
const popupButtonAddCard = document.querySelector(".popup__container-submit-button_add-button");

//      Кнопка закрытия попапа
const popupCloseButtons = document.querySelectorAll(".popup__button-close");

//      Контейнер карточек
const elements = document.querySelector(".elements");

//      Popup открытой карточки
const popupGallery = document.querySelector(".popup_gallery");
const fullImage = document.querySelector(".full-image__image");
const fullImageCaption = document.querySelector(".full-image__caption");

const forms = document.querySelectorAll(".form");

//      Добавляем карточку
function addCard() {
    elements.prepend(
        appendCard({
            name: popupInputNameCard.value,
            link: popupInputFotoCard.value,
        })
    );
    closePopup(popupContainerAddCard);
}

function appendCard(data) {
    const card = new Card(data, ".element-template");
    const cardElement = card.generateCard();
    return cardElement;
}

/*      Первоначальная загрузка карточек        */
function loadCards(container, data) {
    data.forEach((item) => {
        container.append(appendCard(item));
    });
}

function openProfilePopup() {
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeInfo.value = profileSubtitle.textContent;
    openPopup(popupContainerEditProfile);
}

function openAddCardPopup() {
    cardAdd.reset();
    popupButtonAddCard.setAttribute("disabled", true);
    popupButtonAddCard.classList.add("popup__container-submit-button_inactive");
    openPopup(popupContainerAddCard);
}

export function openImagePopup(link, name) {
    fullImage.src = link;
    fullImage.alt = name;
    fullImageCaption.textContent = name;
    openPopup(popupGallery);
}

/*      Закрытие попапа при нажатии на Esc        */
function closePopupEsc(e) {
    if (e.code === "Escape") {
        const popupOpen = document.querySelector(".popup_opened");
        closePopup(popupOpen);
    }
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
    document.removeEventListener("keydown", closePopupEsc);
    popup.classList.remove("popup_opened");
}

//      Данные с попапа редактирования профиля переносятся в основной профиль   */
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputTypeName.value;
    profileSubtitle.textContent = popupInputTypeInfo.value;
    closePopup(popupContainerEditProfile);
}

forms.forEach((form) => {
    const formValidation = new FormValidator(form);
    const formEditValidation = formValidation.enableValidation();
});

//  Закрытие попапа по нажатию на оверлей
popups.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (e.target === item) closePopup(item.closest(".popup"));
    });
});

popupCloseButtons.forEach((item) => {
    item.addEventListener("click", () => closePopup(item.closest(".popup"))); //  Закрытие попапа по крестику
});

cardAdd.addEventListener("submit", addCard); //  Сохранение карточки
popupButtonAdd.addEventListener("click", openAddCardPopup); //  Открытие попапа добавления карточки
popupButtonOpen.addEventListener("click", openProfilePopup); //  Открытие попапа изменения профиля
profileEdit.addEventListener("submit", handleProfileFormSubmit); //   Сохранение данных в профиль

loadCards(elements, initialCards);
