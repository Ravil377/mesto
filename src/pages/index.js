import {
    initialCards,
    validation,
    buttonProfilePopupOpen,
    popupButtonAdd,
    profileTitle,
    profileSubtitle,
    popupContainerEditProfile,
    popupInputTypeName,
    popupInputTypeInfo,
    profileEdit,
    popupContainerAddCard,
    cardAdd,
    popupButtonAddCard,
    elements,
    popupGallery,
    inputListAddCard,
} from "../utils/constants.js";
import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";
import { Section } from "../components/section.js";
import "./index.css";

const cardList = new Section(
    {
        data: initialCards,
        renderer: (card) => {
            const cardElement = new Card(card, ".element-template", (name, link) => {
                popupOpenImage.open(name, link);
            });
            const cardEl = cardElement.generateCard();
            return cardEl;
        },
    },
    elements
);
cardList.renderer();

const profileEditValidation = new FormValidator(validation, profileEdit);
const cardAddValidation = new FormValidator(validation, cardAdd);

const popupOpenImage = new PopupWithImage(popupGallery);
popupOpenImage.setEventListeners();

const userInfoProfile = new UserInfo(profileTitle, profileSubtitle);

const popupOpenProfile = new PopupWithForm(popupContainerEditProfile, (formValues) => {
    userInfoProfile.setUserInfo(formValues);
});
popupOpenProfile.setEventListeners();

const popupOpenAddCard = new PopupWithForm(popupContainerAddCard, (formValues) => {
    const cardElement = new Card(formValues, ".element-template", (name, link) => {
        popupOpenImage.open(name, link);
    });
    const cardEl = cardElement.generateCard();
    cardList.addItem(cardEl);
});

popupOpenAddCard.setEventListeners();
profileEditValidation.enableValidation();
cardAddValidation.enableValidation();

//  Открытие попапа изменения профиля
buttonProfilePopupOpen.addEventListener("click", () => {
    const userProfile = userInfoProfile.getUserInfo();
    popupInputTypeName.value = userProfile.name.textContent;
    popupInputTypeInfo.value = userProfile.about.textContent;
    popupOpenProfile.open(this);
});

//  Открытие попапа добавления карточки
popupButtonAdd.addEventListener("click", () => {
    cardAddValidation.disableSubmitButton(popupButtonAddCard); // отключаю кнопку при открытии попапа
    // очистка ошибок в попапе
    inputListAddCard.forEach((item) => {
        cardAddValidation.hideInputError(item);
    });
    popupOpenAddCard.open(this);
});
