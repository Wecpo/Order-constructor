function init() {
  createChoiceProductForm();
}

function createChoiceProductForm() {
  const cart = [];

  const body = document.querySelector("body");

  // Создание кнопки добавления продукта в корзину
  const addToCartButton = document.createElement("button");
  addToCartButton.style.marginLeft = "10px";
  addToCartButton.textContent = "Добавить в корзину";
  addToCartButton.addEventListener("click", addToCart);

  // Создание формы выбора продукта
  const formChoiceProduct = document.createElement("form");
  formChoiceProduct.name = "formChoiceProduct";

  // Создание label для формы выбора продукта
  const labelForFormChoiceProduct = document.createElement("label");
  labelForFormChoiceProduct.setAttribute("for", "formChoiceProduct");
  labelForFormChoiceProduct.textContent = "Выберите продукт ";

  // Создание выпадающего списка для формы выбора продукта
  const selectFormChoiceProduct = document.createElement("select");
  selectFormChoiceProduct.name = "product";

  // Создание списка продуктов
  const listOfProducts = document.createElement("ol");
  listOfProducts.textContent = cart.length
    ? "Ваша корзина"
    : "Ваша корзина пуста";

  // Создание продуктов в выпадающем списке
  const option1 = document.createElement("option");
  option1.value = "Гречка - 100р";
  option1.textContent = "Гречка - 100р";

  const option2 = document.createElement("option");
  option2.value = "Яблоки - 110р";
  option2.textContent = "Яблоки - 110р";

  const option3 = document.createElement("option");
  option3.value = "Сливочное масло - 200р";
  option3.textContent = "Сливочное масло - 200р";

  const option4 = document.createElement("option");
  option4.value = `Квас - 130р`;
  option4.textContent = "Квас - 130р";

  const option5 = document.createElement("option");
  option5.value = `Колбаса - 400р`;
  option5.textContent = "Колбаса - 400р";

  selectFormChoiceProduct.append(option1, option2, option3, option4, option5);

  body.append(
    formChoiceProduct,
    labelForFormChoiceProduct,
    selectFormChoiceProduct,
    addToCartButton,
    listOfProducts
  );

  function addToCart(event) {
    event.preventDefault();

    const productName = selectFormChoiceProduct.value.split("-")[0];
    const productPrice = selectFormChoiceProduct.value.split("-")[1];

    const indexOfProductInCart = cart.findIndex(
      (item) => item.name === productName
    );

    if (indexOfProductInCart >= 0) {
      const updatedProduct = {
        ...cart[indexOfProductInCart],
        count: cart[indexOfProductInCart].count + 1,
      };
      cart[indexOfProductInCart] = updatedProduct;
      renderCart();
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        count: 1,
      });
      renderCart();
    }
  }

  function renderCart() {
    const productLi = document.querySelectorAll("li");
    for (let i = 0; i < productLi.length; i++) {
      productLi[i].remove();
    }
    for (let item of cart) {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price} ${item.count} шт.`;
      li.remove;
      listOfProducts.append(li);
    }
  }
}

init();
