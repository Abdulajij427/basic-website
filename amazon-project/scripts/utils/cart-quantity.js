// updateCartQuantity is a fuction to calculate cart Quantity 
import {cart} from '../../data/cart.js';

import {saveToStorage} from '../../data/cart.js'

export function updateCartQuantity(){
       let cartQuantity = 0;

      cart.forEach((cartItem) =>{
        cartQuantity += cartItem.quantity ;
       
       
      });
       return cartQuantity;
      }

export function updateQuantity(productId, newQuantity){
    let matchingProductId;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingProductId = cartItem;
        }
    });
    if(matchingProductId){
        matchingProductId += newQuantity;
    }
}  
 
 

export function updateDeliveryOption(productId, deliveryOptionId) {
    // steps
    // step 1 = Loop through the cart and find product
    // step 2 = Update the deliveryOptionId of the product
    let matchingProductId;
    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId){
            matchingProductId = cartItem;
        }
    });

    matchingProductId.deliveryOptionId = deliveryOptionId;
    saveToStorage();

    
}