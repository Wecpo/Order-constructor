import { CreateElement } from "./utils/сreateElement.js";

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
    const option = new CreateElement({
      tag: "option",
      textContent: `${product.name} - ${product.price}р`,
    });
    option.value = `${product.name} - ${product.price}`;
    return option;
  });
}

const body = document.querySelector("body");

const addProductToCartButton = new CreateElement({
  tag: "button",
  textContent: "Добавить в корзину",
  id: "addProductToCartButton",
});

const formChoiceProduct = new CreateElement({ tag: "form" });

const labelForFormChoiceProduct = new CreateElement({
  tag: "label",
  textContent: "Выберите продукт",
});

const selectFormChoiceProduct = new CreateElement({
  tag: "select",
  id: "selectFormChoiceProduct",
});

const cartStatus = new CreateElement({
  tag: "span",
  textContent: "Ваша корзина пуста",
  id: "cartStatus",
});

const totalCartPrice = new CreateElement({
  tag: "div",
  id: "totalCartPrice",
});

const productsList = new CreateElement({ tag: "ol", id: "productsList" });

selectFormChoiceProduct.append(...getSelectOptionsArray(selectOptions));

body.append(
  formChoiceProduct,
  labelForFormChoiceProduct,
  selectFormChoiceProduct,
  addProductToCartButton,
  cartStatus,
  productsList,
  totalCartPrice
);
