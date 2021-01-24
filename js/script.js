let popup = document.querySelector(".popup");
let popupInputTypeName = popup.querySelector(".popup__input_type_name");
let popupInputTypeInfo = popup.querySelector(".popup__input_type_info");
let profileTitle = document.querySelector(".profile__title-text");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupButtonClose = popup.querySelector(".popup__button-close");
let popupButtonOpen = document.querySelector(".profile__edit-button");
let editProfile = document.querySelector(".edit_profile");
let elements = document.querySelector(".elements")
let elementLikeButton = elements.querySelectorAll(".element__like-button");

for (let i=0; i < elementLikeButton.length; i++) {
    elementLikeButton[i].addEventListener("click", function() {
        elementLikeButton[i].classList.toggle("element__like-button_active");
    });
}




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
editProfile.addEventListener("submit", saveprofile);