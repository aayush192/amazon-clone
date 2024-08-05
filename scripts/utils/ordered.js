import { ordered ,removeOrderProduct } from "../order.js";
import { cartQuantity } from "../../data/cart.js";
let html='';
html=ordered();
let quantity=cartQuantity();
document.querySelector('.cart-quantity').innerHTML=quantity;
document.querySelector('.orders-grid-js').innerHTML=html;
document.querySelector('.reset').addEventListener("click",()=>{
removeOrderProduct();
})
