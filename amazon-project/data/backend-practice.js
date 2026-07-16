// this message also know as a http request 
const xhr = new XMLHttpRequest();

xhr.addEventListener('load',() => {
    console.log(xhr.response);
});

xhr.open('GET','https://superSimplebackend.dev/products/first'); //  get means get some info from backend.
xhr.send();
