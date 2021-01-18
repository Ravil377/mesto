let popup = document.querySelector(".popup");

let popupContainer = popup.querySelector(".popup__container");
let popupButtonClose = popup.querySelector(".popup__button-close");
let popupButtonOpen = document.querySelector(".profile__edit-button");
let popupContainerInputTitle = popup.querySelector(".popup__container-input-title");
let popupContainerInputSubtitle = popup.querySelector(".popup__container-input-subtitle");
let popupContainerSubmitButton = document.querySelector(".popup__container-submit-button");

function closePopup() {
    popup.classList.remove("popup_opened");
}

function openPopup() {
    let profileTitle = document.querySelector(".profile__title");
    let profileSubtitle = document.querySelector(".profile__subtitle");
    console.log(profileTitle.textContent);
    popupContainerInputTitle.value = profileTitle.textContent;
    popupContainerInputSubtitle.value = profileSubtitle.textContent;
    popup.classList.add("popup_opened");
}

function saveprofile(evt) {
    evt.preventDefault();
    let profileTitle = document.querySelector(".profile__title");
    let profileSubtitle = document.querySelector(".profile__subtitle");
    profileTitle.textContent = popupContainerInputTitle.value;
    profileSubtitle.textContent = popupContainerInputSubtitle.value;
    popup.classList.remove("popup_opened");
}

popupButtonClose.addEventListener("click", closePopup);
popupButtonOpen.addEventListener("click", openPopup);
popupContainerSubmitButton.addEventListener("click", saveprofile);
