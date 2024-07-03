let sub_cont1 = document.getElementsByClassName('sub-cont-1')[0];
let user_contxt_menu = document.getElementById('user-contxt-menu');
let sellbks_hdr_txt = document.getElementById('sellbks-hdr-txt');
let ads = document.getElementById('ads');
let hdr_srch_input = document.getElementById('hdr-srch-input');
let hdr_cart_txt = document.getElementById('hdr-cart-txt');
let login_hdr_btn_txt = document.getElementById('login-hdr-btn-txt');
let login_hdr_btn = document.getElementById('login-hdr-btn');
let user_arrow_txt = document.getElementById('user-arrow-txt');
let login_button = document.getElementById('login-btn');
let sign_status_txt = document.getElementById('sign-status-txt');
let catg_contxt_menu = document.getElementById('catg-contxt-menu');
let pro_buy_btn = document.getElementById('pro-buy-btn');
let user_login_status = null;
let login_form_wrpr = undefined;
let productIds = '';
login_form_wrpr = document.getElementsByClassName('login-form-wrpr')[0];
let login_close_btn = document.getElementById('login-close-btn');
let address_arrow_txt = document.getElementById('address-arrow-txt');
let order_arrow_txt = document.getElementById('order-arrow-txt');
let payment_arrow_txt = document.getElementById('payment-arrow-txt');
let address_shrink_output = document.getElementById('address-shrink-output');
let address_shrink_output_txt = document.getElementById('address-shrink-output-txt');
let main_cont2 = document.getElementsByClassName('main-cont2')[0];
let main_cont4 = document.getElementsByClassName('main-cont4')[0];
let main_cont5 = document.getElementsByClassName('main-cont5')[0];
let deliver_here_btn = document.getElementById('deliver-here-btn');
let order_continue_btn = document.getElementById('order-continue-btn');
let order_add_quantity_btn = document.getElementById('order-add-quantity-btn');
let order_sub_quantity_btn = document.getElementById('order-sub-quantity-btn');
let order_quantity_txt = document.getElementById('order-quantity-txt');
let order_quantity_output = document.getElementById('order-quantity-output');
let order_total_output = document.getElementById('order-total-output');
let payment_continue_btn = document.getElementById('payment-continue-btn');
let cart_total_quantity = document.getElementById('cart-total-quantity');
let cart_total_price = document.getElementById('cart-total-price'); 

window.onload = () => {
    user_login_status = window.sessionStorage.getItem("username");
    order_quantity_output.innerText = window.sessionStorage.getItem('total_cart_quantity');
    order_total_output.innerHTML = '₹' + window.sessionStorage.getItem("total_cart_price");

    query('api/populate/catgCntxt', 'get', null, function(response){
        if (response[0] === 200){
            response[1].forEach((value) => {
                catg_contxt_menu.innerHTML += '<li><a class="catg-contxt-menu-txt" onclick="catg_contxt_menu_txt_clicked(this)">' + value['Category'] +'</a></li>';
            });
        }
    });

    populateCart();

}

sellbks_hdr_txt.addEventListener('click', sellbks_hdr_txt_clicked);
hdr_cart_txt.addEventListener('click', hdr_cart_txt_clicked);
address_arrow_txt.addEventListener('click', address_arrow_txt_clicked);
// order_arrow_txt.addEventListener('click', order_arrow_txt_clicked);
deliver_here_btn.addEventListener('click', address_deliver_txt_clicked);
payment_arrow_txt .addEventListener('click', payment_arrow_txt_clicked);
payment_continue_btn.addEventListener('click', payment_continue_btn_clicked);
// order_continue_btn.addEventListener('click', order_continue_btn_clicked);
// order_add_quantity_btn.addEventListener('click', order_add_quantity_btn_clicked);
// order_sub_quantity_btn.addEventListener('click', order_sub_quantity_btn_clicked);

let address_arrow_txt_status = 1;
let order_arrow_txt_status = 0;
let payment_arrow_txt_status = 0;

