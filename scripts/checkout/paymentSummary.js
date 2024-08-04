import { cart ,emptyCart} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import { currency ,tax} from "../utils/money.js";
import { renderOrderSummary } from "./orderSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { dateAmount, orderProducts } from "../order.js";
const today = dayjs();
const date = today.format("dddd, MMMM D");
export function renderPaymentSummary() {
let productPriceCents=0;
let shippingCost=0;
let quantity=0;
let subTotal=0;
let taxAmount=0;
let total=0;
let html=``;
  cart.forEach((cartItem) => {
    quantity+=cartItem.quantity;
    const productId = cartItem.productId;
   const product = getProduct(productId);
    productPriceCents+=product.priceCents*cartItem.quantity;
    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
  shippingCost+=deliveryOption.priceCents;
  });
  subTotal=productPriceCents+shippingCost;
 taxAmount=tax(subTotal);
 total=taxAmount+subTotal;
 document.querySelector('.checkout-header-middle-section').innerHTML=`Checkout (<a class="return-to-home-link"
 href="index.html">${quantity} items</a>)`
  html=`<div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${quantity}):</div>
  <div class="payment-summary-money">$${currency(productPriceCents)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${currency(shippingCost)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${currency(subTotal)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${currency(taxAmount)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${currency(total)}</div>
</div>

<button class="place-order-button button-primary">
  Place your order
</button>`;
document.querySelector('.payment-summary').innerHTML=html;
document.querySelector('.button-primary').addEventListener("click",()=>{
  
  let orderedProduct=[];
  cart.forEach((cartItem)=>{
    orderedProduct.push({
      productId:cartItem.productId,
      deliveryOptionId:cartItem.deliveryOptionId,
      quantity:cartItem.quantity,
      date:date
     
    })
  });
 dateAmount(date,total);
  orderProducts(orderedProduct);
  emptyCart();
  renderOrderSummary();
  renderPaymentSummary();
})

}
