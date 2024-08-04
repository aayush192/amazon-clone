import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryoptions.js";
import { currency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
let cartProduct=[];  
let dateTotal=[];
saveAtStorage();
saveInStorage();
console.log(typeof(dateTotal));
function saveInStorage(){
    localStorage.setItem('orderProduct',JSON.stringify(cartProduct));
}
function saveAtStorage(){
    localStorage.setItem('dateTotal',JSON.stringify(dateTotal));
}
cartProduct=JSON.parse(localStorage.getItem('orderProduct'))||[];

dateTotal=JSON.parse(localStorage.getItem('dateTotal'))||[];
export function dateAmount(date,amount){
    if(dateTotal.length>0){
        dateTotal.forEach((sum)=>{
        if(sum.date===date){
            sum.total+=amount;
        }
        
    });
    }
    else{
dateTotal.push({
    date:date,
    total:amount
})
    }
    saveAtStorage();
}
export function orderProducts(cart) {

    let matchingItem;
    dateTotal.forEach((total)=>{
    cart.forEach((cartItem) => {
        if(cartItem.date===total.date){
        cartProduct.forEach((product)=>{
            if(product.deliveryOptionId===cartItem.deliveryOptionId){
            if(cartItem.productId===product.productId){
            matchingItem=product;
            }
        }
        })
    if(matchingItem){
        matchingItem.quantity+=1;
    }
    else{
        cartProduct.push({
            productId:cartItem.productId,
            deliveryOptionId:cartItem.deliveryOptionId,
            quantity:cartItem.quantity,
            date:cartItem.date,
            total:cartItem.total
        })
    }
}
else{
    cartProduct.push({
        productId:cartItem.productId,
        deliveryOptionId:cartItem.deliveryOptionId,
        quantity:cartItem.quantity,
        date:cartItem.date,
        total:cartItem.total
    })
}
});
});
saveInStorage();
}
export function ordered(){
let html='';
let middlehtml='';
let lowerhtml='';
let totalHTML='';
dateTotal.forEach((sum)=>{
html=`
<div class="order-container">
 <div class="order-header">
<div class="order-header-left-section">
  <div class="order-date">
    <div class="order-header-label">Order Placed:</div>
    <div>${sum.date}</div>
  </div>
  <div class="order-total">
    <div class="order-header-label">Total:</div>
    <div>$${currency(sum.total)}</div>
  </div>
</div>

<div class="order-header-right-section">
  <div class="order-header-label">Order ID:</div>
  <div>27cba69d-4c3d-4098-b42d-ac7fa62b${sum.date}</div>
</div>
</div>
<div class="order-details-grid">`;
cartProduct.forEach((cartItem)=>{
    if(sum.date===cartItem.date){
        products.forEach((product)=>{
            if(product.id===cartItem.productId){
   middlehtml+=` 
        <div class="product-image-container">
          <img src=${product.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${arrivingDate(cartItem.deliveryOptionId)}
          </div>
          <div class="product-quantity">
            Quantity: ${cartItem.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
   }

    })
    }
})
lowerhtml=`</div>
</div>`;
totalHTML+=html+middlehtml+lowerhtml;
middlehtml='';
lowerhtml='';
})
return totalHTML;
}


function arrivingDate(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
       
      }
    });
const today = dayjs();
const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
const dateString = deliveryDate.format(`dddd, MMMM D`);
return dateString;
}



