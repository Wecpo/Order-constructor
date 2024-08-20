export class CreateElement {
  constructor({ tag, textContent, id, className }) {
    this.element = document.createElement(tag);
    id &&= this.element.id = id;
    className &&= this.element.className = className;
    textContent &&= this.element.textContent = textContent;

    return this.element;
  }
}
