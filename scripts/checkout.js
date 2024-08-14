import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import'../data/cart-class.js';
// import '../data/backend-practice.js';

/* Promise.all([
new Promise((resolve)=>{
    loadFromBackend(()=>{
        resolve();
    })
}),
new Promise((resolve)=>{
loadCart(()=>{
    resolve();
})
})

]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})
 */

loadProductFetch().then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});


/*  new Promise((resolve)=>{
    console.log('start');
loadFromBackend(()=>{
    console.log('finished loading');
    resolve('value1');
}); 

}).then((value)=>{

    console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
        resolve();
    })
  })

}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  }) */



/* loadFromBackend(()=>{
    loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
 })
}) */
// displayData(()=>{
// // renderOrderSummary();
// renderPaymentSummary();
// })