    
    function Cart(localStorageKey){
        const cart={
            cartItems:[],
            loadFromStorage(){
                const cartElement = JSON.parse(localStorage.getItem(localStorageKey)) || [];
                if (Array.isArray(cartElement) && cartElement.length > 0) {
                this.cartItems = cartElement;
             } 
             },
            saveToStorage(){
             localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
            },
            emptyCart(){
          this.cartitem=[];
          this.saveToStorage();
          },
          addToCart(productId) {
            let matchingItem;  
            this.cartItems.forEach((cartitem) => {
              if (productId === cartitem.productId) {
                matchingItem = cartitem;
              }
            }); 
            if (matchingItem) {
              matchingItem.quantity += 1;
              
            } 
            else {
              this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId:'1'
              });
              
            }
          
            this.saveToStorage();
           
          },
       removeFromCart(productId) {
            const newCart = [];
            this.cartItems.forEach((item) => {
              if (item.productId !== productId) {
                newCart.push(item);
              }
            });
            this.cartItems = newCart;
            this.saveToStorage();
          },
          updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem;
            this.cartItems.forEach((cartitem) => {
              if (productId === cartitem.productId) {
                matchingItem = cartitem;
              }
              
            });
            matchingItem.deliveryOptionId=deliveryOptionId;
           this.saveToStorage();
          },
          cartQuantity(){
            let productQuantity=0;
            this.cartItems  .forEach((product)=>{
              productQuantity+=product.quantity;
            });
            return productQuantity;
          }
    
        };
        return cart;
    }
   
 

const cart=Cart("cart-oop");
const businessCart=Cart("cart-business");


console.log(cart);
console.log(businessCart);


