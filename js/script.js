
let elBtnPluseOrMinuse = document.querySelectorAll('.main__product-btn');
let elCheckExtraProduct = document.querySelectorAll('.main__product-checkbox');
let elAddCart = document.querySelector('.addCart');
let elMainProductNum = document.querySelectorAll('.main__product-num');

// Check 
let elResultContainer = document.querySelector('.receipt');
let elResultWindow = document.querySelector('.receipt__window');
let elCheckBtn = document.querySelector('.receipt__window-btn');

// Order
let elUserMoney = document.querySelector('.user__money');
let elResultProduct1 = document.querySelector('#order-plainBurger');
let elResultProduct2 = document.querySelector('#order-freshBurger');
let elResultProduct3 = document.querySelector('#order-freshCombo');
let elResultTotal = document.querySelector('#order-total');

let usersBank = []

let userMoney = +prompt('Pulinginzni kiriting...');

usersBank.push(userMoney);

elUserMoney.innerHTML = `$ ${usersBank}`;

// ALL-products:
const product = {
    plainBurger:{
        name: 'Simple Hamburger',
        price: 10000,
        kcall: 500,
        amount: 0,
        
        // extra: {
        //     lettuce: true,
        //     doubleMayonnaise: false,
        //     cheese: false,

        //     get price() {
        //         const lettucePrice = this.lettuce ? extraProduct.lettuce.price : 0
        //         const mayonnaisePrice = this.doubleMayonnaise ? extraProduct.doubleMayonnaise.price : 0

        //         return lettucePrice + mayonnaisePrice
        //     }
        // },

        get summ() {
            return this.price * this.amount;
        },
        
        get kl() {
            return this.kcall * this.amount;
        },
    },
    
    freshBurger:{
        name: 'FRESH Hamburger',
        price: 20500,
        kcall: 700,
        amount: 0,
        get summ() {
            return this.price * this.amount;
        },
        
        get kl() {
            return this.kcall * this.amount;
        }
    },
    
    freshCombo:{
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1000,
        amount: 0,
        get summ() {
            return this.price * this.amount;
        },
        
        get kl() {
            return this.kcall * this.amount;
        }
    }
}

// Additional-things
const extraProduct = {
    doubleMayonnaise:{
        name: 'Двойной майонез',
        price: 1000,
        kcall: 100,
    },
    
    lettuce:{
        name: 'Салатный лист',
        price: 500,
        kcall: 50,
    },
    
    cheese:{
        name: 'Сыр',
        price: 5000,
        kcall: 1000,
    }
}

// Order
const order = {
    products: {
        plainBurger: 0,
        freshBurger: 0,
        freshCombo: 0,
    },

    get total() {
        return this.products.plainBurger + 
               this.products.freshBurger + 
               this.products.freshCombo;
    }
}

// Buttons + -
for (let i = 0; i < elBtnPluseOrMinuse.length; i++) {
    elBtnPluseOrMinuse[i].addEventListener('click', function() {
        pluseOrMinuse(this);
    })
}

// + i -
function pluseOrMinuse(element) {
    
    let parentId = element.closest('.main__product').getAttribute('id');
    let out = element.closest('.main__product').querySelector('.main__product-num');
    let price = element.closest('.main__product').querySelector('.main__product-price span');
    let kcall = element.closest('.main__product').querySelector('.main__product-call span');
    
    if (element.getAttribute('data-symbol') == '+' && product[parentId].amount < 50) {
        product[parentId].amount++;
    }
    else if (element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].summ;
    kcall.innerHTML = product[parentId].kl;
} 

// Calculate order price
function calculateOrderPrice() {
    order.products.plainBurger = product.plainBurger.summ;
    order.products.freshBurger = product.freshBurger.summ;
    order.products.freshCombo = product.freshCombo.summ;

}

function renderOrderPrice() {
    elResultProduct1.innerHTML = order.products.plainBurger;
    elResultProduct2.innerHTML = order.products.freshBurger;
    elResultProduct3.innerHTML = order.products.freshCombo;
    elResultTotal.innerHTML = order.total;
}
// Pay Order
function payOrder() {
    if(userMoney == 0) return alert("Pulingiz yo'qku!!!");
    else if (order.total > userMoney) return alert('Pulingiz qolmadi. Ishlab keling! Ishlagan tishlaydi.');
    
    userMoney = (userMoney - order.total);
    elUserMoney.innerHTML = `$ ${userMoney}`;
}

// Order submit 
elAddCart.addEventListener('click', function elementTwo() {
    // Show results
    calculateOrderPrice();
    renderOrderPrice();

    // Open modal    
    elResultWindow.classList.add('active');
    elResultContainer.classList.add('active');
})

// Pay submit
elCheckBtn.addEventListener('click', function() {
    elResultWindow.classList.remove('active');
    elResultContainer.classList.remove('active');

    payOrder();
})

// Additional Products 
for(let i = 0; i < elCheckExtraProduct.length; i++) {
    elCheckExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}

function addExtraProduct(el) {
    
    const parent = el.closest('.main__product');
    const parentId = parent.getAttribute('id');
    product[parentId][el.getAttribute('data-extra')] = el.checked;
    
    let kcall = parent.querySelector('.main__product-call span');
    let price = parent.querySelector('.main__product-price span');
    let elDataInfo = el.getAttribute('data-extra');
    if(product[parentId][elDataInfo] == true) {
        product[parentId].kcall += extraProduct[elDataInfo].kcall;
        product[parentId].price += extraProduct[elDataInfo].price;
    }
    else {
        product[parentId].kcall -= extraProduct[elDataInfo].kcall;
        product[parentId].price -= extraProduct[elDataInfo].price;
    }
    
    kcall.innerHTML = product[parentId].kl;
    price.innerHTML = product[parentId].summ;
}