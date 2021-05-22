import { api } from "../pages/index.js";
import { Card } from "../components/Сard.js";
import { popupOpenImage } from "../pages/index.js";
import { popupOpenCardRemove } from "../pages/index.js";

export function createCard(dataElement, userId) {
    const cardElement = new Card(
        dataElement,
        userId,
        ".element-template",
        (name, link) => {
            popupOpenImage.open(name, link);
        },
        (id, handleDeleteCard) => {
            popupOpenCardRemove.open(id, handleDeleteCard);
        },
        (isLike, id) => {
            if (!isLike) {
                api.likeAdd(id).then((res) => cardElement.addAndRemoveLike(res.likes.length))
                .catch((err) => console.log(err));
            } else {
                api.deleteLike(id).then((res) => cardElement.addAndRemoveLike(res.likes.length))
                .catch((err) => console.log(err));
            }
        }
    );
    const cardEl = cardElement.generateCard();
    return cardEl;
}
