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
  showProducts(productsData) {
    Storage.saveProducts(productsData);
    productsData.forEach((item) => {
      let result = "";
      const productMaker = document.createElement("div");
      result += `<div class="cart-block">
        <img src=${item.imageURL} alt="product-1" />
        <div class="cart-block-price">
          <span>${item.title}</span>
          <span>${item.price}</span>
        </div>
        <button class="cart-btn" data-id=${item.id}>${
        item.inCart ? `is in cart` : `add to cart`
      }</button>
      </div>`;
      productMaker.innerHTML = result;
      productsDOM.appendChild(productMaker);
    });
  }
  showCart(cart) {
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
  addToCartButton() {
    const productsData = JSON.parse(localStorage.getItem("products"));
    const button = document.querySelectorAll(".cart-btn");
    const buttonArray = [...button];

    buttonArray.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        const selectedCart = productsData.find(
          (item) => JSON.parse(item.id) === JSON.parse(id)
        );
        selectedCart.inCart = true;
        selectedCart.quantity = 1;
        const filterProduct = productsData.filter((item) => {
          item.id === selectedCart.id;
          return item;
        });
        btn.innerText = selectedCart ? "is in cart" : "Add to cart";
        localStorage.setItem("products", JSON.stringify(filterProduct));
        Storage.cart(Storage.getProducts());
        btn.disabled = true;
        cartDOM.innerHTML = "";
        counter.innerText = Storage.getCart().length;
        this.showCart(Storage.getCart());
      });
    });
  }
  clearCart(products) {
    clearBtn.addEventListener("click", () => {
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("cart", JSON.stringify([]));
      const button = document.querySelectorAll(".cart-btn");
      const buttonArray = [...button];
      buttonArray.forEach(item => ()=>{
        item.innerText = "Add to cart"
        item.disabled = false
      })
      cartDOM.innerHTML = "";
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
  static getProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    return products;
  }
  static cart(products) {
    let filterCart = products.filter((item) => {
      if (item.inCart === true) return item;
    });
    const cart = localStorage.setItem("cart", JSON.stringify(filterCart));
    return cart;
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
  ui.showProducts(productsData);
  ui.addToCartButton(Storage.getCart());
  const cartData = Storage.getCart()
    ? Storage.getCart()
    : localStorage.setItem("cart", JSON.stringify([]));
  ui.showCart(cartData);
  ui.clearCart(products.getProducts());
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
