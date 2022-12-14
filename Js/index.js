const cartIcon = document.getElementById("cart-icon");
const totalPriceP = document.getElementById("total-price");
const confirmBtn = document.querySelector(".cart-btn-confirm");
const clearBtn = document.querySelector(".cart-btn-claer");
const modal = document.querySelector(".cart-block");
const cartDOM = document.querySelector(".cart-products-block");
const backDrop = document.querySelector(".backdrop");
const productsDOM = document.querySelector(".products-block");
const productBlock = document.querySelector(".product-block");
const counter = document.querySelector(".counter");
const notification = document.querySelector(".notification");
const addToCartNotification = document.querySelector(".addToCart-notification");
const cartClearedNotification = document.querySelector(
  ".cartCleared-notification"
);
const sunIcon = document.querySelector(".fa-sun");
const moonIcon = document.querySelector(".fa-moon");
const html = document.querySelector("html");

import { productsData } from "./products.js";

class Products {
  getProducts() {
    return productsData;
  }
}
class UI {
  infoProductBtnListener() {
    const infoBtn = document.querySelectorAll(".fa-circle-info");
    const infoBtns = [...infoBtn];
    infoBtns.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.infoProduct(e.target.dataset.id)
      );
    });
  }
  backInfoProductBtnListener() {
    const backBtn = document.querySelectorAll(".product-back-btn");
    const backBtns = [...backBtn];
    backBtns.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.backInfoProduct(e.target.dataset.id)
      );
    });
  }
  increaseProductBtnListener() {
    const increaseBtn = document.querySelectorAll(".fa-plus");
    const increaseBtns = [...increaseBtn];
    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.increaseProduct(e.target.dataset.id)
      );
    });
  }
  decreaseProductBtnLisrenet() {
    const decreaseBtn = document.querySelectorAll(".fa-minus");
    const decreaseBtns = [...decreaseBtn];
    decreaseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.decreaseProduct(e.target.dataset.id);
      });
    });
  }
  deleteProductBtnListener() {
    const delProductBtn = document.querySelectorAll(".fa-trash-alt");
    const delProductBtns = [...delProductBtn];
    delProductBtns.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.delProduct(e.target.dataset.id)
      );
    });
  }
  addToCartBtnListener() {
    const button = document.querySelectorAll(".product-btn");
    const buttons = [...button];
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.addToCart(e.target.dataset.id);
      });
    });
  }
  showProducts(productsData) {
    productsDOM.innerHTML = "";
    productsData.forEach((item) => {
      let result = "";
      const productMaker = document.createElement("div");
      result += `
      <div class="flip-card">
        <div class="flip-card-inner" data-id=${item.id}>
          <div class="flip-card-front">
            <div class="product-block">
              <img class="image-style" src=${item.imageURL} alt="product-1" />
              <h4>${item.title}</h4>
              <div>
                <button class=${
                  item.inCart ? "inCart-btn" : "product-btn"
                } data-id=${item.id} ${item.inCart ? `disabled` : ""}>${
        item.inCart ? `???? ?????? ????????` : `???????????? ???? ?????? ????????`
      }</button>
                <i class="fa-solid fa-circle-info" data-id=${item.id}></i>
              </div>
              <h4>${item.price.toLocaleString("en")} ??????????</h4>
            </div>
          </div>
          <div class="flip-card-back">
            <div class="product-info-block">
              <h4>??? ${item.title} ???</h4>
              <hr>
              <div>
                <h3>???????????? :</h3>
                <p>${item.Specifications.ram}</p>
                <p>${item.Specifications.storage}</p>
                <p>${item.Specifications.camera}</p>
                <p>${item.Specifications.battery}</p>
                <p>${item.Specifications.speaker}</p>
                <p>???????? / ${item.price.toLocaleString("en")} ??????????</p>
              </div>
            <div>
              <button class="product-back-btn" data-id=${
                item.id
              }>????????????</button>
            </div>
          </div>
        </div>
      </div>`;
      productMaker.innerHTML = result;
      productsDOM.appendChild(productMaker);
    });
    this.addToCartBtnListener();
    this.infoProductBtnListener();
    this.backInfoProductBtnListener();
  }
  showCart(cart) {
    cartDOM.innerHTML = "";
    cart.forEach((item) => {
      const productMaker = document.createElement("div");
      let result = "";
      result += `
      </div>
        <img class="image-styles" src=${item.imageURL} alt="product-1" />
        <span>
          <p>${item.title}</p>
          <p>${item.price.toLocaleString("en")} ??????????</p>
        </span>
      </div>
      <div>
        <span>
          <i class="fa-solid fa-plus" data-id=${item.id}></i>
          <p>${item.quantity}</p>
          <i class="fa-solid fa-minus" data-id=${item.id}></i>
        </span>
        <i class="far fa-trash-alt" data-id=${item.id}></i>
      </div>`;
      productMaker.innerHTML = result;
      cartDOM.appendChild(productMaker);
      // TOTAL PRICE
      let price = (totalPriceP.innerText = 0);
      cart.forEach((item) => {
        price += item.price * item.quantity;
        totalPriceP.innerText =
          "???????? ???? : " + price.toLocaleString("en") + " ??????????";
      });
    });
    this.deleteProductBtnListener();
    this.decreaseProductBtnLisrenet();
    this.increaseProductBtnListener();
  }
  reloadDom() {
    const products = Storage.getProducts();
    const cart = Storage.getCart();
    this.showProducts(products);
    this.showCart(cart);
  }
  addToCart(e) {
    Storage.addProductToCart(e);
    addToCartNotification.classList.toggle("addToCart-notificationShow");
    setTimeout(
      () =>
        addToCartNotification.classList.remove("addToCart-notificationShow"),
      1500
    );
    const cardInner = document.querySelectorAll(".flip-card-inner");
    const cardInners = [...cardInner];
    cardInners.forEach((item) => {
      if (item.dataset.id === e) {
        item.classList.toggle("scale");
        setTimeout(() => item.classList.remove("scale"), 100);
      }
    });
    cardInners.forEach((item) => item.classList.remove("flip-card-enable"));
    setTimeout(() => this.reloadDom(), 250);
  }
  increaseProduct(e) {
    Storage.increaseProductFromCart(e);
    this.reloadDom();
  }
  decreaseProduct(e) {
    Storage.decreaseProductFromCart(e);
    this.reloadDom();
  }
  delProduct(e) {
    Storage.delProductFromCart(e);
    this.reloadDom();
  }
  infoProduct(id) {
    const cardInner = document.querySelectorAll(".flip-card-inner");
    const cardInners = [...cardInner];
    cardInners.forEach((item) => {
      if (item.dataset.id === id) {
        item.classList.toggle("flip-card-enable");
      }
    });
  }
  backInfoProduct(id) {
    const cardInner = document.querySelectorAll(".flip-card-inner");
    const cardInners = [...cardInner];
    cardInners.forEach((item) => {
      if (item.dataset.id === id) {
        item.classList.remove("flip-card-enable");
      }
    });
  }
}
class Storage {
  static saveProducts(productsData) {
    let products = localStorage.setItem(
      "products",
      JSON.stringify(productsData)
    );
  }
  static setProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static clearCart() {
    const products = this.getProducts();
    const newProducts = products.map((item) => {
      delete item.inCart;
      delete item.quantity;
      return item;
    });
    this.setProducts(newProducts);
    this.setCart([]);
  }
  static addProductToCart(id) {
    const products = Storage.getProducts();
    const cart = Storage.getCart();
    const newProducts = products.map((item) => {
      if (parseInt(item.id) === parseInt(id)) {
        item.inCart = true;
        item.quantity = 1;
        cart.push(item);
        counter.innerText = cart.length;
      }
      return item;
    });
    this.setProducts(newProducts);
    this.setCart(cart);
  }
  static getProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    return products;
  }
  static increaseProductFromCart(id) {
    const cart = this.getCart();
    const newCart = cart.map((item) => {
      if (parseInt(item.id) === parseInt(id)) {
        item.quantity++;
      }
      return item;
    });
    Storage.setCart(newCart);
  }
  static decreaseProductFromCart(id) {
    const cart = Storage.getCart();
    let shoudDelete = false;
    const newCart = cart.map((item) => {
      if (parseInt(item.id) === parseInt(id)) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          shoudDelete = true;
        }
      }
      return item;
    });
    Storage.setCart(newCart);
    if (shoudDelete) Storage.delProductFromCart(id);
  }
  static delProductFromCart(id) {
    const products = Storage.getProducts();
    const cart = Storage.getCart();
    const newProducts = products.map((item) => {
      if (parseInt(item.id) === parseInt(id)) {
        delete item.inCart;
        delete item.quantity;
      }
      return item;
    });
    const newCart = cart.filter((item) => {
      return parseInt(item.id) !== parseInt(id);
    });
    Storage.setProducts(newProducts);
    Storage.setCart(newCart);
    totalPriceP.innerText = "";
    counter.innerText = Storage.getCart().length;
    if (Storage.getCart().length === 0) {
      closeModal();
    }
  }
  static setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = Storage.getProducts()
    ? Storage.getProducts()
    : products.getProducts();
  Storage.setProducts(productsData);
  const ui = new UI();

  clearBtn.addEventListener("click", () => {
    Storage.clearCart();
    cartDOM.innerHTML = "";
    counter.innerText = Storage.getCart().length;
    totalPriceP.innerText = "";
    ui.reloadDom();
    closeModal();
    cartClearedNotification.classList.toggle("cartCleared-notificationShow");
    setTimeout(
      () =>
        cartClearedNotification.classList.remove(
          "cartCleared-notificationShow"
        ),
      2000
    );
  });
  ui.showProducts(productsData);
  const cartData = Storage.getCart() ? Storage.getCart() : Storage.setCart([]);
  ui.showCart(cartData);
  counter.innerText = Storage.getCart().length;
});

