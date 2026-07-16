import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/product.js'
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js'

export function renderPaymentSummary() {
    
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let quantity = 0;

    cart.forEach((cartItem) => {
         const product = getProduct(cartItem.productId);
         productPriceCents = product.priceCents * cartItem.quantity;

          quantity = cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents
    });
    
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = taxCents + totalBeforeTaxCents;
    

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Payment Summary
        </div>

        <div class="payment-summary-row">
            <div>item(${quantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div class="total">Total order</div>
            <div class="payment-summary-money total">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            place your order
        </button>
    `;

    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

    
}

