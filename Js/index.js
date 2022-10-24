const cartIcon = document.getElementById("cart-icon");
const totalPriceP = document.getElementById("total-price");
const confirmBtn = document.querySelector(".cart-btn-confirm");
const clearBtn = document.querySelector(".cart-btn-claer");
const modal = document.querySelector(".cart-block");
const cartDOM = document.querySelector(".cart-products-block");
const backDrop = document.querySelector(".backdrop");
const productsDOM = document.querySelector(".products-block");
const counter = document.querySelector(".counter");
const notification = document.querySelector(".notification");
const addToCartNotification = document.querySelector(".addToCart-notification");
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
              <span>${item.title}</span>
              <div>
                <button class=${
                  item.inCart ? "inCart-btn" : "product-btn"
                } data-id=${item.id} ${item.inCart ? `disabled` : ""}>${
        item.inCart ? `در سبد خرید` : `افزودن به سبد خرید`
      }</button>
                <i class="fa-solid fa-circle-info" data-id=${item.id}></i>
              </div>
              <span>${item.price.toLocaleString("en")} تومان</span>
            </div>
          </div>
          <div class="flip-card-back">
            <div class="product-info-block">
              <h4>⌯ ${item.title} ⌯</h4>
              <hr>
              <div>
                <h3>مشخصات :</h3>
                <p>${item.Specifications.ram}</p>
                <p>${item.Specifications.storage}</p>
                <p>${item.Specifications.camera}</p>
                <p>${item.Specifications.battery}</p>
                <p>${item.Specifications.speaker}</p>
                <p>قیمت / ${item.price.toLocaleString("en")} تومان</p>
              </div>
            <div>
              <button class="product-back-btn" data-id=${
                item.id
              }>بازگشت</button>
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
          <p>${item.price.toLocaleString("en")} تومان</p>
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
          "قیمت کل : " + price.toLocaleString("en") + " تومان";
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
    closeModal();
    counter.innerText = Storage.getCart().length;
    totalPriceP.innerText = "";
    ui.reloadDom();
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
cartIcon.addEventListener("click", showCart);
confirmBtn.addEventListener("click", closeModal);
backDrop.addEventListener("click", closeModal);
