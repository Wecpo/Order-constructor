import Order from "./script.js";

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

function debouce(func, delay) {
  let timeoutId = 0;
  return function () {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(), delay);
  };
}

export default function initForm() {
  const body = document.querySelector("body");

  // Создание кнопки добавления продукта в корзину
  const addProductToCartButton = document.createElement("button");
  addProductToCartButton.textContent = "Добавить в корзину";
  addProductToCartButton.addEventListener(
    "click",
    debouce(() => Order.prototype.addProductToCart(), 150)
  );
  addProductToCartButton.addEventListener(
    "unload",
    () =>
      addProductToCartButton.removeEventListener(
        "click",
        debouce(() => Order.prototype.addProductToCart(), 150)
      ),
    {
      once: true,
    }
  );

  // Создание формы выбора продукта
  const formChoiceProduct = document.createElement("form");
  formChoiceProduct.name = "formChoiceProduct";

  // Создание label для формы выбора продукта
  const labelForFormChoiceProduct = document.createElement("label");
  labelForFormChoiceProduct.textContent = "Выберите продукт";

  // Создание выпадающего списка для формы выбора продукта
  const selectFormChoiceProduct = document.createElement("select");
  selectFormChoiceProduct.id = "selectFormChoiceProduct";
  selectFormChoiceProduct.name = "product";

  // Создание списка продуктов
  const listOfProducts = document.createElement("ol");
  listOfProducts.id = "listOfProducts";
  listOfProducts.textContent = `Ваша корзина пуста`;

  const totalCartPrice = document.createElement("div");
  totalCartPrice.id = "totalCartPrice";
  totalCartPrice.textContent = "";

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

function getSelectOptionsArray(selectOptions) {
  return selectOptions.map((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.textContent;
    return option;
  });
}
