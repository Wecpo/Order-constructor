export function createElement(tag, textContent, id, className) {
  const element = document.createElement(`${tag}`);
  element.className = className;
  element.id = id;
  element.textContent = textContent;
  return element;
}
