import {renderCartSummaryHTML} from  './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkOutHeader.js';
//import '../data/cart-class.js';
// import '../data/backend-practice.js';
import {loadProducts} from '../data/product.js';


// ye function ky karega ki jab tak ye execute nhi hota hai tab tak wait kare ga 
new Promise((resolve) => {
    console.log('start promise');
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderCartSummaryHTML();
    renderPaymentSummary();
    renderCheckoutHeader();
});

loadProducts(()=>{
renderCartSummaryHTML();
renderPaymentSummary();
renderCheckoutHeader();
});


new Promise((resolve)=>{
    loadProducts(()=>{
        resolve;
    });
}).then(()=>{
    return new Promise((resolve)=>{
    loadCart(()=>{
        resolve;
    });
    });
})