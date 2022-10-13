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
  addToCartButton(cart) {
    // let cartStorage = localStorage.
    const button = document.querySelectorAll(".cart-btn");
    const buttonArray = [...button];
    buttonArray.forEach((btn) => {
      const id = btn.dataset.id
      btn.addEventListener("click", () => {
        cart.push(id)
        console.log(cart)
        btn.innerText = "- IS IN CART -";
        btn.disabled = true;
        counter.innerText = cart.length
        localStorage.setItem("cart" , cart)
        // Storage.addProductToCart(id);
      });
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
    return products
  }
  static cart() {
    let cart = localStorage.setItem("cart", JSON.stringify([]));
    return cart
  }
  static getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"))
    return cart
  }
  // static addProductToCart(id) {
  //   const cart = JSON.parse(localStorage.getItem("cart"));
  //   cart.push(id)
  //   console.log(cart)
  // }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  const showProducts = ui.showProducts(productsData);
  Storage.getProducts();
  Storage.cart(productsData);
  Storage.getCart();
  ui.addToCartButton(JSON.parse(localStorage.getItem("cart")));
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
