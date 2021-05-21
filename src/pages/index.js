import { 
    validation, 
    buttonProfilePopupOpen, 
    popupButtonAdd, 
    profileTitle, 
    profileSubtitle, 
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

const userInfoProfile = new UserInfo(profileTitle, profileSubtitle, ".profile__avatar");

export const api = new Api(apiOptions);

// Загрузка профиля с сервера
api.getProfileInfo()
    .then((res) => {
        userInfoProfile.setUserInfo(res.name, res.about);
        userInfoProfile.setUserAvatar(res.avatar);
    })
    .catch((err) => console.log(err));

// Попап подтверждения удаления карточки
export const popupOpenCardRemove = new PopupConfirmationDelete(
    ".popup_imageDelete", 
    ".popup__container-submit-button_delete-button", 
    (id, handleCardDelete) => {
        api.deleteCard(id)
            .then((res) => {
                handleCardDelete.remove();
            })
            .catch((err) => console.log(err));
});
popupOpenCardRemove.setEventListeners();

// Первоначальная загрузка карточек
api.getInitialCards().then((res) => {
    const cardList = new Section(
        {
            data: res,
            renderer: (card) => {
                return createCard(card);
            },
        },
        ".elements"
    );
    cardList.renderer();
});

// Попап добавления карточки
const popupOpenAddCard = new PopupWithForm(".popup_add-card", (formValues) => {
    api.postCard(formValues.name, formValues.link)
        .then((res) => {
            const cardList = new Section(
                {
                    data: res,
                    renderer: (card) => {
                        return createCard(card);
                    },
                },
                ".elements"
            );
            cardList.addItem(createCard(res));
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupOpenAddCard.close();
        });
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
        .then((res) => userInfoProfile.setUserInfo(res.name, res.about))
        .catch((err) => console.log(err))
        .finally(() => {
            popupOpenProfile.close();
        });
});
popupOpenProfile.setEventListeners();

// Форма редактирования аватарки
const popupOpenAvatar = new PopupWithForm(".popup_avatar", (formValues) => {
    api.postProfileAvatar(formValues.avatar)
        .then((res) => userInfoProfile.setUserAvatar(res.avatar))
        .catch((err) => console.log(err))
        .finally(() => {
            popupOpenAvatar.close();
        });
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
