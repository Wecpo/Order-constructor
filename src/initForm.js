import { CreateElement } from "./utils/сreateElement.js";

export const PRODUCTS = [
  {
    name: "Гречка",
    price: 100,
    id: `product-${crypto.randomUUID()}`,
  },
  {
    name: "Яблоки",
    price: 110,
    id: `product-${crypto.randomUUID()}`,
  },
  {
    name: "Сливочное масло",
    price: 200,
    id: `product-${crypto.randomUUID()}`,
  },
  {
    name: "Квас",
    price: 120,
    id: `product-${crypto.randomUUID()}`,
  },
  {
    name: "Колбаса",
    price: 400,
    id: `product-${crypto.randomUUID()}`,
  },
  {
    name: "Яйца",
    price: 140,
    id: `product-${crypto.randomUUID()}`,
  },
];

function generateSelectOptions(products) {
  return products.map((product) => {
    const option = new CreateElement({
      tag: "option",
      textContent: `${product.name} - ${product.price}р`,
    });
    option.id = product.id;

    return option;
  });
}

const toCartButton = new CreateElement({
  tag: "button",
  textContent: "Добавить в корзину",
  id: "toCartButton",
});

const formChoiceProduct = new CreateElement({ tag: "form" });

const labelForFormChoiceProduct = new CreateElement({
  tag: "label",
  textContent: "Выберите продукт",
});

const productFormSelect = new CreateElement({
  tag: "select",
  id: "productFormSelect",
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

const productList = new CreateElement({ tag: "ol", id: "productList" });

productFormSelect.append(...generateSelectOptions(PRODUCTS));

const body = document.querySelector("body");
body.append(
  formChoiceProduct,
  labelForFormChoiceProduct,
  productFormSelect,
  toCartButton,
  cartStatus,
  productList,
  totalCartPrice
);
