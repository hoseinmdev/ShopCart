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
  // this method just get listeners id , then send id's for AddToCart method
  addToCartBtnListener() {
    const button = document.querySelectorAll(".cart-btn");
    const buttons = [...button];
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.addToCart(e.target.dataset.id));
    });
  }
  showProducts(productsData) {
    productsDOM.innerHTML = "";
    productsData.forEach((item) => {
      let result = "";
      const productMaker = document.createElement("div");
      result += `<div class="cart-block">
        <img src=${item.imageURL} alt="product-1" />
        <div class="cart-block-price">
          <span>${item.title}</span>
          <span>${item.price}</span>
        </div>
        <button class="cart-btn" data-id=${item.id} ${item.inCart ? `disabled` : ""}>${
        item.inCart ? `is in cart` : `Add to cart`
      }</button>
      </div>`;
      productMaker.innerHTML = result;
      productsDOM.appendChild(productMaker);
    });
    this.addToCartBtnListener();
  }
  showCart(cart) {
    cartDOM.innerHTML = ''
    cart.forEach((item) => {
      const productMaker = document.createElement("div");
      let result = "";
      result += `<i class="far fa-trash-alt" data-id=${item.id}></i>
            <span>
              <i class="fa-solid fa-plus" data-id=${item.id}></i>
              <p>1</p>
              <i class="fa-solid fa-minus" data-id=${item.id}></i>
            </span>
            <span>
              <p>${item.title}</p>
              <p>$${item.price}</p>
            </span>
            <img src=${item.imageURL} alt="product-1" />`;
      productMaker.innerHTML = result;
      cartDOM.appendChild(productMaker);
      // TOTAL PRICE
      let price = (totalPriceP.innerText = 0);
      cart.forEach((item) => {
        price += item.price;
        totalPriceP.innerText = "Total price is : $" + price;
      });
    });
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
  static clearCart(){
    const products = this.getProducts()
    const newProducts = products.map(item => {
      delete item.inCart
      delete item.quantity
      return item
    })
    this.setProducts(newProducts)
    this.setCart([])
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
  const ui = new UI();
  Storage.setProducts(productsData);
  ui.showProducts(productsData);

  clearBtn.addEventListener("click" , ()=>{
    Storage.clearCart()
    cartDOM.innerHTML = ""
    // ui.showProducts(Storage.getProducts())
    closeModal()
    ui.reloadDom()
    counter.innerText = Storage.getCart().length
    totalPriceP.innerText = ""
  })
  
  const cartData = Storage.getCart()
    ? Storage.getCart()
    : localStorage.setItem("cart", JSON.stringify([]));
  ui.showCart(cartData);
  counter.innerText = Storage.getCart().length;
});

function showModal() {
  modal.classList.toggle("showModal");
  backDrop.classList.toggle("showBackdrop");
}
function closeModal() {
  modal.classList.remove("showModal");
  backDrop.classList.remove("showBackdrop");
}

cartIcon.addEventListener("click", showModal);
confirmBtn.addEventListener("click", closeModal);
backDrop.addEventListener("click", closeModal);
