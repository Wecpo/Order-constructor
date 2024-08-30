import { CreateElement } from "../src/utils/сreateElement.js";
import { debounce } from "../src/utils/debounce.js";
import { PRODUCTS } from "../src/initForm.js";

const PRODUCT_ACTIONS = {
  add: "ADD",
  increment: "INCREMENT",
  decrement: "DECREMENT",
  remove: "REMOVE",
};

export default class Order {
  constructor() {
    this.cart = new Map();

    this.actions = new Map([
      [PRODUCT_ACTIONS.add, this.addProduct],
      [PRODUCT_ACTIONS.decrement, this.decrementProduct],
      [PRODUCT_ACTIONS.increment, this.incrementProduct],
      [PRODUCT_ACTIONS.remove, this.removeProduct],
    ]);

    this.cartStatus = document.querySelector("#cartStatus");
    this.productList = document.querySelector("#productList");

    const toCartButton = document.querySelector("#toCartButton");

    const productFormSelect = document.querySelector("#productFormSelect");

    const debouncedAddToCart = debounce(
      () =>
        this.rerenderCart(
          PRODUCT_ACTIONS.add,
          productFormSelect.options[productFormSelect.selectedIndex].id
        ),
      200
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
      className: "productLi",
    });

    const productInfo = new CreateElement({
      tag: "span",
      textContent: `${product.name} - ${product.price}р`,
      className: "productInfo",
    });

    const productCount = new CreateElement({
      tag: "span",
      textContent: `${product.count} шт.`,
      className: "productCount",
    });

    const removeButton = new CreateElement({
      tag: "button",
      textContent: "Удалить",
      className: "removeButton",
    });

    this.debouncedRemoveProduct = debounce(
      () => this.rerenderCart(PRODUCT_ACTIONS.remove, product.id),
      200
    );

    removeButton.addEventListener("click", this.debouncedRemoveProduct);

    const incrementButton = new CreateElement({
      tag: "button",
      textContent: "+",
      className: "incrementButton",
    });

    this.debouncedIncrementProduct = debounce(
      () => this.rerenderCart(PRODUCT_ACTIONS.increment, product.id),
      200
    );
    incrementButton.addEventListener("click", this.debouncedIncrementProduct);

    const decrementButton = new CreateElement({
      tag: "button",
      textContent: "-",
      className: "decrementButton",
    });

    this.debouncedDecrementProduct = debounce(
      () => this.rerenderCart(PRODUCT_ACTIONS.decrement, product.id),
      200
    );

    decrementButton.addEventListener("click", this.debouncedDecrementProduct);

    const buttonContainer = new CreateElement({
      tag: "div",
      className: "productButtonContainer",
    });

    buttonContainer.append(
      incrementButton,
      productCount,
      decrementButton,
      removeButton
    );

    li.append(productInfo, buttonContainer);

    return li;
  }

  getTotalPrice() {
    return Array.from(this.cart).reduce((acc, item) => {
      const itemPrice = item[1].price * item[1].count;

      return (acc += itemPrice);
    }, 0);
  }

  addProduct(optionId) {
    const product = PRODUCTS.find((product) => product.id === optionId);

    if (!product) {
      const error = new CreateElement({
        tag: "div",
        className: "addProductError",
        textContent: "Такого продукта не существует",
      });

      this.cartStatus.after(error);
      return;
    }

    if (this.cart.has(optionId)) {
      this.rerenderCart(PRODUCT_ACTIONS.increment, product.id);
      return;
    }

    const newProduct = {
      ...product,
      count: 1,
    };

    this.cart.set(optionId, newProduct);
    const li = this.createLi(newProduct);

    this.productList.append(li);
    this.cartStatus.after(this.productList);
    this.cartStatus.textContent = "Ваша корзина: ";
  }

  decrementProduct(productId) {
    this.cart.get(productId).count--

    if (this.cart.get(productId).count < 1) {
      this.removeProduct(productId);
    }

    const products = document.querySelectorAll(".productLi");
    products.forEach((item) => {
      if (item.id === productId) {
        item.querySelector(".productCount").textContent = `${
          this.cart.get(productId).count
        } шт.`;
      }
    });
  }

  incrementProduct(productId) { 
    this.cart.get(productId).count++

    const products = document.querySelectorAll(".productLi");
    products.forEach((item) => {
      if (item.id === productId) {
        item.querySelector(".productCount").textContent = `${
          this.cart.get(productId).count
        } шт.`;
      }
    });
  }

  removeProduct(productId) {
    const products = document.querySelectorAll(".productLi");
    products.forEach((item) => {
      if (item.id === productId) {
        item
          .querySelector(".decrementButton")
          .removeEventListener("click", this.debouncedDecrementProduct);

        item
          .querySelector(`.incrementButton`)
          .removeEventListener("click", this.debouncedIncrementProduct);

        item
          .querySelector(`.removeButton`)
          .removeEventListener("click", this.debouncedRemoveProduct);

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
      return;
    }

    this.cartStatus.textContent = "Ваша корзина пуста";
    totalCartPrice.textContent = "";
  }
}
