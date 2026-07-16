import {cart} from './cart.js';
import {formatCurrency} from '../scripts/utils/money.js';


export function getProduct(productId){
    let matchingProduct;
    
            
    
            products.forEach((product) => {
                if(product.id === productId){
                    matchingProduct = product;
                }
            });
    
    console.log('Looking for:', productId, 'Found:', matchingProduct);
    return matchingProduct;
}


// generate objects using classes
class Product {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }

    getStarsUrl() {
        return `images/ratings/rating-${this.rating.stars * 10}.png`;
    }

    getPrice() {
       return `$${formatCurrency(this.priceCents)}`
    }
}

const product1 = new Product({
    id : 'socks-1',
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Grey athletic cotton socks 6-pairs',
    rating: {
        stars:4.5,
        count:87
    },
    priceCents:1090,
    
});
console.log(product1);

// inheritance example 
class Clothing extends  Product {

    constructor(productDetails){
        // to call the parent constructor we use super
        super(productDetails);

    }
}

const tshirt = new Clothing({
    id : 't-shirt-1',
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt-2 Pack',
    rating:{
        stars:4.5,
        count:56
    },
    priceCents:7990,
});

console.log(tshirt);


export let products = [];

// fetch is used to make a get request 
function loadProductsFetch() {
    fetch('https://supersimplebackend.dev/products').then((response) => {
        return response.json()
    }).then((productsData) => {
        console.log(productsData);
    })
}
loadProductsFetch();

export function loadProducts(callback) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', ()=>{
       products =  JSON.parse(xhr.response);
       callback();
    });
    
    xhr.open('GET','https://supersimplebackend.dev/products');
    xhr.send();
}



// products 
/*
export const products = [{
    id : 'socks-1',
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Grey athletic cotton socks 6-pairs',
    rating: {
        stars:4.5,
        count:87
    },
    priceCents:1090,
    
},{
    id : 'basketball-1',
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars:5,
        count: 127
    },
    priceCents: 2095,
},{
    id : 't-shirt-1',
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt-2 Pack',
    rating:{
        stars:4.5,
        count:56
    },
    priceCents:7990,
},{
    id : 'toaster-1',
    image: 'images/products/2-slot-toaster-white.jpg',
    name: '2 Slot Toaster - Black',
    rating: {
        stars:5,
        count:2197
    },
    priceCents:1899,
},{
    id : 'maker-1',
    image: 'images/products/black-and-silver-espresso-maker.jpg',
    name: 'black and silver espresso maker',
    rating: {
        stars:5,
        count: 2143
    },
    priceCents:1899,
},{
    id : 'shoes-1',
    image:  'images/products/athletic-skateboard-shoes-gray.jpg',
    name : 'athletic skateboard shoes gray',
    rating: {
        stars:5,
        count:3298
    },
    priceCents: 1899,
},{
    id : 'bed-1',
    image : 'images/products/duvet-cover-set-gray-queen.jpg',
    name : 'bed',
    rating : {
        stars : 4,
        count : 100
    },
    priceCents: 2099,
},{
    id :'curtains-1',
    image : 'images/products/blackout-curtain-set-beige.jpg',
    name : 'curtains beigh color',
    rating : {
        stars : 4.5,
        count : 130
        },
    priceCents: 1599,    
},{
    id : 'curtains-2',
    image : 'images/products/blackout-curtains-set-teal.jpg',
    name : 'curtains teal color',
    rating : {
        stars : 4,
        count : 444
    },
    priceCents: 4099,
}];
*/

C:\Users\Abdul\javascript_tutorial\practice\amazon-project-copy