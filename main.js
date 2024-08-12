import { initForm } from "./src/initForm.js";
import { createElement } from "./src/utils/customCreateElement.js";

export default function Order() {
  initForm();
}

Order.prototype.cart = [];

Order.prototype.addProductToCart = function () {
  // Функция добавления продукта в корзину

  const isCartEmpty = document.querySelector("#isCartEmpty");
  isCartEmpty.textContent = "Ваша корзина: ";

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
  const productName = event.target.id;

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
  const productName = event.target.id;

  this.cart = this.cart.filter((product) => product.name !== productName);

  if (!this.cart.length) {
    isCartEmpty.textContent = "Ваша корзина пуста";
  }

  this.renderCart();
};

Order.prototype.renderCart = function () {
  // Функция обновления корзины

  // Рендерим список продуктов
  const islistOfProducts = document.querySelector("#listOfProducts");
  islistOfProducts?.remove();

  const liList = [];

  for (let product of this.cart) {
    const productActionContainer = createElement({ tag: "div" });

    const decrementProductButton = createElement({
      tag: "button",
      textContent: "-",
      id: product.name,
      className: "decrementProductButton",
    });
    decrementProductButton.addEventListener("click", (event) =>
      this.decrementProductInCart(event)
    );

    const removeProductButton = createElement({
      tag: "button",
      textContent: "удалить",
      id: product.name,
      className: "removeProductButton",
    });
    removeProductButton.addEventListener("click", (event) =>
      this.removeProductFromCart(event)
    );

    productActionContainer.append(decrementProductButton, removeProductButton);

    const li = createElement({
      tag: "li",
      textContent: `${product.name} - ${product.price}р ${product.count} шт.`,
      id: product.name,
    });
    li.append(productActionContainer);
    liList.push(li);
  }

  const listOfProducts = createElement({
    tag: "ol",
    id: "listOfProducts",
  });

  listOfProducts.append(...liList);

  const isCartEmpty = document.querySelector("#isCartEmpty");
  isCartEmpty.after(listOfProducts);

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
