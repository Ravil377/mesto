let popup = document.querySelector(".popup");
let popupInputTypeName = popup.querySelector(".popup__input_type_name");
let popupInputTypeInfo = popup.querySelector(".popup__input_type_info");
let profileTitle = document.querySelector(".profile__title-text");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupButtonClose = popup.querySelector(".popup__button-close");
let popupButtonOpen = document.querySelector(".profile__edit-button");
let popupSubmitButton = document.querySelector(".popup__edit-profile");

function closePopup() {
    popup.classList.remove("popup_opened");
}

function openPopup() {
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeInfo.value = profileSubtitle.textContent;
    popup.classList.add("popup_opened");
}

function saveprofile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputTypeName.value;
    profileSubtitle.textContent = popupInputTypeInfo.value;
    closePopup();
}

popupButtonClose.addEventListener("click", closePopup);
popupButtonOpen.addEventListener("click", openPopup);
popupSubmitButton.addEventListener("submit", saveprofile);