let pro_name = document.getElementsByClassName('pro-name');
let pro_author = document.getElementsByClassName('pro-author');
let pro_mrp_price = document.getElementsByClassName('pro-mrp-price');
let pro_rel_price = document.getElementsByClassName('pro-rel-price');
let pro_i = document.getElementsByClassName('pro-i');
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
let pro_adtocrt_btn = document.getElementById('pro-adtocrt-btn');

    // if(user_login_status === null){
    //     login_form_wrpr.style.display = "flex";
    //     body.style.overflowY = "hidden";     
    //     user_contxt_menu.style.display = 'none';
    //     // sub_cont1.style.opacity = "100%";      
    // }
    // else{
    // login_hdr_btn_txt.innerText = "User";
    // login_hdr_btn.style.backgroundColor = "transparent";
    // login_hdr_btn.style.color = "rgb(140,73,93)";
    // login_hdr_btn.style.borderColor = "transparent";
    // login_hdr_btn.style.width = "100%";
    // login_hdr_btn.style.fontWeight = "650";
    // user_arrow_txt.style.display = "block";
    // user_contxt_menu.style.display = 'flex';
    // }
    
    login_hdr_btn_txt.innerText = "User";
    login_hdr_btn.style.backgroundColor = "transparent";
    login_hdr_btn.style.color = "rgb(140,73,93)";
    login_hdr_btn.style.borderColor = "transparent";
    login_hdr_btn.style.width = "100%";
    login_hdr_btn.style.fontWeight = "650";
    user_arrow_txt.style.display = "block";
    user_contxt_menu.style.display = 'flex';
    // pro_input_txt.value = '';  

window.onload = () => {
    let targetImg = window.sessionStorage.getItem("img");
    console.log('e.target', targetImg);
    pro_i[0].style.backgroundImage = targetImg;
    pro_name[0].innerText = window.sessionStorage.getItem("title");
    pro_author[0].innerText = window.sessionStorage.getItem("author");
    pro_mrp_price[0].innerText = window.sessionStorage.getItem("MRP_price");
    pro_rel_price[0].innerText = window.sessionStorage.getItem("retail_price");
    user_login_status = window.sessionStorage.getItem("username");
    order_quantity_output.innerText = '1';
    order_total_output.innerHTML = window.sessionStorage.getItem("retail_price");

    query('api/populate/catgCntxt', 'get', null, function(response){
        if (response[0] === 200){
            response[1].forEach((value) => {
                catg_contxt_menu.innerHTML += '<li><a class="catg-contxt-menu-txt" onclick="catg_contxt_menu_txt_clicked(this)">' + value['Category'] +'</a></li>'
            });
        }
    });
    let sellerId = null;
    queryMe('query/prodet', 'select products.sellerId, description.description, specifications.pages, specifications.pages_color, specifications.return_policy, specifications.country_of_origin from products join description ON products.dscpId = description.dscpId JOIN Specifications ON products.specId = Specifications.specId where products.productId = ?;', [window.sessionStorage.getItem('productId')], function (response){
        console.log(response)
        if (response[0] === true){
            document.getElementById('pro-dcsp-output').textContent = response[1][1][0]['description'];
            document.getElementById('pro-book-pages-output').textContent = response[1][1][0]['pages'];
            document.getElementById('pro-pages-colour-output').textContent = response[1][1][0]['pages_color'];
            document.getElementById('pro-country-origin-output').textContent = response[1][1][0]['country_of_origin'];
            if (response[1][1][0]['return_policy'] === '0 days' || response[1][1][0]['return_policy'] === ''){
                document.getElementById('pro-ret-policy-output').textContent = 'no return';
            }
            else{
                document.getElementById('pro-ret-policy-output').textContent = response[1][1][0]['return_policy'];
            }
        
            queryMe('query/sellerdet', 'Select name, address from seller WHERE sellerId = ?', [response[1][1][0]['sellerId']], function (res){
                if (res[0] === true){
                    document.getElementById('pro-seller-name-output').textContent = res[1][1][0]['name'];
                    document.getElementById('pro-seller-address-output').textContent = res[1][1][0]['address'];
                }
            });
        }
        else {
            return;
        }
    });
}

sellbks_hdr_txt.addEventListener('click', sellbks_hdr_txt_clicked);
hdr_cart_txt.addEventListener('click', hdr_cart_txt_clicked);
address_arrow_txt.addEventListener('click', address_arrow_txt_clicked);
order_arrow_txt.addEventListener('click', order_arrow_txt_clicked);
payment_arrow_txt.addEventListener('click', payment_arrow_txt_clicked);
deliver_here_btn.addEventListener('click', address_deliver_txt_clicked);
order_continue_btn.addEventListener('click', order_continue_btn_clicked);
order_add_quantity_btn.addEventListener('click', order_add_quantity_btn_clicked);
order_sub_quantity_btn.addEventListener('click', order_sub_quantity_btn_clicked);
payment_continue_btn.addEventListener('click', payment_continue_btn_clicked);
pro_adtocrt_btn.addEventListener('click', pro_adtocrt_btn_clicked);

let address_arrow_txt_status = 1;
let order_arrow_txt_status = 0;
let payment_arrow_txt_status = 0;

