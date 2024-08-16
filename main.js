import { CreateElement } from "./src/utils/сreateElement.js";
import { debounce } from "./src/utils/debounce.js";

export default class Order {
  constructor() {
    this.cart = [];
    this.cartStatus = document.querySelector("#cartStatus");

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

  _getTotalPrice() {
    return this.cart.reduce((acc, item) => {
      const itemPrice = item.price * item.count;

      return (acc += itemPrice);
    }, 0);
  }

  _getProductIndex(productName) {
    return this.cart.findIndex((item) => item.name === productName);
  }

  productInCartAction(action, productName) {
    const productIndex = this._getProductIndex(productName);

    if (action === "decrement") {
      this.cart[productIndex].count--;
    }

    if (action === "increment") {
      this.cart[productIndex].count++;
    }

    this.renderCart();
  }

  addProductToCart() {
    const selectFormChoiceProduct = document.querySelector(
      "#selectFormChoiceProduct"
    );

    const [productName, productPrice] =
      selectFormChoiceProduct.value.split(" - ");

    const productIndex = this._getProductIndex(productName);
    if (productIndex >= 0) {
      this.productInCartAction("increment", productName);
    } else {
      this.cart.push({
        name: productName,
        price: productPrice,
        count: 1,
      });
    }
    this.cartStatus.textContent = "Ваша корзина: ";
    this.renderCart();
  }

  decrementProductInCart() {
    const productName = event.target.id;

    const product = this.cart.find((product) => product.name === productName);
    if (!product) {
      return console.error("Ошибка, такого продукта не существует!");
    }

    if (product.count === 1) {
      this.removeProductFromCart();
    } else {
      const productIndex = this._getProductIndex(productName);
      if (productIndex < 0) {
        return console.error("Ошибка, такого продукта не существует!");
      }
      this.productInCartAction("decrement", productName);
    }

    this.renderCart();
  }

  removeProductFromCart() {
    const productName = event.target.id;

    this.cart = this.cart.filter((product) => product.name !== productName);

    if (!this.cart.length) {
      this.cartStatus.textContent = "Ваша корзина пуста";
    }

    this.renderCart();
  }

  renderCart() {
    const islistOfProducts = document.querySelector("#listOfProducts");
    islistOfProducts?.remove();

    const liList = [];

    for (let product of this.cart) {
      const productActionContainer = new CreateElement({ tag: "div" });

      const decrementProductButton = new CreateElement({
        tag: "button",
        textContent: "-",
        id: product.name,
        className: "decrementProductButton",
      });
      decrementProductButton.addEventListener("click", (event) =>
        this.decrementProductInCart(event)
      );

      const incrementProductButton = new CreateElement({
        tag: "button",
        textContent: "+",
        id: product.name,
        className: "incrementProductButton",
      });

      incrementProductButton.addEventListener("click", () =>
        this.productInCartAction("increment", product.name)
      );

      const removeProductButton = new CreateElement({
        tag: "button",
        textContent: "Удалить",
        id: product.name,
        className: "removeProductButton",
      });
      removeProductButton.addEventListener("click", (event) =>
        this.removeProductFromCart(event)
      );

      productActionContainer.append(
        decrementProductButton,
        `${product.count} шт.`,
        incrementProductButton,
        removeProductButton
      );

      const li = new CreateElement({
        tag: "li",
        textContent: `${product.name} - ${product.price}  `,
        id: product.name,
      });
      li.append(productActionContainer);
      liList.push(li);
    }

    const listOfProducts = new CreateElement({
      tag: "ol",
      id: "listOfProducts",
    });

    listOfProducts.append(...liList);

    this.cartStatus.after(listOfProducts);

    const totalCartPrice = document.querySelector("#totalCartPrice");
    if (this.cart.length) {
      totalCartPrice.textContent = `Общая стоимость: ${this._getTotalPrice()}р`;
    } else {
      totalCartPrice.textContent = "";
    }
  }
}

const cart = new Order();
