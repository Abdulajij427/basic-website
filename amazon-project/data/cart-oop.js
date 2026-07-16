function Cart(localStorageKey) {
  const cart = {
     cartItems : undefined,

     loadFromStorage : function(){
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

        if(!this.cartItems){
                this.cartItems = [{
                productId : 'socks-1',
                quantity :  2,
                deliveryOptionId: '1'
            },{
                productId : 'basketball-1',
                quantity : 1,
                deliveryOptionId : '2' 
            }];
        }
    },

     saveToStorage: function() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

     addToCart : function(productId){
    //   use DOM to get the quantity selector 
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity1 = Number(quantitySelector.value);
    
      let  matchingItem;   
        
        this.cartItems.forEach((cartItem) =>{
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if(matchingItem) {
            matchingItem.quantity += quantity1;
        } else{
           this.cartItems.push({
                productId: productId,
                quantity: quantity1,
                deliveryOptionId : '1'
            }); 
        }

        this.saveToStorage();
    },

     removeFromCart: function(productId){
    const newCart = [];

    this.cartItems.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });


    this.cartItems = newCart ;

    this.saveToStorage();
    },

     updateDeliveryOption: function(productId, deliveryOptionId) {
        // steps
        // step 1 = Loop through the cart and find product
        // step 2 = Update the deliveryOptionId of the product
        let matchingProductId;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === productId){
                matchingProductId = cartItem;
            }
        });
    
        matchingProductId.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    
        
    }
  };

  return cart;
}

// create a function that generates objects 

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);


        
    
        
    








 