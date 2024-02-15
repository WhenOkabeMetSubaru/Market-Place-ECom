
const cartHelp = {
    addToCart(product,cb){
        let cart = [];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.push({
                product:product,
                quantity:1,
                shopID:product.shop._id
            });

            localStorage.setItem('cart',JSON.stringify(cart));

            cb();
        }
        
    },

    totalItems(){
        if(typeof window !== 'undefined'){
            let items = JSON.parse(localStorage.getItem('cart'));
            if(items!==null){
                return items.length
            }
            return 0;
        }
        return 0;
    },
    totalItemPrice(){
        if(typeof window !=='undefined'){
            let cart =[];

            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            
            let total = cart?.reduce((a,b)=>{
                return a + (b.quantity * b.product.sellingprice);
            },0)
            
            return total;
        }
    },
    getCart(){
        if(typeof window !== 'undefined'){
            let items = JSON.parse(localStorage.getItem('cart'));
            if(!items?.length>0){
                return [];
            }
            return items;
        }
        return null;
    },
    updateCart(index,quantity){
        if(typeof window !=='undefined'){
            let cart =[];

            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart[index].quantity = quantity;
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    },
    removeCart(index){
        if(typeof window !== 'undefined'){
            let cart =[];
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.splice(index,1);
            localStorage.setItem('cart',JSON.stringify(cart));

            return cart;
        }
        
    },
    emptyCart(){
        if(typeof window !== 'undefined'){
            localStorage.removeItem('cart');
        }
    }
}

export default cartHelp;