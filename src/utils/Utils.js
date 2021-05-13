import { Card } from "../components/Сard.js";
import { popupOpenImage } from "../pages/index.js";


export const createCard = (dataElement) => {
    const cardElement = new Card(dataElement, ".element-template", (name, link) => {
        popupOpenImage.open(name, link);
    });
    const cardEl = cardElement.generateCard();
    return cardEl;
}
