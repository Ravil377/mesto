export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

export const validation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__container-submit-button",
    inactiveButtonClass: "popup__container-submit-button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
};

//      Кнопка редактирования профиля
export const buttonProfilePopupOpen = document.querySelector(".profile__edit-button");

//      Кнопка добавления карточки
export const popupButtonAdd = document.querySelector(".profile__add-button");

//      Данные в профиле
const profileInfo = document.querySelector(".profile__info");
export const profileTitle = profileInfo.querySelector(".profile__title-text");
export const profileSubtitle = profileInfo.querySelector(".profile__subtitle");

//      Popup профиля
export const popupContainerEditProfile = document.querySelector(".popup_edit-profile");
export const popupInputTypeName = popupContainerEditProfile.querySelector(".popup__input_type_name");
export const popupInputTypeInfo = popupContainerEditProfile.querySelector(".popup__input_type_info");
export const profileEdit = popupContainerEditProfile.querySelector(".edit-profile");

//      Попап добавления карточки
export const popupContainerAddCard = document.querySelector(".popup_add-card");
export const cardAdd = popupContainerAddCard.querySelector(".add-card"); //форма добавления карточки


