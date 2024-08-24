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
    this.cart = new Map();
    this.cartStatus = document.querySelector("#cartStatus");
    this.productList = document.querySelector("#productList");
    this.actions = new Map([
      [PRODUCT_ACTIONS.add, this.addProduct],
      [PRODUCT_ACTIONS.decrement, this.decrementProduct],
      [PRODUCT_ACTIONS.increment, this.incrementProduct],
      [PRODUCT_ACTIONS.remove, this.removeProduct],
    ]);

    const toCartButton = document.querySelector("#toCartButton");

    const selectFormChoiceProduct = document.querySelector(
      "#selectFormChoiceProduct"
    );

    const debouncedAddToCart = debounce(
      () =>
        this.rerenderCart(PRODUCT_ACTIONS.add, +selectFormChoiceProduct.value),
      400
    );

    toCartButton.addEventListener("click", debouncedAddToCart);
    toCartButton.addEventListener(
      "unload",
      () => toCartButton.removeEventListener("click", debouncedAddToCart),
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

    const buttonContainer = new CreateElement({ tag: "div" });

    const removeButton = new CreateElement({
      tag: "button",
      textContent: "Удалить",
    });
    removeButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.remove, product.id)
    );

    const incrementButton = new CreateElement({
      tag: "button",
      textContent: "Увеличить",
    });
    incrementButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.increment, product.id)
    );

    const decrementButton = new CreateElement({
      tag: "button",
      textContent: "Уменьшить",
    });
    decrementButton.addEventListener("click", () =>
      this.rerenderCart(PRODUCT_ACTIONS.decrement, product.id)
    );
    buttonContainer.append(incrementButton, decrementButton, removeButton);

    li.append(buttonContainer);

    return li;
  }

  getTotalPrice() {
    return [...this.cart].reduce((acc, item) => {
      const itemPrice = item[1].price * item[1].count;

      return (acc += itemPrice);
    }, 0);
  }

  addProduct(optionId) {
    const product = PRODUCTS.find((product) => product.id === optionId);

    const newProduct = {
      ...product,
      count: 1,
    };

    if (this.cart.has(optionId)) {
      this.rerenderCart(PRODUCT_ACTIONS.increment, newProduct.id);
      return;
    }

    this.cart.set(optionId, newProduct);
    const li = this.createLi(newProduct);

    this.productList.append(li);
    this.cartStatus.after(this.productList);
    this.cartStatus.textContent = "Ваша корзина: ";
  }

  decrementProduct(productId) {
    this.cart.set(productId, {
      ...this.cart.get(productId),
      count: this.cart.get(productId).count - 1,
    });

    if (this.cart.get(productId).count < 1) {
      this.removeProduct(productId);
    }

    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (+item.id === productId) {
        item.replaceWith(this.createLi(this.cart.get(productId)));
      }
    });
  }

  incrementProduct(productId) {
    this.cart.set(productId, {
      ...this.cart.get(productId),
      count: this.cart.get(productId).count + 1,
    });

    const products = document.querySelectorAll("li");
    [...products].map((item) => {
      if (+item.id === productId) {
        item.replaceWith(this.createLi(this.cart.get(productId)));
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
    this.cart.delete(productId);
  }

  rerenderCart(action, productId) {
    this.actions.get(action).call(this, productId);

    const totalCartPrice = document.querySelector("#totalCartPrice");

    if (this.cart.size) {
      totalCartPrice.textContent = `Общая стоимость: ${this.getTotalPrice()}р`;
    } else {
      this.cartStatus.textContent = "Ваша корзина пуста";
      totalCartPrice.textContent = "";
    }
  }
}

const cart = new Order();
