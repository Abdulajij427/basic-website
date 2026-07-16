import {cart} from '../../data/cart.js'

export function renderCheckoutHeader(){
    let checkoutHeadersHTML = '' ;

    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity = cartItem.quantity;
    })

    checkoutHeadersHTML += `
    
      <div class="header-content">
        <div class="checkout-header-left-section">
            <a href="index.html">
                <img class="logo" src="images/logo.png" height="30px" />
                
            </a>
        </div>

        <div class="checkout-header-middle-section ">
            checkout (<a class="return-to-home-link js-checkout-item-quantity"
            href="index.html">${cartQuantity}</a>  )
        </div>

        <div class="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" height="30px"/>
        </div>
      </div>  
    
    `
  document.querySelector('.js-checkout-header').innerHTML = checkoutHeadersHTML;
}





