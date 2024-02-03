//variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//cart
let cart = [];

//getting items
class Products{
    async getProducts(){
        try
        {
            let result = await fetch('./assets/products.json');
            let data = await result.json();

            let products = data.items;
            products = products.map(item =>{
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image}
            })
            return products;
        } catch (error){
            console.log(error);
        }
    }
}
//displaying UI
class UI{
    displayProducts(products){
        let result = '';
        products.forEach(product =>{
            result += ` <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="product" class="product-img"/>
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart">Add to cart</i>
                    </button>
                </div>
                <h3>Bracelet</h3>
                <h4>$4</h4>
            </article>
                <!-- end of single product -->`
        })
    }
}
//local storage
class Storage{

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    //get all products;
    products.getProducts().then(products => ui.displayProducts(products));
})

//1.21