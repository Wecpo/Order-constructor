function init() {
  createChoiceProductForm();
}

function createChoiceProductForm() {
  let cart = [];

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
  listOfProducts.textContent = "Ваша корзина: ";

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

  const option6 = document.createElement("option");
  option6.value = `Яйца - 140р`;
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
    addToCartButton,
    listOfProducts
  );

  function renderCart() {
    const productsLi = document.querySelectorAll("li");

    for (let i = 0; i < productsLi.length; i++) {
      productsLi[i].remove();
    }

    for (let product of cart) {
      const removeButton = document.createElement("button");
      removeButton.style.marginLeft = "15px";
      removeButton.textContent = "x";
      removeButton.addEventListener("click", removeItemFromCart);

      const li = document.createElement("li");
      li.textContent = `${product.name} - ${product.price} ${product.count} шт.`;
      li.id = product.name;
      li.append(removeButton);

      listOfProducts.append(li);
    }
  }

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

  function removeItemFromCart(event) {
    const productName = event.target.parentElement.id;

    const product = cart.find((item) => item.name === productName);
    if (product.count === 1) {
      const newCart = cart.filter((product) => {
        if (product.name !== productName) {
          return product;
        }
      });

      cart = newCart;
    } else {
      const indexOfProductInCart = cart.findIndex(
        (item) => item.name === productName
      );

      const updatedProduct = {
        ...cart[indexOfProductInCart],
        count: cart[indexOfProductInCart].count - 1,
      };

      cart[indexOfProductInCart] = updatedProduct;

      renderCart();
    }

    renderCart();
  }
}

init();
