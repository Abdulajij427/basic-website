import {addToCart, cart,loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {

it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
            productId: 'socks-1',
            quantity: 1,
            deliveryOptionId: '1'
        }]);
    });

    loadFromStorage();

    document.querySelector('.js-test-container').innerHTML = `
        <input class="js-quantity-selector-socks-1" value="1">
    `;

    addToCart('socks-1');

    expect(cart.length).toEqual(1); // naya product nahi bana, existing hi update hua
    expect(cart[0].productId).toEqual('socks-1');
    expect(cart[0].quantity).toEqual(2); // 1 (pehle se) + 1 (selector se) = 2
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
});

});