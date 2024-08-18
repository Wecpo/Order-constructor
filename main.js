import { CreateElement } from "./src/utils/сreateElement.js";
import { debounce } from "./src/utils/debounce.js";

const PRODUCT_ACTIONS = {
  add: "ADD",
  increment: "INCREMENT",
  decrement: "DECREMENT",
  remove: "REMOVE",
};

export default class Order {
  constructor() {
    this.cart = [];
    this.cartStatus = document.querySelector("#cartStatus");
    this.productsList = document.querySelector("#productsList");

    const addProductToCartButton = document.querySelector(
      "#addProductToCartButton"
    );

    const debouncedAddToCart = debounce(() => this.addProductToCart(), 400);

    addProductToCartButton.addEventListener("click", debouncedAddToCart);
    addProductToCartButton.addEventListener(
      "unload",
      () =>
        addProductToCartButton.removeEventListener("click", debouncedAddToCart),
      {
        once: true,
      }
    );
  }

  createLi(product) {
    const li = new CreateElement({
      tag: "li",
      id: product.name,
      textContent: `${product.name} - ${product.price}р ${product.count} шт.`,
    });
    const removeButton = new CreateElement({
      tag: "button",
      textContent: "remove",
    });
    removeButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.remove, product)
    );

    const incrementButton = new CreateElement({
      tag: "button",
      textContent: "incr",
    });
    incrementButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.increment, product)
    );

    const decrementButton = new CreateElement({
      tag: "button",
      textContent: "decr",
    });
    decrementButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.decrement, product)
    );

    li.append(incrementButton, decrementButton, removeButton);

    return li;
  }

  _getTotalPrice() {
    return this.cart.reduce((acc, item) => {
      const itemPrice = item.price * item.count;

      return (acc += itemPrice);
    }, 0);
  }

  _getProductIndex(productName) {
    return this.cart.findIndex((item) => {
      return item.name === productName;
    });
  }

  addProductToCart() {
    const selectFormChoiceProduct = document.querySelector(
      "#selectFormChoiceProduct"
    );

    const [productName, productPrice] =
      selectFormChoiceProduct.value.split(" - ");

    const productIndex = this._getProductIndex(productName);
    const newProduct = { name: productName, price: productPrice, count: 1 };
    if (productIndex >= 0) {
      this.rerenderCart(PRODUCT_ACTIONS.increment, productName);
    } else {
      this.cart.push(newProduct);

      this.rerenderCart(PRODUCT_ACTIONS.add, {
        ...newProduct,
      });
    }

    this.cartStatus.textContent = "Ваша корзина: ";
  }

  decrementProduct(product) {
    const index = this._getProductIndex(product.name);
    this.cart[index].count--;

    if (this.cart[index].count < 1) {
      this.removeProduct(product);
    }
    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (item.id === product.name) {
        item.replaceWith(this.createLi(this.cart[index]));
      }
    });
  }

  incrementProduct(product) {
    const index = this._getProductIndex(product);
    this.cart[index].count++;

    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (item.id === product.name) {
        item.replaceWith(this.createLi(this.cart[index]));
      }
    });
  }

  removeProduct(product) {
    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (item.id === product.name) {
        item.remove();
      }
    });
    this.cart = this.cart.filter((item) => !item.id === product.name);
  }

  addProduct(product) {
    const li = this.createLi(product);
    this.productsList.append(li);
    this.cartStatus.after(this.productsList);
  }

  rerenderCart(action, product) {
    if (action === PRODUCT_ACTIONS.add) {
      this.addProduct(product);
    }
    if (action === PRODUCT_ACTIONS.remove) {
      this.removeProduct();
    }
    if (action === PRODUCT_ACTIONS.increment) {
      this.incrementProduct(product);
    }

    if (action === PRODUCT_ACTIONS.decrement) {
      this.decrementProduct(product);
    }

    const totalCartPrice = document.querySelector("#totalCartPrice");

    if (this.cart.length) {
      totalCartPrice.textContent = `Общая стоимость: ${this._getTotalPrice()}р`;
    } else {
      totalCartPrice.textContent = "";
    }
  }
}

const cart = new Order();
