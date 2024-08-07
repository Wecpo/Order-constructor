export function createElement({ tag, textContent, id, className }) {
  const element = document.createElement(tag);
  className ? (element.className = className) : "";
  id ? (element.id = id) : "";
  textContent ? (element.textContent = textContent) : "";
  className ? (element.className = className) : "";

  return element;
}
