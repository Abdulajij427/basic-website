import {cart,removeFromCart} from '../../data/cart.js';
import {products,getProduct} from '../../data/product.js'
import {formatCurrency} from '../utils/money.js';
import {updateCartQuantity,updateQuantity,updateDeliveryOption} from '../utils/cart-quantity.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkOutHeader.js';





export function renderCartSummaryHTML(){
     let cartSummaryHTML = '';


        cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

       
        console.log(matchingProduct);
        
        const deliveryOptionId = cartItem.
        deliveryOptionId;
        
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

        const dateString = deliveryDate.format('dddd, MMMM, D');
       
        
        
        

        cartSummaryHTML += 
        `
            
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id} ">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}"/>
                    <div class="cart-item-details">
                        
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>

                        <div class="product-price">
                            $${formatCurrency(matchingProduct.priceCents)}
                        </div>

                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                            
                                <span class="quantity-label">
                                Quantity: ${cartItem.quantity}
                                </span>

                                <span class="update-quantity-link link-primary 
                                js-update-quantity-link" data-product-id="${matchingProduct.id}">
                                    Update
                                </span>
                                <input class="quantity-input" >
                                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                                    Save
                                    </span>

                                <span class="Delete-quantity-link link-primary
                                js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                                    Delete
                                </span>
                            
                        </div>
                    </div>    
                    
                    <div class="delivery-options ">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>

                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                    
                </div>
            </div>
        `;
    
    document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

        });
            

    // function for delivery options 
    function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    // step 1 loop through deliveryOptions
    deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

        const dateString = deliveryDate.format('dddd, MMMM, D');

        // this is ternary operator in this whatever before the question mark it will display if its true , or false whatever after colon it will display it
        const priceString = deliveryOption.priceCents ===
        0
        ?   'Free'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id ===
        cartItem.deliveryOptionId;

        html += 
        `               
            <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                    ${isChecked ? 'checked' : ''} 
                    class="delivery-option-input" name="delivery-option-${matchingProduct.id}"/>

                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>

                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>    
            </div> 

        `
    });    
    // for each option, generate some HTML
    // combine the HTML together 
    return html; 



    }



    const cartQuantity = updateCartQuantity();
    document.querySelector('.js-checkout-item-quantity').innerHTML = `${cartQuantity} items`;

   


    // call addEventListener function 
    addEventListeners();

    //to get all the event listenrs 
    function addEventListeners(){

        // to delete item 
    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click',()=>{
        const productId= link.dataset.productId;
        removeFromCart(productId);
        
        renderCartSummaryHTML();
        renderPaymentSummary();
        renderCheckoutHeader();

        
        // to calculate checkout item
        const cartQuantity= updateCartQuantity();
        document.querySelector('.js-checkout-item-quantity').innerHTML = `${cartQuantity} items`;
        });

        
            
            
        });
        

        
    // update button link    
    document.querySelectorAll('.js-update-quantity-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        

        //make "save" appear when clicking "update"
        document.querySelector(`.js-save-quantity-link`); 

        // when clicking "update" , get the cart-item-container for the product, and add the class "is-editing-quantity" to the container (use .classList)
        const clickUpdate = document.querySelector(`.js-cart-item-container-${productId}`);
        clickUpdate.classList.add('is-editing-quantity');

    });
    });

    // save button code 
    document.querySelectorAll('.js-save-quantity-link')
    .forEach((link)=>{
        link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;    
            //use  function updateQuantity
            updateQuantity();
            
            //use DOM to get the quantity <input> for the product , and get the value inside (remember to convert this value to a number)
            const input=document.querySelector('.quantity-input');
            const inputNumber = Number(input.value);

        // get the cart-item-container for the product, and remove the class "is-editing-quantity"
            const clickUpdate =  document.querySelector(`.js-cart-item-container-${productId}`);
        clickUpdate.classList.remove('is-editing-quantity');

        // now that we have updated the quantity in the cart . the last step is to update quantity in HTML 
        document.querySelector('.quantity-label').innerHTML = inputNumber;
        });
    });


    // code for updateDeliveryOption 
    document.querySelectorAll('.js-delivery-option')
    .forEach((element) =>{
        element.addEventListener('click', ()=>{
            // shorthand property
            // const productId = element.dataset.productId;
            // const deliveryOptionId  = element.dataset.deliveryOptionId;
            
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);

            document.querySelector('.js-order-summary').innerHTML = deliveryOptionId;
            
            renderCartSummaryHTML();
            renderPaymentSummary();
        });
    });

    
 }

}
