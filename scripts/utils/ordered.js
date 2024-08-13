import { ordered ,removeOrderProduct } from "../order.js";
import { cartQuantity } from "../../data/cart.js";
import {displayData} from "../../data/products.js";

displayData(()=>{
    ordered();
});
let quantity=cartQuantity();
document.querySelector('.cart-quantity').innerHTML=quantity;

document.querySelector('.reset').addEventListener("click",()=>{
removeOrderProduct();
})
