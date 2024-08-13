import { ordered ,removeOrderProduct } from "../order.js";
import { cartQuantity } from "../../data/cart.js";
import { loadFromBackend} from "../../data/products.js";

loadFromBackend(ordered);
let quantity=cartQuantity();
document.querySelector('.cart-quantity').innerHTML=quantity;

document.querySelector('.reset').addEventListener("click",()=>{
removeOrderProduct();
})
