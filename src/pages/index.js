import {
    initialCards,
    validation,
    buttonProfilePopupOpen,
    popupButtonAdd,
    profileTitle,
    profileSubtitle,
    popupInputTypeName,
    popupInputTypeInfo,
    profileEdit,
    cardAdd,
} from "../utils/Constants.js";
import { createCard } from "../utils/Utils.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

import "./index.css";

const cardList = new Section(
    {
        data: initialCards,
        renderer: (card) => {
            return createCard(card);
        }
    },
    ".elements"
);
cardList.renderer();

const profileEditValidation = new FormValidator(validation, profileEdit);
const cardAddValidation = new FormValidator(validation, cardAdd);

export const popupOpenImage = new PopupWithImage(".popup_gallery");
popupOpenImage.setEventListeners();

const userInfoProfile = new UserInfo(profileTitle, profileSubtitle);

const popupOpenProfile = new PopupWithForm(".popup_edit-profile", (formValues) => {
    userInfoProfile.setUserInfo(formValues);
});
popupOpenProfile.setEventListeners();

const popupOpenAddCard = new PopupWithForm(".popup_add-card", (formValues) => {
    cardList.addItem(createCard(formValues));
});

popupOpenAddCard.setEventListeners();
profileEditValidation.enableValidation();
cardAddValidation.enableValidation();

//  Открытие попапа изменения профиля
buttonProfilePopupOpen.addEventListener("click", () => {
    const userProfile = userInfoProfile.getUserInfo();
    popupInputTypeName.value = userProfile.name.textContent;
    popupInputTypeInfo.value = userProfile.about.textContent;
    popupOpenProfile.open();
});

//  Открытие попапа добавления карточки
popupButtonAdd.addEventListener("click", () => {
    popupOpenAddCard.open();
});
