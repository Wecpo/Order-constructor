function createChoiceProductForm() {
  let cart = [];

  const body = document.querySelector("body");

  // Создание кнопки добавления продукта в корзину
  const addProductToCartButton = document.createElement("button");
  addProductToCartButton.style.marginLeft = "10px";
  addProductToCartButton.textContent = "Добавить в корзину";
  addProductToCartButton.addEventListener("click", addProductToCart);

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

  // Создание продуктов в выпадающем списке
  const option1 = document.createElement("option");
  option1.value = "Гречка - 100";
  option1.textContent = "Гречка - 100р";

  const option2 = document.createElement("option");
  option2.value = "Яблоки - 110";
  option2.textContent = "Яблоки - 110р";

  const option3 = document.createElement("option");
  option3.value = "Сливочное масло - 200";
  option3.textContent = "Сливочное масло - 200р";

  const option4 = document.createElement("option");
  option4.value = `Квас - 130`;
  option4.textContent = "Квас - 130р";

  const option5 = document.createElement("option");
  option5.value = `Колбаса - 400`;
  option5.textContent = "Колбаса - 400р";

  const option6 = document.createElement("option");
  option6.value = `Яйца - 140`;
  option6.textContent = "Яйца - 140р";

  selectFormChoiceProduct.append(
    option1,
    option2,
    option3,
    option4,
    option5,
    option6
  );

  body.append(
    formChoiceProduct,
    labelForFormChoiceProduct,
    selectFormChoiceProduct,
    addProductToCartButton,
    listOfProducts,
    totalCartPrice
  );

  function renderCart() {
    // Функция обновления корзины
    const productsLi = document.querySelectorAll("li");

    // Удаляем все элементы списка перед рендером
    for (let i = 0; i < productsLi.length; i++) {
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
    cart.length > 0
      ? (totalCartPrice.textContent = `Общая стоимость: ${cart.reduce(
          (acc, item) => {
            const itemPrice = +item.price * item.count;
            console.log(item);
            return (acc += itemPrice);
          },
          0
        )}р`)
      : (totalCartPrice.textContent = "");
  }

  function addProductToCart(event) {
    // Функция добавления продукта в корзину

    event.preventDefault();

    listOfProducts.textContent = `Ваша корзина:`;
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

  function removeProductFromCart(event) {
    // Функция удаления / декремента продукта в корзине

    const productName = event.target.parentElement.id;

    const product = cart.find((item) => item.name === productName);
    if (product.count === 1) {
      const newCart = cart.filter((product) => {
        if (product.name !== productName) {
          return product;
        }
      });

      cart = newCart;

      if (!cart.length) {
        listOfProducts.textContent = "Ваша корзина пуста";
      }
    } else {
      const indexOfProductInCart = cart.findIndex(
        (item) => item.name === productName
      );

      const updatedProduct = {
        ...cart[indexOfProductInCart],
        count: cart[indexOfProductInCart].count - 1,
      };

      cart[indexOfProductInCart] = updatedProduct;
    }

    renderCart();
  }
}

createChoiceProductForm();
