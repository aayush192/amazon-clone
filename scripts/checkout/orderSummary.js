import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { currency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions,getDeliveryOption} from "../../data/deliveryoptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
const today = dayjs();
const deliveryDay = today.format("dddd, MMMM D");

export function renderOrderSummary(){
 
let cartHTML = " ";
cart.forEach((cartItem) => {  
  const productId = cartItem.productId;
  const matchingItem=getProduct(productId);

  const deliveryOptionId = cartItem.deliveryOptionId;
 const deliveryOption=getDeliveryOption(deliveryOptionId);
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays , "days");
  const dateString = deliveryDate.format(`dddd, MMMM D`);

  cartHTML += `
<div class='cart-item-container 
js-cart-item-${matchingItem.id}'>
 <div class="delivery-date"
 data-js-cart-id='${matchingItem.id}'>
  Delivery date: ${dateString}
 </div>

 <div class="cart-item-details-grid">
  <img class="product-image"
    src=${matchingItem.image} loading="lazy">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingItem.name}
    </div>
    <div class="product-price">
      $${(matchingItem.getPrice()*cartItem.quantity).toFixed(2)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-link"
      data-product-id="${matchingItem.id}">
        Delete
      </span>
      <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    ${deliveryOptionsHTML(matchingItem, cartItem)}
    
  </div>
    </div>
  </div>

  
</div>
</div>`;
});
document.querySelector(".order-summary").innerHTML = cartHTML;

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
   
    const dateString = deliveryDayDate(deliveryOption.deliveryDays);

    const priceString =
  deliveryOption.priceCents === 0
        ? "FREE"
        : `$${currency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `
    <div class="delivery-option js-delivery-date"
    data-product-id='${matchingProduct.id}'
     data-delivery-option-id='${deliveryOption.id}'
     data-delivery-date='${dateString}'>
      <input type="radio" 
      ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping   
          </div>
      </div>
      </div>
  `;
  });
  return html;
}



document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    console.log(productId);
    removeFromCart(productId);

    let container = document.querySelector(`.js-cart-item-${productId}`);
    console.log(container);
    container.remove();
    renderPaymentSummary();
  });
});

document.querySelectorAll(".js-delivery-date").forEach((radio) => {
  radio.addEventListener("click", () => {
    const { productId, deliveryOptionId ,deliveryDate} = radio.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});
}

export function deliveryDayDate(deliveryDays){
  const today = dayjs();
    const deliveryDate = today.add(deliveryDays, "days");
    const dateString = deliveryDate.format(`dddd, MMMM D`);
    return dateString;
}


