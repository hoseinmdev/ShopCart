const cartIcon = document.getElementById("cart-icon");
const totalPriceP = document.getElementById("total-price");
const confirmBtn = document.querySelector(".cart-btn-confirm");
const clearBtn = document.querySelector(".cart-btn-claer");
const modal = document.querySelector(".modal-block");
const cartDOM = document.querySelector(".products-block");
const backDrop = document.querySelector(".backdrop");
const productsDOM = document.querySelector(".carts-block");
const counter = document.querySelector(".counter");
import { productsData } from "./products.js";

class Products {
  getProducts() {
    return productsData;
  }
}
class UI {
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
  // this method just get delProduct button listeners id , then send id's for delProduct method
  deleteProductBtnListener() {
    const delProductBtn = document.querySelectorAll(".fa-trash-alt");
    const delProductBtns = [...delProductBtn];
    delProductBtns.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.delProduct(e.target.dataset.id)
      );
    });
  }
  // this method just get addToCart button listener id , then send id's for AddToCart method
  addToCartBtnListener() {
    const button = document.querySelectorAll(".cart-btn");
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
      result += `<div class="cart-block">
        <img class="image-style" src=${item.imageURL} alt="product-1" />
        <span>${item.title}</span>
        <button class="cart-btn" data-id=${item.id} ${
        item.inCart ? `disabled` : ""
      }>${item.inCart ? `در سبد خرید` : `افزودن به سبد خرید`}</button>
        <span>${item.price.toLocaleString("en")} تومان</span>
      </div>`;
      productMaker.innerHTML = result;
      productsDOM.appendChild(productMaker);
    });
    this.addToCartBtnListener();
  }
  showCart(cart) {
    cartDOM.innerHTML = "";
    cart.forEach((item) => {
      const productMaker = document.createElement("div");
      let result = "";
      result += `
      <div>
        <i class="far fa-trash-alt" data-id=${item.id}></i>
        <span>
          <i class="fa-solid fa-plus" data-id=${item.id}></i>
          <p>${item.quantity}</p>
          <i class="fa-solid fa-minus" data-id=${item.id}></i>
        </span>
        <span>
          <p>${item.title}</p>
          <p>${item.price.toLocaleString("en")} تومان</p>
        </span>
      </div>
      </div>
        <img class="image-styles" src=${item.imageURL} alt="product-1" />
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
    this.reloadDom();
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
}
class Storage {
  static saveProducts(productsData) {
    let products = localStorage.setItem(
      "products",
      JSON.stringify(productsData)
    );
  }
  // Products
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
  // Cart
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

function digits(number) {
  console.log(number.toLocaleString("en"));
}
function showModal() {
  modal.classList.toggle("showModal");
  backDrop.classList.toggle("showBackdrop");
}
function closeModal() {
  modal.classList.remove("showModal");
  backDrop.classList.remove("showBackdrop");
}
digits(123454646567);
cartIcon.addEventListener("click", showModal);
confirmBtn.addEventListener("click", closeModal);
backDrop.addEventListener("click", closeModal);
