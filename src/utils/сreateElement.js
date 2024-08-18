export class CreateElement {
  constructor({ tag, textContent, id, className, innerText }) {
    this.element = document.createElement(tag);
    id &&= this.element.id = id;
    className &&= this.element.className = className;
    textContent &&= this.element.textContent = textContent;
    innerText &&= this.element.innerText = innerText;

    return this.element;
  }
}
