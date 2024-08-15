import { createElement } from "./utils/customCreateElement.js";

const selectOptions = [
  {
    name: "Гречка",
    price: 100,
    id: 1,
  },
  {
    name: "Яблоки",
    price: 110,
    id: 2,
  },
  {
    name: "Сливочное масло",
    price: 200,
    id: 3,
  },
  {
    name: "Квас",
    price: 120,
    id: 4,
  },
  {
    name: "Колбаса",
    price: 400,
    id: 5,
  },
  {
    name: "Яйца",
    price: 140,
    id: 6,
  },
];

function getSelectOptionsArray(selectOptions) {
  return selectOptions.map((product) => {
    const option = createElement({
      tag: "option",
      textContent: `${product.name} - ${product.price}р`,
    });
    option.value = `${product.name} - ${product.price}`;
    return option;
  });
}

export function initForm() {
  const body = document.querySelector("body");

  const addProductToCartButton = createElement({
    tag: "button",
    textContent: "Добавить в корзину",
    id: "addProductToCartButton",
  });

  const formChoiceProduct = createElement({ tag: "form" });

  const labelForFormChoiceProduct = createElement({
    tag: "label",
    textContent: "Выберите продукт",
  });

  const selectFormChoiceProduct = createElement({
    tag: "select",
    textContent: "",
    id: "selectFormChoiceProduct",
  });

  const cartStatus = createElement({
    tag: "span",
    textContent: "Ваша корзина пуста",
    id: "cartStatus",
  });

  const totalCartPrice = createElement({
    tag: "div",
    textContent: "",
    id: "totalCartPrice",
  });

  selectFormChoiceProduct.append(...getSelectOptionsArray(selectOptions));

  body.append(
    formChoiceProduct,
    labelForFormChoiceProduct,
    selectFormChoiceProduct,
    addProductToCartButton,
    cartStatus,
    totalCartPrice
  );
}
