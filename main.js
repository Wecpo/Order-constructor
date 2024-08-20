import { CreateElement } from "./src/utils/сreateElement.js";
import { debounce } from "./src/utils/debounce.js";
import { PRODUCTS } from "./src/initForm.js";

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

    const selectFormChoiceProduct = document.querySelector(
      "#selectFormChoiceProduct"
    );

    const debouncedAddToCart = debounce(
      () =>
        this.rerenderCart(PRODUCT_ACTIONS.add, +selectFormChoiceProduct.value),
      400
    );

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
      id: product.id,
      textContent: `${product.name} - ${product.price}р ${product.count} шт.`,
    });

    const removeButton = new CreateElement({
      tag: "button",
      textContent: "remove",
    });
    removeButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.remove, product.id)
    );

    const incrementButton = new CreateElement({
      tag: "button",
      textContent: "incr",
    });
    incrementButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.increment, product.id)
    );

    const decrementButton = new CreateElement({
      tag: "button",
      textContent: "decr",
    });
    decrementButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.decrement, product.id)
    );

    li.append(incrementButton, decrementButton, removeButton);

    return li;
  }

  getTotalPrice() {
    return this.cart.reduce((acc, item) => {
      const itemPrice = item.price * item.count;

      return (acc += itemPrice);
    }, 0);
  }

  getProductIndex(productId) {
    return this.cart.findIndex((item) => {
      return item.id === productId;
    });
  }

  addProduct(optionId) {
    const product = PRODUCTS.find((product) => product.id === optionId);

    const newProduct = {
      ...product,
      count: 1,
    };

    if (this.cart.findIndex((product) => product.id === newProduct.id) > -1) {
      this.rerenderCart(PRODUCT_ACTIONS.increment, newProduct.id);
      return;
    }

    this.cart.push(newProduct);

    const li = this.createLi(newProduct);
    this.productsList.append(li);
    this.cartStatus.after(this.productsList);
    this.cartStatus.textContent = "Ваша корзина: ";
  }

  decrementProduct(productId) {
    const index = this.getProductIndex(productId);
    this.cart[index].count--;

    if (this.cart[index].count < 1) {
      this.removeProduct(productId);
    }

    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (+item.id === productId) {
        item.replaceWith(this.createLi(this.cart[index]));
      }
    });
  }

  incrementProduct(productId) {
    const index = this.getProductIndex(productId);
    this.cart[index].count++;

    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (+item.id === productId) {
        item.replaceWith(this.createLi(this.cart[index]));
      }
    });
  }

  removeProduct(productId) {
    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (+item.id === productId) {
        item.remove();
      }
    });
    this.cart = this.cart.filter((item) => !(item.id === productId));
  }

  rerenderCart(action, productId) {
    if (action === PRODUCT_ACTIONS.add) {
      this.addProduct(productId);
    }
    if (action === PRODUCT_ACTIONS.remove) {
      this.removeProduct(productId);
    }
    if (action === PRODUCT_ACTIONS.increment) {
      this.incrementProduct(productId);
    }

    if (action === PRODUCT_ACTIONS.decrement) {
      this.decrementProduct(productId);
    }

    const totalCartPrice = document.querySelector("#totalCartPrice");

    if (this.cart.length) {
      totalCartPrice.textContent = `Общая стоимость: ${this.getTotalPrice()}р`;
    } else {
      this.cartStatus.textContent = "Ваша корзина пуста";
      totalCartPrice.textContent = "";
    }
  }
}

const cart = new Order();
