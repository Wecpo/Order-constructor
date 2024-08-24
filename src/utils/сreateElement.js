export class CreateElement {
  constructor({ tag, textContent, id, className }) {
    this.element = document.createElement(tag);

    if (textContent) {
      this.element.textContent = textContent;
    }

    if (id) {
      this.element.id = id;
    }

    if (className) {
      this.element.className = className;
    }

    return this.element;
  }
}
