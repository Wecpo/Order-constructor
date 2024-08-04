import initForm from "./initForm.js";

export default function Order() {
  initForm();
}

Order.prototype.cart = [];

Order.prototype.addProductToCart = function () {
  // Функция добавления продукта в корзину

  const listOfProducts = document.querySelector("#listOfProducts");
  listOfProducts.textContent = `Ваша корзина:`;

  const selectFormChoiceProduct = document.querySelector(
    "#selectFormChoiceProduct"
  );

  const [productName, productPrice] =
    selectFormChoiceProduct.value.split(" - ");

  const productIndex = this.getProductIndex(productName);

  if (productIndex >= 0) {
    this.cart[productIndex].count++;
  } else {
    this.cart.push({
      name: productName,
      price: productPrice,
      count: 1,
    });
  }

  this.renderCart();
};

Order.prototype.decrementProductInCart = function (event) {
  const productName = event.target.parentElement.id;

  const product = this.cart.find((product) => product.name === productName);

  if (product.count === 1) {
    this.removeProductFromCart(event);
  } else {
    const productIndex = this.getProductIndex(productName);

    this.cart[productIndex].count--;
  }

  this.renderCart();
};

Order.prototype.removeProductFromCart = function (event) {
  const productName = event.target.parentElement.id;
  this.cart = this.cart.filter((product) => product.name !== productName);

  const listOfProducts = document.querySelector("#listOfProducts");
  if (!this.cart.length) {
    listOfProducts.textContent = "Ваша корзина пуста";
  }

  this.renderCart();
};

Order.prototype.renderCart = function () {
  // Функция обновления корзины
  const productsLi = document.querySelectorAll("li");

  // Удаляем все элементы списка перед рендером
  for (let i = 0; i < productsLi.length; i++) {
    productsLi[i].firstElementChild.removeEventListener(
      "click",
      this.decrementProductInCart
    );
    productsLi[i].firstElementChild.removeEventListener(
      "click",
      this.removeProductFromCart
    );

    productsLi[i].remove();
  }

  // Рендерим список продуктов
  for (let product of this.cart) {
    const decrementProductButton = document.createElement("button");
    decrementProductButton.textContent = "-";
    decrementProductButton.addEventListener("click", (event) =>
      this.decrementProductInCart(event)
    );

    const removeProductButton = document.createElement("button");
    removeProductButton.textContent = "x";
    removeProductButton.addEventListener("click", (event) =>
      this.removeProductFromCart(event)
    );

    const li = document.createElement("li");
    li.textContent = `${product.name} - ${product.price}р ${product.count} шт.`;
    li.id = product.name;
    li.append(decrementProductButton, removeProductButton);

    const listOfProducts = document.querySelector("#listOfProducts");
    listOfProducts.append(li);
  }

  // Отображение общей стоимости
  const totalCartPrice = document.querySelector("#totalCartPrice");
  if (this.cart.length) {
    totalCartPrice.textContent = `Общая стоимость: ${this.getTotalPrice()}р`;
  } else {
    totalCartPrice.textContent = "";
  }
};

Order.prototype.getTotalPrice = function () {
  return this.cart.reduce((acc, item) => {
    const itemPrice = +item.price * item.count;

    return (acc += itemPrice);
  }, 0);
};

Order.prototype.getProductIndex = function (productName) {
  return this.cart.findIndex((item) => item.name === productName);
};

new Order();
