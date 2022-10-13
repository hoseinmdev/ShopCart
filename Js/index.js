const cartIcon = document.getElementById("cart-icon");
const totalPriceP = document.getElementById("total-price");
const confirmBtn = document.querySelector(".cart-btn-confirm");
const clearBtn = document.querySelector(".cart-btn-claer");
const modal = document.querySelector(".modal-block");
const modalBlocks = document.querySelector(".product-blocks");
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
        <button class="cart-btn" data-id=${item.id}>Add to cart</button>
      </div>`;
      productMaker.innerHTML = result;
      productsDOM.appendChild(productMaker);
    });
  }
  addToCartButton() {
    const button = document.querySelectorAll(".cart-btn");
    const buttonArray = [...button];
    buttonArray.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.innerText = "- IS IN CART -";
        btn.disabled = true;
        Storage.addProductToCart(btn.dataset.id);
      });
    });
  }
}
class Storage {
  static saveProducts(productsData) {
    let savedProducts = localStorage.setItem(
      "products",
      JSON.stringify(productsData)
    );
  }
  static getProducts() {
    let getProducts = localStorage.getItem("products");
  }
  static saveProductsToCart() {
    let savedCart = localStorage.setItem("cart", JSON.stringify([]));
  }
  static getCart() {
    let getCart = localStorage.getItem("cart");
    // console.log(getCart)
  }
  static addProductToCart(products) {
    this.getCart();
    console.log(products);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  const showProducts = ui.showProducts(productsData);
  Storage.getProducts();
  Storage.saveProductsToCart(productsData);
  Storage.getCart();
  ui.addToCartButton();
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