function pro_adtocrt_btn_clicked(){
    let values = [window.sessionStorage.getItem('productId'), '1', window.sessionStorage.getItem('userId'), window.sessionStorage.getItem('productId'), window.sessionStorage.getItem('userId')]
    ''
    queryMe('query/addCart', 'INSERT into cart (productId, quantity, userId) Select ?, ?, ? where NOT EXISTS (Select * from cart where productId = ? and userId = ?)', values, function (response){
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
    window.sessionStorage.setItem('total_quantity', order_quantity_output.textContent)
    let data = {amount: parseInt((order_total_output.textContent).slice(1, this.length)), currency: 'INR', receipt: '1', payment_capture: '1'};
    fetch('payment/order', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({values: data, 'query': 'query'})
    }).then(async function(res) {
        if (res.status === 200){
            return [res.status, await res.json()];
        }
        else{
            return [res.status, await res.json()];
        }
    }).then(function(data) {
        if (data[0] === 200){
            console.log("Order: ", data, data[1].sub.id)
            var options = {
            "key": "rzp_test_38cOls6jn9siXg", 
            "currency": "INR",
            "name": "Chetan Shigvan",
            "description": "First Test Transaction",
            "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
            "order_id": data[1].sub.id,
            "handler": function (response){
                let verify = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
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
    }).catch(function(err) {
        console.log(err);
        alert('Error');
    });
}

function verifyOrder(options){
    fetch('payment/verify', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({values: options, 'query': 'query'})
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log("verifyOrderFetch: ",data);
        let name = document.getElementById('user-order-name-input').value;
        let contact = document.getElementById('user-order-contact-input').value;
        let address = document.getElementById('user-order-address-input').value;
        let city = document.getElementById('user-order-city-input').value;
        let landmark = document.getElementById('user-order-landmark-input').value;
        let state_select = document.querySelector('#user-order-state-input');
        let state = state_select.options[state_select.selectedIndex].textContent;
                            let total = order_total_output.textContent;
        order_address = address + ", " + city + " - " + landmark + ", " + state;
        let addressValues = [name, order_address, window.sessionStorage.getItem('userId')];
        console.log(total, typeof(total));
        if (data.status === 'success') {
            queryMe('query/createAddress', 'INSERT into address (name, address, userId) values (?, ?, ?)', addressValues, function (response){
                console.log(response);
                if (response[0] === true) {
                    queryMe('query/getAddressId', 'Select max(addressId) from address', null, function (res){
                        console.log(res);
                        if (response[0] === true) {
                            let total_price = total.slice(1, total.length);
                            let addressId = res[1][1][0]['max(addressId)'];
                            let current = new Date();
                            let orderValues = [order_quantity_output.textContent, total_price, current.toLocaleDateString(), current.toLocaleTimeString(), window.sessionStorage.getItem('productId'), window.sessionStorage.getItem('userId'), addressId];
                            queryMe('query/createOrder', 'INSERT into orders (quantity, total, date, time, productId, userId, addressId) values (?, ?, ?, ?, ?, ?, ?)', orderValues, function (response){
                                if (response[0] === true) {
                                    console.log('client-orderCreated', response);

                                    // // Temp
                                    // queryMe('query/updateProQuantity', 'Update products set quantity=? where productId=?', [(parseInt(window.sessionStorage.getItem('pro_quantity')) - parseInt(window.sessionStorage.getItem('total_quantity'))), window.sessionStorage.getItem('productId')], function (res){
                                    //     console.log(res);
                                    //     if (res[0] === true) {
                                    //         return true;
                                    //     }
                                    //     else{
                                    //         return false;
                                    //     }
                                    // });
                                }
                                else{
                                    return;
                                }
                            });
                        }
                        else{
                            return;
                        }
                    });
                }
                else {
                    return;
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
    }).catch(function(err) {
        console.log(err);
        alert('Error');
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
        order_arrow_txt_clicked();
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
    else if(address_arrow_txt_status === 0 && payment_arrow_txt_status === 0 && order_arrow_txt_status === 0){
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
    else if(payment_arrow_txt_status === 0 && address_arrow_txt_status === 0 && order_arrow_txt_status === 0){
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

let pro_back_btn = document.getElementsByClassName('pro-back-btn')[0];
pro_back_btn.addEventListener('click', pro_back_btn_clicked);
pro_buy_btn.addEventListener('click', pro_buy_btn_clicked);
// pro_buy_btn.addEventListener('click', pro_buy_btn_clicked);

function pro_buy_btn_clicked(){
            login_form_wrpr.style.display = "flex";
            body.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none'; 
            pro_i[1].style.backgroundImage = window.sessionStorage.getItem("img");
            pro_name[1].innerText = window.sessionStorage.getItem("title");
            pro_author[1].innerText = window.sessionStorage.getItem("author");
            pro_mrp_price[1].innerText = window.sessionStorage.getItem("MRP_price");
            pro_rel_price[1].innerText = window.sessionStorage.getItem("retail_price"); 
            pro_mrp_price[2].innerText = '₹' + window.sessionStorage.getItem("MRP_price");
            pro_rel_price[2].innerText = window.sessionStorage.getItem("retail_price");   

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

let pro_wshlst_btn = document.querySelectorAll('.pro-wshlst-btn')[0];
pro_wshlst_btn.addEventListener('click', pro_wishlist_btn_clicked);

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
        if (res.status === 200){
            return [res.status, await res.json()];
        }
        else{
            return [res.status, await res.json()];
        }
    }).then(function(data) {
        if (data[0] === 200){
            console.log(route, " queryMe:" ,data)
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

// Populating Category Context Menu
function populateCatgCntxt(){
    fetch('populate/populateCatgCntxt', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        data.forEach((value) => {
            catg_contxt_menu.innerHTML += '<li><a class="catg-contxt-menu-txt" onclick="catg_contxt_menu_txt_clicked(this)">' + value['Category'] +'</a></li>'
        });

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