function showCart() {
  const cart = Storage.getCart();
  if (cart.length !== 0) {
    modal.classList.toggle("showCart");
    backDrop.classList.toggle("showBackdrop");
    const cardInner = document.querySelectorAll(".flip-card-inner");
    const cardInners = [...cardInner];
    cardInners.forEach((item) => item.classList.remove("flip-card-enable"));
  } else {
    notification.classList.toggle("notificationShow");
    setTimeout(() => notification.classList.remove("notificationShow"), 2000);
  }
}
function closeModal() {
  modal.classList.remove("showCart");
  backDrop.classList.remove("showBackdrop");
}
function changeModeToLight() {
  html.classList.toggle("lightMode");
  moonIcon.classList.toggle("fa-moon-hide");
  sunIcon.classList.toggle("fa-sun-show");
  html.classList.toggle("blur");
  setTimeout(() => html.classList.remove("blur"), 150);
}
function changeModeToDark() {
  html.classList.remove("lightMode");
  moonIcon.classList.remove("fa-moon-hide");
  sunIcon.classList.remove("fa-sun-show");
  html.classList.toggle("blur");
  setTimeout(() => html.classList.remove("blur"), 150);
}

cartIcon.addEventListener("click", showCart);
confirmBtn.addEventListener("click", closeModal);
backDrop.addEventListener("click", closeModal);
moonIcon.addEventListener("click", changeModeToLight);
sunIcon.addEventListener("click", changeModeToDark);
