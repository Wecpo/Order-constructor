import Order from "../main.js";
import { createElement } from "./utils/customCreateElement.js";
import { debouce } from "./utils/debounce.js";

const selectOptions = [
  {
    value: "Гречка - 100",
    textContent: "Гречка - 100р",
  },
  {
    value: "Яблоки - 110",
    textContent: "Яблоки - 110р",
  },
  {
    value: "Сливочное масло - 200",
    textContent: "Сливочное масло - 200р",
  },
  {
    value: "Квас - 130",
    textContent: "Квас - 100р",
  },
  {
    value: "Колбаса - 400",
    textContent: "Колбаса - 400р",
  },
  {
    value: "Яйца - 140",
    textContent: "Яйца - 140р",
  },
];

function getSelectOptionsArray(selectOptions) {
  return selectOptions.map((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.textContent;
    return option;
  });
}

export function initForm() {
  const body = document.querySelector("body");

  // Создание кнопки добавления продукта в корзину
  const addProductToCartButton = createElement("button", "Добавить в корзину");
  addProductToCartButton.addEventListener(
    "click",
    debouce(() => Order.prototype.addProductToCart(), 400)
  );
  addProductToCartButton.addEventListener(
    "unload",
    () =>
      addProductToCartButton.removeEventListener(
        "click",
        debouce(Order.prototype.addProductToCart)
      ),
    {
      once: true,
    }
  );

  // Создание формы выбора продукта
  const formChoiceProduct = createElement("form");

  // Создание label для формы выбора продукта
  const labelForFormChoiceProduct = createElement("label", "Выберите продукт");

  // Создание выпадающего списка для формы выбора продукта
  const selectFormChoiceProduct = createElement(
    "select",
    "",
    "selectFormChoiceProduct"
  );

  // Создание списка продуктов
  const listOfProducts = createElement(
    "ol",
    "Ваша корзина пуста",
    "listOfProducts"
  );

  const totalCartPrice = createElement("div", "", "totalCartPrice");

  selectFormChoiceProduct.append(...getSelectOptionsArray(selectOptions));

  body.append(
    formChoiceProduct,
    labelForFormChoiceProduct,
    selectFormChoiceProduct,
    addProductToCartButton,
    listOfProducts,
    totalCartPrice
  );
}