function pro_adtocrt_btn_clicked(){
    let values = [window.sessionStorage.getItem('productId'), '1', window.sessionStorage.getItem('userId')]
    queryMe('query/addCart', 'INSERT into cart (productId, quantity, userId) values (?, ?, ?)', values, function (response){
        if (response[0] === true) {
            console.log('client-orderCreated', response);
            alert('Book added to Cart');
        }
        else{
            return;
        }
    });
}

function payment_continue_btn_clicked(e){
    let body = {amount: parseInt((order_total_output.textContent).slice(1, this.length)), currency: 'INR', receipt: '1', payment_capture: '1'};
    query('api/payment/order', 'post', body, function (response){
        if (response[0] === 200) {
            console.log("Order: ", response, response[1].sub.id);
            var options = {
                "key": "rzp_test_38cOls6jn9siXg", 
                "currency": "INR",
                "name": "Chetan Shigvan",
                "description": "First Test Transaction",
                "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
                "order_id": response[1].sub.id,
                "handler": function (res){
                    let verify = {
                        razorpay_payment_id: res.razorpay_payment_id,
                        razorpay_order_id: res.razorpay_order_id,
                        razorpay_signature: res.razorpay_signature,
                    };
                    verifyOrder(verify);
                },
                "theme": {
                    "color": "rgb(140,73,93)"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
        }
        else{
        }
    });
}

function verifyOrder(options){
    query('api/payment/verify', 'post', options, function (response){
        if (response[0] === 200){
            let name = document.getElementById('user-order-name-input').value;
            let contact = document.getElementById('user-order-contact-input').value;
            let address = document.getElementById('user-order-address-input').value;
            let city = document.getElementById('user-order-city-input').value;
            let landmark = document.getElementById('user-order-landmark-input').value;
            let state_select = document.querySelector('#user-order-state-input');
            let state = state_select.options[state_select.selectedIndex].textContent;
            let total = order_total_output.textContent;
            order_address = address + ", " + city + " - " + landmark + ", " + state;
            let addressValues = [name, order_address];
            console.log(total, typeof(total));
            query('api/user', 'post', addressValues, function (res){
                console.log(res);
                if (res[0] === 200) {
                    let total_price = total.slice(1, total.length);
                    let addressId = res[1][2][0]['@addressId'];
                    let current = new Date();
                    let body = [order_quantity_output.textContent, total_price, current.toLocaleDateString(), current.toLocaleTimeString(), productIds, addressId];
                    console.log('productIds: ', productIds);
                    query('api/order', 'post', body, function (response){
                        if (response[0] === 200) {
                            console.log('client-orderCreated', response);
                        }
                        else{
                        }
                    });
                }
                else {
                }
            });
            login_form_wrpr.style.display = "none";
            body.style.overflowY = "visible";     
            user_contxt_menu.style.display = 'flex'; 
            alert('Payment Successfull!');
        }
        else{
            login_form_wrpr.style.display = "none";
            body.style.overflowY = "visible";     
            user_contxt_menu.style.display = 'flex'; 
            alert('Payment Failed!');
        }
    });
}

function order_add_quantity_btn_clicked(){
    if(order_quantity_txt.textContent < 10){
        let quantity = parseInt(order_quantity_txt.textContent) + 1;
        order_quantity_txt.innerHTML = quantity;
        order_quantity_output.innerHTML = quantity;
        order_total_output.innerHTML = '₹' + parseInt(quantity) * parseInt(window.sessionStorage.getItem("retail_price").slice(1, this.length));
    }
}

function order_sub_quantity_btn_clicked(){
    if(order_quantity_txt.textContent > 1){
        let quantity = parseInt(order_quantity_txt.textContent) - 1;
        order_quantity_txt.innerHTML = quantity;
        order_quantity_output.innerHTML = quantity;
        order_total_output.innerHTML = '₹' + parseInt(quantity) * parseInt(window.sessionStorage.getItem("retail_price").slice(1, this.length));
    }
}

function address_deliver_txt_clicked(){
    if(address_arrow_txt_status === 1){
        address_shrink_output.style.minHeight = '65%';
        let name = document.getElementById('user-order-name-input').value;
        let contact = document.getElementById('user-order-contact-input').value;
        let address = document.getElementById('user-order-address-input').value;
        let city = document.getElementById('user-order-city-input').value;
        let landmark = document.getElementById('user-order-landmark-input').value;
        let state_select = document.querySelector('#user-order-state-input');
        let state = state_select.options[state_select.selectedIndex].textContent;
        address_shrink_output_txt.innerText = name + ", " + address + ", " + city + " - " + landmark + ", " + state;
        main_cont2.style.height = '20%';
        sub_cont1.style.display = 'none';
        address_arrow_txt_status = 0;
        address_arrow_txt.style.transform = 'rotate(90deg)';
        payment_arrow_txt_clicked();
    }
    else if(address_arrow_txt_status === 0 && payment_arrow_txt_status === 0 && order_arrow_txt_status === 0){
        address_shrink_output.style.minHeight = '0%';
        main_cont2.style.height = '475px';
        sub_cont1.style.display = 'flex';
        address_arrow_txt_status = 1;
        address_arrow_txt.style.transform = 'rotate(-90deg)';
    }   
}

function order_continue_btn_clicked(){
    if(order_arrow_txt_status === 1){
        main_cont4.style.height = '6.5vh';
        // sub_cont1.style.display = 'none';
        order_arrow_txt_status = 0;
        order_arrow_txt.style.transform = 'rotate(90deg)';
        payment_arrow_txt_clicked();
        // console.log((order_total_output.textContent).slice(1, this.length));
        order_continue_btn.style.transitionDelay = '0s';
        order_continue_btn.style.opacity = '0';
    }
}

function address_arrow_txt_clicked(){
    if(address_arrow_txt_status === 1){
        address_shrink_output.style.minHeight = '65%';
        let name = document.getElementById('user-order-name-input').value;
        let contact = document.getElementById('user-order-contact-input').value;
        let address = document.getElementById('user-order-address-input').value;
        let city = document.getElementById('user-order-city-input').value;
        let landmark = document.getElementById('user-order-landmark-input').value;
        let state_select = document.querySelector('#user-order-state-input');
        let state = state_select.options[state_select.selectedIndex].textContent;
        address_shrink_output_txt.innerText = name + ", " + address + ", " + landmark + ", " + city + ", " + state;
        main_cont2.style.height = '20%';
        sub_cont1.style.display = 'none';
        address_arrow_txt_status = 0;
        address_arrow_txt.style.transform = 'rotate(90deg)';
    }
    else if(address_arrow_txt_status === 0 && payment_arrow_txt_status === 0){
        address_shrink_output.style.minHeight = '0%';
        address_shrink_output_txt.innerText = '';
        main_cont2.style.height = '475px';
        sub_cont1.style.display = 'flex';
        address_arrow_txt_status = 1;
        address_arrow_txt.style.transform = 'rotate(-90deg)';
    }   
}

function order_arrow_txt_clicked(){
    if(order_arrow_txt_status === 1){
        main_cont4.style.height = '6.5vh';
        // sub_cont1.style.display = 'none';
        order_arrow_txt_status = 0;
        order_arrow_txt.style.transform = 'rotate(90deg)';
        order_continue_btn.style.transitionDelay = '0s';
        order_continue_btn.style.opacity = '0';
    }
    else if(order_arrow_txt_status === 0 && address_arrow_txt_status === 0 && payment_arrow_txt_status === 0){
        main_cont4.style.height = '325px';
        // sub_cont1.style.display = 'flex';
        order_arrow_txt_status = 1;
        order_arrow_txt.style.transform = 'rotate(-90deg)';
        order_continue_btn.style.transitionDelay = '0.45s';
        order_continue_btn.style.opacity = '100%';
    }
}

function payment_arrow_txt_clicked(){
    if(payment_arrow_txt_status === 1){
        main_cont5.style.height = '6.5vh';
        // sub_cont1.style.display = 'none';
        payment_arrow_txt_status = 0;
        payment_arrow_txt.style.transform = 'rotate(90deg)';
        // address_arrow_txt_clicked();
        // order_arrow_txt_clicked();

    }
    else if(payment_arrow_txt_status === 0 && address_arrow_txt_status === 0){
        main_cont5.style.height = '275px';
        // sub_cont1.style.display = 'flex';
        payment_arrow_txt_status = 1;
        payment_arrow_txt.style.transform = 'rotate(-90deg)';
        // address_arrow_txt_clicked();
        // order_arrow_txt_clicked();
    }
}

function hdr_cart_txt_clicked() {
        if(window.sessionStorage.getItem("username") === null){
            login_form_wrpr.style.display = "flex";
            body.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';    
        }
        else{
            location.href = "../cart.html";
        }
}

function sellbks_hdr_txt_clicked(){
        if(window.sessionStorage.getItem("username") === null){
            login_form_wrpr.style.display = "flex";
            body.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';    
        }
        else{
            location.href = "../userProducts.html";
        }
}

login_close_btn.addEventListener('click', login_close_btn_clicked);
function login_close_btn_clicked(){
    login_form_wrpr.style.display = "none";
    body.style.overflowY = "visible";
}

function pro_back_btn_clicked(){
    console.log('clicked')
    window.location.href = "index.html";
}

let pro_wishlist_btn_status = 0;

function pro_wishlist_btn_clicked(e){
    e.stopPropagation();
    if(pro_wishlist_btn_status == 0){
        e.target.classList.remove("emt-hrt-icon");
        e.target.classList.add("red-hrt-icon");
        pro_wishlist_btn_status = 1;
        console.log("hrt is red, ", pro_wishlist_btn_status);
    }
    else{
        e.target.classList.remove("red-hrt-icon");
        e.target.classList.add("emt-hrt-icon");
        pro_wishlist_btn_status = 0;
        console.log("hrt is empty, ", pro_wishlist_btn_status);
    }
    console.log("wishlist btn clicked");
}


// Populating Category Context Menu
function populateCatgCntxt(){
}

function populateProducts(data) {
    console.log(data);
    let htmlText = '';
    let quantity = 0;
    let price = 0;
    let count = 0;
    let pro_frow = document.getElementsByClassName('pro-frow')[0];
    data.forEach((value, index) => {
        console.log(value['filename'], index);
        pro_frow.innerHTML += '<div class="pro-wrpr" data-cartId=' + value['cartId'] + ' ><div class="pro-buy-cont pro-buy-cont-af"><div class="pro-i-wrapper pro-i-wrapperaf"><div class="pro-i pro-frow-i1 pro-i-buy" style="background-image: url(\'userData/images/' + value['filename'] + '\');"></div></div></div><div class="pro-opt pro-opt-af"><div class="pro-i-det pro-i-detaf"><div><p class="pro-name">' + value['title'] + '</p><p class="pro-author">' + value['author'] + '</p><p class="pro-author">cvstunner PVT LTD</p><div class="pro-prices"><p class="pro-mrp-price">' + value['MRP_price'] + '</p><p class="pro-rel-price pro-rel-priceaf">₹' + value['retail_price'] + '</p><button id="order-sub-quantity-btn" class="pro-btns pro-btnsaf pro-adtocrt-btn quantity-btns" type="button" onclick="order_sub_quantity_btn_clicked(this)">-</button><p id="order-quantity-txt" class="pro-avail-txt pro-avail-txtaf">'+ value['quantity'] +'</p><button id="order-add-quantity-btn" class="pro-btns pro-btnsaf pro-adtocrt-btn quantity-btns" type="button" onclick="order_add_quantity_btn_clicked(this)">+</button><button id="cart-pro-rmv-btn" class="pro-btns pro-adtocrt-btn deliver-clr-btn" type="button" onclick="cart_pro_rmv_btn_clicked(this)">Remove</button></div></div></div></div></div>';
        count++;
        quantity += parseInt(value['quantity']);
        price = price + (parseInt(value['retail_price']) * value['quantity']);
        if (productIds !== ''){
            productIds = productIds + ',' + value['productId'];
        }
        else{
            productIds = value['productId'];
        }
        console.log(value['quantity'], count, price)
    });
        cart_total_quantity.innerText = quantity + ' books';
        cart_total_price.innerText = '₹' + price;
        window.sessionStorage.setItem('total_cart_quantity', quantity);
        window.sessionStorage.setItem('total_cart_price', price);
}

let cart_buy_btn = document.getElementById('cart-buy-btn');
login_close_btn.addEventListener('click', login_close_btn_clicked);
function login_close_btn_clicked(){
    login_form_wrpr.style.display = "none";
    body.style.overflowY = "visible";

}
cart_buy_btn.addEventListener('click', cart_buy_btn_clicked);

function cart_buy_btn_clicked(){
    order_quantity_output.innerText = window.sessionStorage.getItem('total_cart_quantity');
    order_total_output.innerHTML = '₹' + window.sessionStorage.getItem("total_cart_price");
            body.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';  
            login_form_wrpr.style.display = "flex";

}

function populateCart(){
    query('api/cart', 'get', null, function(response){
        if (response[0] === 200){
            populateProducts(response[1]);
        }
        else{
            alert('Your Cart is Empty!')
            return false;
        }
    });
}

function cart_pro_rmv_btn_clicked(element){
    let query = 'delete from cart where cartId = ?';
    queryMe('query/addCart',query, [element.offsetParent.getAttribute('data-cartid')], function(response){
        // console.log(response[1][1][0])
        if (response[0] === true){
            location.reload();

        }
        else{
            alert('Your Cart is Empty!')
            return false;
        }
    });
}

function order_add_quantity_btn_clicked(element){
    console.log(element)
    if(element.previousElementSibling.textContent < 10){
        let quantity = parseInt(element.previousElementSibling.textContent) + 1;
        element.previousElementSibling.innerHTML = quantity;
        // price = price + (parseInt(value['retail_price']) * quantity;
        queryMe('query/updateProQuantity', 'update cart SET quantity = ? where cartId = ?', [quantity, element.offsetParent.getAttribute('data-cartId')], function(response){
            // console.log(response)
            if (response[0] === true){
                // populateCart(response[1][1]);
            }
            else{
                return false;
            }
        });
    }
}

function order_sub_quantity_btn_clicked(element){    
    // console.log(element);
    if(element.nextElementSibling.textContent > 1){
        let quantity = parseInt(element.nextElementSibling.textContent) - 1;
        element.nextElementSibling.innerHTML = quantity;
        queryMe('query/updateProQuantity', 'update cart SET quantity = ? where cartId = ?', [quantity, element.offsetParent.getAttribute('data-cartId')], function(response){
            console.log(response)
            if (response[0] === true){
                // populateCart(response[1][1]);
            }
            else{
                return false;
            }
        });
    }
}


function response(data) {
    return data;
}

function queryMe(route, query, data, response){
    fetch(route, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({values: data, 'query': query})
    }).then(async function(res) {
        console.log(res);
        if (res.status === 200){
            return [res.status, await res.json()];
        }
        else{
            return [res.status, await res.json()];
        }
    }).then(function(data) {
        if (data[0] === 200){
            console.log(route, " queryMe:" ,data);
            response([true, data]);
        }
        else{
            response([false, null]);
        }
    }).catch(function(err) {
        console.log(err);
        alert('Error');
    });
}

function query(route, method, data, response){
    if (method === 'get'){
        fetch(route, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async function(res){
            if (res.status === 200){
                return [res.status, await res.json()];
            }
            else{
                return [res.status, await res.json()];
            }
        }).then(function(data){
            if (data[0] === 200){
                console.log(route, " query:" ,data);
                response(data);
            }
            else{
                response(data);
            }
        }).catch(function(err) {
            console.log(err);
            alert('Error');
        });
    }
    else {
        fetch(route, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({values: data, 'query': query})
        }).then(async function(res) {
            console.log(res);
            if (res.status === 200){
                return [res.status, await res.json()];
            }
            else{
                return [res.status, await res.json()];
            }
        }).then(function(data) {
            if (data[0] === 200){
                console.log(route, " queryMe:" ,data);
                response(data);
            }
            else{
                response(data);
            }
        }).catch(function(err) {
            console.log(err);
            alert('Error');
        });
    }
}