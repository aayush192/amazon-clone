import { ordered ,removeOrderProduct } from "../order.js";
import { cartQuantity } from "../../data/cart.js";
import {loadProductFetch} from "../../data/products.js";

await loadProductFetch();
    ordered();

let quantity=cartQuantity();
document.querySelector('.cart-quantity').innerHTML=quantity;

document.querySelector('.reset').addEventListener("click",()=>{
removeOrderProduct();
})
