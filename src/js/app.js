import { CardNumberFormWidget } from "./validate-widjet";

const container = document.querySelector(".card");
const form = new CardNumberFormWidget(container);

form.bindToDOM();
