import { cardNumberValidator } from "./card-number-validator";
import { cardIssuerValidator } from "./card-issuer-validator";
import CardImages from "./card-images";
import imgInformation from "../licenses.json";

export class CardNumberFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.clear = this.clear.bind(this);
    this.getAllImagesElements = this.getAllImagesElements.bind(this);
    this.deleteExistTooltip = this.deleteExistTooltip.bind(this);
    this.validate = this.validate.bind(this);
  }

  static get markup() {
    return `
      <form class="card__number-form-widget">
        <div class="all__images" title="${imgInformation.data}"></div>
        <div class="control">
          <input type="text" class="input" placeholder="Enter the card number">
          <button class="submit">Click to Validate</button>
        </div>
      </form>
    `;
  }

  static get submitSelector() {
    return ".submit";
  }

  static get inputSelector() {
    return ".input";
  }

  static get selector() {
    return ".card__number-form-widget";
  }

  static get imagesSelector() {
    return ".all__images";
  }

  static get imgSelector() {
    return ".card__image";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardNumberFormWidget.markup;
    this.element = this.parentEl.querySelector(CardNumberFormWidget.selector);

    this.imagesContainer = this.element.querySelector(
      CardNumberFormWidget.imagesSelector,
    );
    this.imagesInstance = new CardImages(this.imagesContainer);
    this.imagesInstance.addAllImages();

    this.submit = this.element.querySelector(
      CardNumberFormWidget.submitSelector,
    );
    this.input = this.element.querySelector(CardNumberFormWidget.inputSelector);

    this.element.addEventListener("submit", this.onSubmit);
    this.input.addEventListener("input", this.onInput);
  }

  getAllImagesElements() {
    return this.imagesContainer.querySelectorAll(
      CardNumberFormWidget.imgSelector,
    );
  }

  clear(images) {
    images.forEach((img) => img.remove());
  }

  deleteExistTooltip() {
    const existTooltip = this.element.querySelector(".tooltip");
    if (existTooltip !== null) {
      existTooltip.remove();
    }
  }

  validate() {
    const value = this.input.value.trim();
    try {
      cardNumberValidator(value);
      const correctImg = cardIssuerValidator(value);

      this.clear(this.getAllImagesElements());

      this.imagesInstance.addAllImages(correctImg);

      this.deleteExistTooltip();
    } catch (error) {
      this.clear(this.getAllImagesElements());
      this.imagesInstance.addAllImages();

      const tooltipHtml = `<div class="tooltip">${error.message}</div>`;
      this.input.insertAdjacentHTML("afterEnd", tooltipHtml);
      const tooltip = this.input.nextElementSibling;
      const { top, left } = this.input.getBoundingClientRect();
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top + 38}px`;
      tooltip.classList.add("tooltip_active");
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.validate();
  }

  onInput() {
    this.clear(this.getAllImagesElements());
    this.imagesInstance.addAllImages();
    this.deleteExistTooltip();
  }
}
