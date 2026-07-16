import {renderCartSummaryHTML} from '../../scripts/ckeckout/orderSummary.js';
import {loadFromStorage} from '../../data/cart.js';



describe('test suite: renderCartSummaryHTML', () => {
    it('display the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        `;

    const productId1 =   'socks-1'  ;
    spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : productId1,
                quantity : 1,
                deliveryOptionId : '1'
            }]);
        });
        
        loadFromStorage();

        renderCartSummaryHTML();


        document.querySelector('.js-delete-link-${productId}').click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');
    });
});