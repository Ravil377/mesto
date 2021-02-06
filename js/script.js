const initialCards = [
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

/*  Контейнер popup    */
let popup = document.querySelector(".popup");
/*  Контейнер карточек   */
const elements = document.querySelector(".elements");

/*  Данные профиля в попапе   */
const popupContainerEditProfile = document.querySelector(".popup__container_edit-profile");
let popupSubmitButton = popupContainerEditProfile.querySelector(".popup__edit-profile");
let popupInputTypeName = popupSubmitButton.querySelector(".popup__input_type_name");
let popupInputTypeInfo = popupSubmitButton.querySelector(".popup__input_type_info");
const editButton = popup.querySelector("#edit-button");

/*  Данные в профиле  */
let profileInfo = document.querySelector(".profile__info");
let profileTitle = profileInfo.querySelector(".profile__title-text");
let profileSubtitle = profileInfo.querySelector(".profile__subtitle");

/*  Кнопка добавления карточек  */
let popupAddButton = document.querySelector(".profile__add-button");
/*   Кнопка редактирования профиля    */
let popupButtonOpen = document.querySelector(".profile__edit-button");
/*  Кнопка закрытия попапа   */
let popupButtonClose = popup.querySelector(".popup__button-close");

/*  Попап добавления карточки   */
const popupContainerAddCard = document.querySelector(".popup__container_add-card");

/*  Переменные формы добавления карточки   */
const addButton = popup.querySelector("#add-button");
const popupInputNameCard = popup.querySelector(".popup__input_name_card");
const popupInputFotoCard = popup.querySelector(".popup__input_foto_card");
const popupAddCard = document.querySelector(".popup__add-card");

/*  Шаблон   */
const galleryTemplate = document.querySelector(".element-template");
const galleryImageTemplate = document.querySelector(".template-gallery");

/*      Первоначальная загрузка карточек        */
function loadCards() {
  const massiv = initialCards.map(getCard);
  elements.append(...massiv);
}

/*      Работа с шаблоном карточки        */
function getCard(card) {
  const galleryElement = galleryTemplate.content.cloneNode(true);
  galleryElement.querySelector(".element__image").src = card.link;
  galleryElement.querySelector(".element__image").alt = card.name;
  galleryElement.querySelector(".element__title").textContent = card.name;

  const removebutton = galleryElement.querySelector(".element__delete-button");
  removebutton.addEventListener("click", cardRemove);

  const likebutton = galleryElement.querySelector(".element__like-button");
  likebutton.addEventListener("click", likecard);

  const openImage = galleryElement.querySelector(".element__image");
  openImage.addEventListener("click", openimage);

  return galleryElement;
}

/*    Закрытие попапа     */
function closePopup() {
  popup.classList.remove("popup_opened");
  popup.classList.remove("popup_full-image");
  popupContainerAddCard.classList.remove("popup__container_opened");
  popupContainerEditProfile.classList.remove("popup__container_opened");
  popup.classList.add("popup_closed");
}

/*    Открытие попапа редактирования профиля    */
function openPopup() {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeInfo.value = profileSubtitle.textContent;
  popup.classList.add("popup_opened");
  popup.classList.remove("popup_closed");
  popupContainerEditProfile.classList.add("popup__container_opened");
}

/*   Данные с попапа редактирования профиля переносятся в основной профиль   */
function saveprofile(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileSubtitle.textContent = popupInputTypeInfo.value;
  closePopup();
}

/*    Открытие попапа добавления карточки    */
function openPopupAddCard() {
  popup.classList.add("popup_opened");
  popupContainerAddCard.classList.add("popup__container_opened");
}

/*    Добавляем карточку       */
function saveCard(evt) {
  evt.preventDefault();
  const galleryElement = galleryTemplate.content.cloneNode(true);
  galleryElement.querySelector(".element__image").src = popupInputFotoCard.value;
  galleryElement.querySelector(".element__title").textContent = popupInputNameCard.value;
  popupInputFotoCard.value = "";
  popupInputNameCard.value = "";

  const removebutton = galleryElement.querySelector(".element__delete-button");
  removebutton.addEventListener("click", cardRemove);

  const likebutton = galleryElement.querySelector(".element__like-button");
  likebutton.addEventListener("click", likecard);

  const openImage = galleryElement.querySelector(".element__image");
  openImage.addEventListener("click", openimage);

  elements.prepend(galleryElement);
  closePopup();
}

/*    Удаляем карточку   */
function cardRemove(evt) {
  const targetEl = evt.target;
  const targetItem = targetEl.closest(".element");
  targetItem.remove();
}

/*    Ставим-убираем класс element__like-button_active с кнопки like   */
function likecard(evt) {
  const targetEl = evt.target;
  targetEl.classList.toggle("element__like-button_active");
}

/*   Открытие картинка на весь экран   */
function openimage(evt) {
  const targetEl = evt.target;
  const imageElement = galleryImageTemplate.content.cloneNode(true);
  imageElement.querySelector(".full-image__image").src = targetEl.src;
  imageElement.querySelector(".full-image__image").alt = targetEl.alt;
  imageElement.querySelector(".full-image__caption").textContent = targetEl.alt;
  imageElement.querySelector(".popup__button-close").addEventListener("click", function (evt) {
      const targetEl = evt.target;
      const targetItem = targetEl.closest(".full-image");
      targetItem.remove();
      closePopup();
  });
  popup.classList.add("popup_opened");
  popup.classList.add("popup_full-image");
  popup.append(imageElement);
}

/*   Вызов функции первоначальной загрузки карточек   */
loadCards();

editButton.addEventListener("click", closePopup);
popupButtonOpen.addEventListener("click", openPopup);
popupSubmitButton.addEventListener("submit", saveprofile);

addButton.addEventListener("click", closePopup);
popupAddButton.addEventListener("click", openPopupAddCard);
popupAddCard.addEventListener("submit", saveCard);
