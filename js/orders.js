
// let login_close_btn = document.getElementById('login-close-btn');
let body = document.getElementById('body');
let login_hdr_btn = document.getElementById('login-hdr-btn');
let login_hdr_btn_txt = document.getElementById('login-hdr-btn-txt');
// login_hdr_btn.addEventListener('click', login_hdr_btn_clicked);
let logout_contxt_txt = document.getElementById('logout-contxt-txt');
let user_arrow_txt = document.getElementById('user-arrow-txt');
let login_button = document.getElementById('login-btn');
let sign_status_txt = document.getElementById('sign-status-txt');
let user_contxt_menu = document.getElementById('user-contxt-menu');
// logout_contxt_txt.addEventListener('click', logout_contxt_txt_clicked);
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
    // user_login_status = window.sessionStorage.getItem("username");
    // order_quantity_output.innerText = window.sessionStorage.getItem('total_cart_quantity');
    // order_total_output.innerHTML = '₹' + window.sessionStorage.getItem("total_cart_price");

    // populateCatgCntxt();
    let sellerId = null;
    // queryMe('query/prodet', 'Select description, pages, pages_color, return_policy, country_of_origin, sellerId from products WHERE productId = ?', [window.sessionStorage.getItem('productId')], function (response){
    //     console.log(response)
    //     if (response[0] === true){
    //         document.getElementById('pro-dcsp-output').textContent = response[1][1][0]['description'];
    //         document.getElementById('pro-book-pages-output').textContent = response[1][1][0]['pages'];
    //         document.getElementById('pro-pages-colour-output').textContent = response[1][1][0]['pages_color'];
    //         document.getElementById('pro-country-origin-output').textContent = response[1][1][0]['country_of_origin'];
    //         if (response[1][1][0]['return_policy'] === '0 days' || response[1][1][0]['return_policy'] === ''){
    //             document.getElementById('pro-ret-policy-output').textContent = 'no return';
    //         }
    //         else{
    //             document.getElementById('pro-ret-policy-output').textContent = response[1][1][0]['return_policy'];
    //         }
        
    //         queryMe('query/sellerdet', 'Select name, address from seller WHERE sellerId = ?', [response[1][1][0]['sellerId']], function (res){
    //             if (res[0] === true){
    //                 document.getElementById('pro-seller-name-output').textContent = res[1][1][0]['name'];
    //                 document.getElementById('pro-seller-address-output').textContent = res[1][1][0]['address'];
    //             }
    //         });
    //     }
    //     else {
    //         return;
    //     }
    // });

    queryMe('query/orders', 'SELECT orders.orderId, orders.total, orders.date, products.productId, products.title, products.author, book_filename.filename, seller.name FROM orders JOIN products ON orders.productId=products.productId JOIN book_filename ON products.fileId = book_filename.fileId JOIN seller ON products.sellerId = seller.sellerId where orders.userId = ?;', [window.sessionStorage.getItem('userId')], function(response){
        // console.log(response[1][1][0])
        if (response[0] === true){
            populateProducts(response[1][1]);
        }
        else{
            alert('Your Wishlist is Empty!')
            return false;
        }
    });

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
        pro_frow.innerHTML += '<div class="pro-wrpr" data-cartId=' + value['productId'] + ' ><div class="pro-buy-cont pro-buy-cont-af"><div class="pro-i-wrapper pro-i-wrapperaf"><div class="pro-i pro-frow-i1 pro-i-buy" style="background-image: url(\'userData/images/' + value['filename'] + '\');"></div></div></div><div class="pro-opt pro-opt-af"><div class="pro-i-det pro-i-detaf"><div><p class="pro-name">' + value['title'] + '</p><p class="pro-author">' + value['author'] + '</p><p class="pro-author">' + value['name'] + '</p><div class="pro-prices"><p class="pro-rel-price pro-rel-priceaf">₹' + value['total'] + '</p></div></div></div></div></div>';
    });
}

function cart_pro_rmv_btn_clicked(element){
    console.log(element);
    let query = 'delete from wishlist where wishlistId = ?';
    queryMe('query/addWishlist',query, [element.offsetParent.getAttribute('data-cartid')], function(response){
        // console.log(response[1][1][0])
        if (response[0] === true){
            location.reload();

        }
        else{
            alert('Your Wishlist is Empty!')
            return false;
        }
    });
}

function order_add_quantity_btn_clicked(element){
    console.log(element)
    if(element.previousElementSibling.textContent < 10){
        let quantity = parseInt(element.previousElementSibling.textContent) + 1;
        element.previousElementSibling.innerHTML = quantity;
        queryMe('query/updateQuantity', 'update cart SET quantity = ? where cartId = ?', [quantity, element.offsetParent.getAttribute('data-cartId')], function(response){
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

function order_sub_quantity_btn_clicked(element){    
    // console.log(element);
    if(element.nextElementSibling.textContent > 1){
        let quantity = parseInt(element.nextElementSibling.textContent) - 1;
        element.nextElementSibling.innerHTML = quantity;
        queryMe('query/updateQuantity', 'update cart SET quantity = ? where cartId = ?', [quantity, element.offsetParent.getAttribute('data-cartId')], function(response){
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
