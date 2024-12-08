import cardAmex from "../img/card-amex.gif";
import cardDiners from "../img/card-diners.gif";
import cardDiscover from "../img/card-discover.gif";
import cardJcb from "../img/card-jcb.gif";
import cardMastercard from "../img/card-mastercard.gif";
import cardVisa from "../img/card-visa.gif";
import cardMir from "../img/mir-payment.png";

export default class CardImages {
  constructor(imagesField) {
    this.images = [
      { name: "amex" },
      { name: "diners" },
      { name: "discover" },
      { name: "jcb" },
      { name: "mastercard" },
      { name: "visa" },
      { name: "mir" },
    ];
    this.imagesField = imagesField;
  }

  addAllImages(activeCard = null) {
    this.images.forEach((img) => {
      const cardImg = document.createElement("img");
      cardImg.setAttribute("class", "card__image");
      img.name === "amex"
        ? cardImg.setAttribute("src", cardAmex)
        : img.name === "diners"
          ? cardImg.setAttribute("src", cardDiners)
          : img.name === "discover"
            ? cardImg.setAttribute("src", cardDiscover)
            : img.name === "jcb"
              ? cardImg.setAttribute("src", cardJcb)
              : img.name === "mastercard"
                ? cardImg.setAttribute("src", cardMastercard)
                : img.name === "visa"
                  ? cardImg.setAttribute("src", cardVisa)
                  : cardImg.setAttribute("src", cardMir);
      if (activeCard !== null && activeCard !== img.name) {
        cardImg.classList.add("card__image-disactive");
      }
      this.imagesField.appendChild(cardImg);
    });
  }
}
