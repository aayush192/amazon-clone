
export let cart = [
];
function saveToStorage(){
  localStorage.setItem('cartitem',JSON.stringify(cart));
  }
export function emptyCart(){
  cart=[];
  saveToStorage();
}
export function addToCart(productId) {
  let matchingItem;  
  cart.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      matchingItem = cartitem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
    
  } 
  else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId:'1'
    });
    
  }

  saveToStorage();
 
}

const cartElement = JSON.parse(localStorage.getItem('cartitem')) || [];
if (Array.isArray(cartElement) && cartElement.length > 0) {
    cart = cartElement;
} 
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToStorage();
}
export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      matchingItem = cartitem;
    }
    
  });
  matchingItem.deliveryOptionId=deliveryOptionId;
 saveToStorage();
}
export function cartQuantity(){
  let productQuantity=0;
  cart.forEach((product)=>{
    productQuantity+=product.quantity;
  });
  return productQuantity;
}