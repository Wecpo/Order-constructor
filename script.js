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

function createChoiceProductForm() {
  let cart = [];

  const body = document.querySelector("body");

  // Создание кнопки добавления продукта в корзину
  const addProductToCartButton = document.createElement("button");
  addProductToCartButton.style.marginLeft = "10px";
  addProductToCartButton.textContent = "Добавить в корзину";
  addProductToCartButton.addEventListener("click", addProductToCart);
  addProductToCartButton.addEventListener(
    "unload",
    () => addProductToCartButton.removeEventListener("click", addProductToCart),
    {
      once: true,
    }
  );

  // Создание формы выбора продукта
  const formChoiceProduct = document.createElement("form");
  formChoiceProduct.name = "formChoiceProduct";

  // Создание label для формы выбора продукта
  const labelForFormChoiceProduct = document.createElement("label");
  labelForFormChoiceProduct.textContent = "Выберите продукт ";

  // Создание выпадающего списка для формы выбора продукта
  const selectFormChoiceProduct = document.createElement("select");
  selectFormChoiceProduct.name = "product";

  // Создание списка продуктов
  const listOfProducts = document.createElement("ol");
  listOfProducts.textContent = `Ваша корзина пуста`;

  const totalCartPrice = document.createElement("div");
  totalCartPrice.textContent = "";

  function getSelectOptionsArray() {
    return selectOptions.map((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.textContent;
      return option;
    });
  }

  selectFormChoiceProduct.append(...getSelectOptionsArray());

  body.append(
    formChoiceProduct,
    labelForFormChoiceProduct,
    selectFormChoiceProduct,
    addProductToCartButton,
    listOfProducts,
    totalCartPrice
  );

  function getTotalPrice() {
    return cart.reduce((acc, item) => {
      const itemPrice = +item.price * item.count;

      return (acc += itemPrice);
    }, 0);
  }

  function renderCart() {
    // Функция обновления корзины
    const productsLi = document.querySelectorAll("li");

    // Удаляем все элементы списка перед рендером
    for (let i = 0; i < productsLi.length; i++) {
      productsLi[i].firstElementChild.removeEventListener(
        "click",
        removeProductFromCart
      );

      productsLi[i].remove();
    }

    // Рендерим список продуктов
    for (let product of cart) {
      const removeProductButton = document.createElement("button");
      removeProductButton.style.marginLeft = "15px";
      removeProductButton.textContent = "x";

      removeProductButton.addEventListener("click", removeProductFromCart);

      const li = document.createElement("li");
      li.textContent = `${product.name} - ${product.price}р ${product.count} шт.`;
      li.id = product.name;
      li.append(removeProductButton);

      listOfProducts.append(li);
    }

    // Отображение общей стоимости
    if (cart.length) {
      totalCartPrice.textContent = `Общая стоимость: ${getTotalPrice()}р`;
    } else {
      totalCartPrice.textContent = "";
    }
  }

  function getProductIndex(productName) {
    return cart.findIndex((item) => item.name === productName);
  }

  function addProductToCart(event) {
    // Функция добавления продукта в корзину
    event.preventDefault();

    listOfProducts.textContent = `Ваша корзина:`;

    const [productName, productPrice] =
      selectFormChoiceProduct.value.split("-");

    const productIndex = getProductIndex(productName);

    if (productIndex >= 0) {
      cart[productIndex].count++;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        count: 1,
      });
    }

    renderCart();
  }

  function removeProductFromCart(event) {
    const productName = event.target.parentElement.id;

    const product = cart.find((product) => product.name === productName);

    if (product.count === 1) {
      cart = cart.filter((product) => product.name !== productName);

      if (!cart.length) {
        listOfProducts.textContent = "Ваша корзина пуста";
      }
    } else {
      const productIndex = getProductIndex(productName);

      cart[productIndex].count--;
    }

    renderCart();
  }
}

createChoiceProductForm();
