import { initForm } from "./src/initForm.js";
import { createElement } from "./src/utils/customCreateElement.js";
import { debounce } from "./src/utils/debounce.js";

export default class Order {
  constructor() {
    initForm();
    this.cart = [];
    this.isCartEmpty = document.querySelector("#isCartEmpty");

    const debouncedAddToCart = () =>
      debounce(() => this.addProductToCart(), 250);

    const addProductToCartButton = document.querySelector(
      "#addProductToCartButton"
    );

    addProductToCartButton.addEventListener("click", debouncedAddToCart());
    addProductToCartButton.addEventListener(
      "unload",
      addProductToCartButton.removeEventListener("click", debouncedAddToCart()),
      {
        once: true,
      }
    );
  }

  _getTotalPrice() {
    return this.cart.reduce((acc, item) => {
      const itemPrice = +item.price * item.count;

      return (acc += itemPrice);
    }, 0);
  }

  _getProductIndex(productName) {
    return this.cart.findIndex((item) => item.name === productName);
  }

  addProductToCart() {
    // Функция добавления продукта в корзину

    this.isCartEmpty.textContent = "Ваша корзина: ";

    const selectFormChoiceProduct = document.querySelector(
      "#selectFormChoiceProduct"
    );

    const [productName, productPrice] =
      selectFormChoiceProduct.value.split(" - ");

    const productIndex = this._getProductIndex(productName);

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
  }

  decrementProductInCart() {
    const productName = event.target.id;

    const product = this.cart.find((product) => product.name === productName);

    if (product.count === 1) {
      this.removeProductFromCart();
    } else {
      const productIndex = this._getProductIndex(productName);

      this.cart[productIndex].count--;
    }

    this.renderCart();
  }

  removeProductFromCart() {
    const productName = event.target.id;

    this.cart = this.cart.filter((product) => product.name !== productName);

    if (!this.cart.length) {
      this.isCartEmpty.textContent = "Ваша корзина пуста";
    }

    this.renderCart();
  }

  renderCart() {
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

      productActionContainer.append(
        decrementProductButton,
        removeProductButton
      );

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

    this.isCartEmpty.after(listOfProducts);

    // Отображение общей стоимости
    const totalCartPrice = document.querySelector("#totalCartPrice");
    if (this.cart.length) {
      totalCartPrice.textContent = `Общая стоимость: ${this._getTotalPrice()}р`;
    } else {
      totalCartPrice.textContent = "";
    }
  }
}

const cart = new Order();
