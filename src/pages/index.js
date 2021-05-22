import { 
    validation, 
    buttonProfilePopupOpen, 
    popupButtonAdd, 
    popupInputTypeName, 
    popupInputTypeInfo, 
    profileEdit, 
    cardAdd, 
    apiOptions, 
    formAvatar, 
    popupAvatarEdit 
} from "../utils/Constants.js";
import { PopupConfirmationDelete } from "../components/PopupConfirmationDelete.js";
import { createCard } from "../utils/Utils.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";
import { FormValidator } from "../components/FormValidator.js";
import "./index.css";

const userInfoProfile = new UserInfo(".profile__title-text", ".profile__subtitle", ".profile__avatar");

export const api = new Api(apiOptions);

const cardList = new Section((card, userId) => createCard(card, userId), ".elements");

// Загрузка профиля с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([ userData, cards ]) => { 
    userInfoProfile.setUserInfo(userData);
    userInfoProfile.setUserAvatar(userData.avatar);
    // Первоначальная загрузка карточек
    cardList.renderer(cards, userData._id);
  }).catch((err) => console.log(err));

// Попап подтверждения удаления карточки
export const popupOpenCardRemove = new PopupConfirmationDelete(
    ".popup_imageDelete", 
    ".popup__container-submit-button_delete-button", 
    (id, handleCardDelete) => {
        api.deleteCard(id)
            .then((res) => {
                handleCardDelete.remove();
                popupOpenCardRemove.close();
            })
            .catch((err) => console.log(err));
});
popupOpenCardRemove.setEventListeners();

// Попап добавления карточки
const popupOpenAddCard = new PopupWithForm(".popup_add-card", (formValues) => {
    api.postCard(formValues.name, formValues.link)
        .then((res) => {
            cardList.addItem(createCard(res, res.owner._id));
            popupOpenAddCard.close();
        })
        .catch((err) => console.log(err));
});
popupOpenAddCard.setEventListeners();

//  Открытие попапа добавления карточки
popupButtonAdd.addEventListener("click", () => {
    popupOpenAddCard.open();
});

//  Попап большой фотографии
export const popupOpenImage = new PopupWithImage(".popup_gallery");
popupOpenImage.setEventListeners();

// Форма редактирования профиля
const popupOpenProfile = new PopupWithForm(".popup_edit-profile", (formValues) => {
    api.postProfileInfo(formValues.name, formValues.about)
        .then((res) => {
            userInfoProfile.setUserInfo(res);
            popupOpenProfile.close();
        })
        .catch((err) => console.log(err));
});
popupOpenProfile.setEventListeners();

// Форма редактирования аватарки
const popupOpenAvatar = new PopupWithForm(".popup_avatar", (formValues) => {
    api.postProfileAvatar(formValues.avatar)
        .then((res) => {
            userInfoProfile.setUserAvatar(res.avatar);
            popupOpenAvatar.close();
        })
        .catch((err) => console.log(err));
});
popupOpenAvatar.setEventListeners();

//  Открытие попапа изменения профиля
buttonProfilePopupOpen.addEventListener("click", () => {
    const userProfile = userInfoProfile.getUserInfo();
    popupInputTypeName.value = userProfile.name;
    popupInputTypeInfo.value = userProfile.about;
    popupOpenProfile.open();
});

// Открытие попапа при нажатии на аватарку
popupAvatarEdit.addEventListener("click", () => {
    popupOpenAvatar.open();
});

const avatarValidation = new FormValidator(validation, formAvatar);
const profileEditValidation = new FormValidator(validation, profileEdit);
const cardAddValidation = new FormValidator(validation, cardAdd);
profileEditValidation.enableValidation();
cardAddValidation.enableValidation();
avatarValidation.enableValidation();
