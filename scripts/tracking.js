import { loadProductFetch, products } from "../data/products.js";
const url=new URL(window.location.href);
const productId=url.searchParams.get('orderId');
const quantity=url.searchParams.get('productno');
const date=url.searchParams.get('date');
let html;
await loadProductFetch();
products.forEach((product)=>{
if(product.id===productId){

 html=` <a class="back-to-orders-link link-primary" href="orders.html">
View all orders
</a>

<div class="delivery-date">
Arriving on ${date}
</div>

<div class="product-info">
${product.name}
</div>

<div class="product-info">
Quantity: ${quantity}
</div>

<img class="product-image" src="${product.image}">

<div class="progress-labels-container">
<div class="progress-label">
  Preparing
</div>
<div class="progress-label current-status">
  Shipped
</div>
<div class="progress-label">
  Delivered
</div>
</div>

<div class="progress-bar-container">
<div class="progress-bar"></div>
</div>`;

return;
}
})

document.querySelector('.order-tracking').innerHTML=html;