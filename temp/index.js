// import onloadHeader from './js/header.js';

let user_login_status = null;
let sub_cont1 = document.getElementsByClassName('sub-cont-1')[0];
let user_contxt_menu = document.getElementById('user-contxt-menu');
let sellbks_hdr_txt = document.getElementById('sellbks-hdr-txt');
let ads = document.getElementById('ads');
let hdr_srch_input = document.getElementById('hdr-srch-input');
let hdr_cart_txt = document.getElementById('hdr-cart-txt');
let wishlist_hdr_txt = document.getElementById('wishlist-hdr-txt');
let orders_hdr_txt = document.getElementById('orders-hdr-txt');
let account_hdr_txt = document.getElementById('account-hdr-txt');
let catg_hdr_btn_wrpr = document.getElementById('catg-hdr-btn-wrpr');
let login_form_wrpr = undefined;
let pro_wrpr = undefined;
let status = undefined;

window.onload = () => {
    // console.log(window.sessionStorage.setItem("username", null));
    login_form_wrpr = document.getElementsByClassName('login-form-wrpr')[0];
    login_close_btn.addEventListener('click', login_close_btn_clicked);

    let i_login_btn = document.getElementById('login-btn');
        i_login_btn.addEventListener('click', submitForm);
    // user_login_status = window.sessionStorage.getItem("username");
    // console.log("see1: ", typeof(user_login_status));
    // onloadHeader();
    if(window.sessionStorage.getItem("username") === null){
        setTimeout(() => {
            login_form_wrpr.style.display = "flex";
            html.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';
            setTimeout(() => {
                document.getElementById('user-signin-username').focus();
            }, 300);
        }, 1600);
        // sub_cont1.style.opacity = "100%";    
    }
    else{
        document.getElementById('hdr-srch-input').focus();
        login_hdr_btn_txt.innerText = "User";
        login_hdr_btn.style.backgroundColor = "transparent";
        login_hdr_btn.style.color = "var(--darkGreen2)";
        login_hdr_btn.style.borderColor = "transparent";
        login_hdr_btn.style.width = "100%";
        login_hdr_btn.style.fontWeight = "650";
        user_arrow_txt.style.display = "block";
        user_contxt_menu.style.display = 'flex';
        queryMe('query/status', 'SELECT 1 from admin where userId = ?', [window.sessionStorage.getItem('userId')], function (response){
            console.log(response);
            if (response[0] === true){
                if (response[1][1] === null){
                    account_hdr_txt.innerText = 'Account';
                    status = 0;
                }
                else{
                    account_hdr_txt.innerText = 'Admin';
                    status = 1;
                }
            }
        });
    }
    populateCatgCntxt();
    queryMe('query/trend', 'SELECT * FROM trends', null, function(response){
            if (response[0] === true){
                console.log(response);
                let query = '';
                let catgQuery = '';
                response[1][1].forEach((value, index) => {
                    if (value['category'] !== 'All'){
                        catgQuery = ' AND products.category = ?';
                    }
                    else{
                        catgQuery = '';
                    }

                    query = 'SELECT products.productId, products.title, products.author, products.category, products.ratings, products.quantity, products.MRP_price, products.retail_price, book_filename.filename FROM products JOIN book_filename ON products.fileId = book_filename.fileId where products.quantity > 0 AND products.retail_price >= ? AND products.retail_price <= ?' + catgQuery;

                    queryMe('query/trend', query, [parseInt(value['price_from']), parseInt(value['price_to']), value['category']], function(data){
                            console.log(data)
                            if (data[0] === true){
                                populateHome(data[1][1], value['title']);
                            }
                            else{

                            }
                    });
                });
            }
            else{
            }
    });
    ads.style.display = 'block';
    hdr_srch_input.value = '';
    window.sessionStorage.setItem('page', 0);
};


sellbks_hdr_txt.addEventListener('click', sellbks_hdr_txt_clicked);
hdr_cart_txt.addEventListener('click', hdr_cart_txt_clicked);
account_hdr_txt.addEventListener('click', account_hdr_txt_clicked);
wishlist_hdr_txt.addEventListener('click', wishlist_hdr_txt_clicked);
orders_hdr_txt.addEventListener('click', orders_hdr_txt_clicked);

function account_hdr_txt_clicked() {
    if(window.sessionStorage.getItem("username") === null){
        login_form_wrpr.style.display = "flex";
        html.style.overflowY = "hidden";     
        user_contxt_menu.style.display = 'none';    
    }
    else{
        console.log('status: ', status);
        if(status === 0){
            location.href = "../user.html";
        }
        else{
            location.href = "../admin.html";
        }
    }
}

function wishlist_hdr_txt_clicked() {
        if(window.sessionStorage.getItem("username") === null){
            login_form_wrpr.style.display = "flex";
            html.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';    
        }
        else{
            location.href = "../wishlist.html";
        }
}

function orders_hdr_txt_clicked() {
        if(window.sessionStorage.getItem("username") === null){
            login_form_wrpr.style.display = "flex";
            html.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';    
        }
        else{
            location.href = "../orders.html";
        }
}

function hdr_cart_txt_clicked() {
        if(window.sessionStorage.getItem("username") === null){
            login_form_wrpr.style.display = "flex";
            // html.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';    
        }
        else{
            location.href = "../cart.html";
        }
}

function sellbks_hdr_txt_clicked(){
        if(window.sessionStorage.getItem("username") === null){
            login_form_wrpr.style.display = "flex";
            html.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';    
        }
        else{
            location.href = "../userProducts.html";
        }
}

// document.querySelectorAll('.nav-elements-link').forEach(link => {
//     if(link.href === window.location.href){
//         if (link.href === "file:///C:/My_Programs/Web_Development/Landing_Page/login.html") {
//             link.setAttribute('aria-current', "location");
//             console.log('fck');
//             // acc_icon.style.backgroundImage = "url(icons/acc_grey.png)";
//         }
//         else{            
//             link.setAttribute('aria-current', "page")
//         }        
//         console.log(link.href, window.location.href);
//     }
// })


let login_close_btn = document.getElementById('login-close-btn');
let body = document.getElementById('body');
let login_hdr_btn = document.getElementById('login-hdr-btn');
login_hdr_btn.addEventListener('click', login_hdr_btn_clicked);
let logout_contxt_txt = document.getElementById('logout-contxt-txt');
let html = document.getElementById('html');
logout_contxt_txt.addEventListener('click', logout_contxt_txt_clicked);

function login_hdr_btn_clicked(){
    user_login_status = window.sessionStorage.getItem("username");
    console.log(user_login_status)
    if(user_login_status == null){
            login_form_wrpr.style.display = "flex";
            console.log('login btn hitted');
            html.style.overflowY = "hidden";     
            body.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';  
            setTimeout(() => {
                document.getElementById('user-signin-username').focus();
            }, 300);      
    }
}

function login_close_btn_clicked(){
    login_form_wrpr.style.display = "none";
    html.style.overflowY = "visible";
    body.style.overflowY = "visible";
}

function logout_contxt_txt_clicked(){
    login_hdr_btn_txt.innerText = "Login";
    login_hdr_btn.style.backgroundColor = "rgb(140,73,93)";
    login_hdr_btn.style.color = "rgb(198,163,163)";
    login_hdr_btn.style.borderColor = "rgb(160,93,113)";
    login_hdr_btn.style.width = "90px";
    login_hdr_btn.style.fontWeight = "500";
    user_arrow_txt.style.display = "none";
    user_login_status = window.sessionStorage.removeItem("username");
    user_contxt_menu.style.display = 'none';
    login_form_wrpr.style.display = "none";
    html.style.overflowY = "visible";
}

let pro_wishlist_btn_status = 0;

let pro_buy_det = document.getElementsByClassName('pro-buy-det')[0];
let pro_wrpr_status = 0;


// function setData(data){
//     eData = data;
// }

function getData(){
    return eData;
}



// acc_icon.addEventListener('mouseover', acc_logo_hovered);
// acc_icon.addEventListener('mouseleave', acc_logo_hovered_leave);

// let acc_contxt_menu = document.getElementById('acc-contxt-menu');
// let acc_logo_wrapper = document.getElementsByClassName('acc-logo-wrapper')[0];

// function acc_logo_hovered(e){
//     console.log('hovering Enters')
//     e.stopPropagation();
//     acc_contxt_menu.style.display = "block";
//     acc_logo_wrapper.style.display = "block";
// }
// function acc_logo_hovered_leave(e){
//     console.log('hovering leave')
//     e.stopPropagation();
//     acc_contxt_menu.style.display = "none";
//     acc_logo_wrapper.style.display = "none";
// }

// let drpmenu_acc_txt = document.getElementById('drpmenu-acc-txt');
// drpmenu_acc_txt.addEventListener('mouseover', drpmenu_acc_txt_hovered);
// drpmenu_acc_txt.addEventListener('mouseleave', drpmenu_acc_txthovered_leave);

// let acc_contxt_sub_menu = document.getElementById('acc-contxt-sub-menu');
// // let acc_logo_wrapper = document.getElementsByClassName('acc-logo-wrapper')[0];

// function drpmenu_acc_txt_hovered(e){
//     console.log('Sub hovering Enters');
//     e.stopPropagation();
//     acc_contxt_sub_menu.style.display = "block";
// }
// function drpmenu_acc_txthovered_leave(e){
//     console.log('Sub hovering leave');
//     e.stopPropagation();
//     acc_contxt_sub_menu.style.display = "none";
// }

// let signup_btn = document.getElementById('signup-btn');
// if(signup_btn !== null){
//     signup_btn.addEventListener('click', signUp);
// }

let login_hdr_btn_txt = document.getElementById('login-hdr-btn-txt');
let user_arrow_txt = document.getElementById('user-arrow-txt');
let login_button = document.getElementById('login-btn');
let sign_status_txt = document.getElementById('sign-status-txt');

function submitForm(e){
    e.preventDefault();
    console.log(login_button.getAttribute('name'));
    if (document.getElementById('user-signin-username').value === '' || document.getElementById('user-signin-pswd').value === ''){
        sign_status_txt.innerText = 'All fields are Mandatory!';
        console.log('All fields are Mandatory!');
        return;
    }
    if(login_button.getAttribute('name') === 'signin-btn'){
        let username = document.getElementById('user-signin-username').value;
        let password = document.getElementById('user-signin-pswd').value;
        fetch('auth/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'signin-username': username, 'signin-password': password, 'signin-btn':''})
        }).then(async function(res) {
            if (res.status === 401 || res.status === 404 || res.status === 200) {
                return [res.status, await res.json()];
            }
        }).then(function(data) {
            console.log(data);
            if (data[0] === 200) {
                setTimeout(() => {
                    document.getElementById('hdr-srch-input').focus();
                }, 300);
                window.sessionStorage.setItem("username", data['1']['username']);
                window.sessionStorage.setItem("userId", data['1']['userId']);
                login_form_wrpr.style.display = "none";
                html.style.overflowY = "visible";    
                body.style.overflowY = "visible"; 
                login_hdr_btn_txt.innerText = "User";
                login_hdr_btn.style.backgroundColor = "transparent";
                login_hdr_btn.style.color = "var(--darkGreen2)";
                login_hdr_btn.style.borderColor = "transparent";
                login_hdr_btn.style.width = "100%";
                login_hdr_btn.style.fontWeight = "650";
                user_arrow_txt.style.display = "block";
                user_contxt_menu.style.display = 'flex';
                if (data[1]['status'] === null){
                    account_hdr_txt.innerText = 'Account';
                    status = 0;
                }
                else{
                    account_hdr_txt.innerText = 'Admin';
                    status = 1;
                }
            }
            else if(data[0] === 401){
                sign_status_txt.innerText = 'Wrong Crediantials!';
            }
            else if(data[0] === 404){
                sign_status_txt.innerText = "User doesn't exist!";
            }
        }).catch(function(err) {
            console.log(err);
            alert('Error');
        });
    }
    else if(login_button.getAttribute('name') === 'signup-btn'){
        let name     = document.getElementById('user-signup-name').value;
        let age      = document.getElementById('user-signup-age').value;
        let gender   = document.getElementById('user-signup-gender').value;
        let contact  = document.getElementById('user-signup-contact').value;
        let email    = document.getElementById('user-signup-email').value;
        let username = document.getElementById('user-signup-username').value;
        let password = document.getElementById('user-signup-pswd').value;
        let cnfpswd  = document.getElementById('user-signup-cnfpswd').value;

        fetch('auth/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'signup-name': name, 'signup-age': age, 'signup-gender': gender, 'signup-contact': contact, 'signup-email': email, 'signup-username': username, 'signup-password': password, 'signup-btn':''})
        }).then(async function(res) {
            if (res.status === 401) {
                return [res.status, await res.json()];
            }
            else if(res.status === 404){
                return [res.status, await res.json()];
            }
            else if(res.status === 200){
                return [res.status, await res.json()];
            }
        }).then(function(data) {
            console.log(data);
            if (data[0] === 200) {
                setTimeout(() => {
                    document.getElementById('hdr-srch-input').focus();
                }, 300);
                window.sessionStorage.setItem("username", data['1']['username']);
                window.sessionStorage.setItem("userId", data['1']['userId']);
                login_form_wrpr.style.display = "none";
                html.style.overflowY = "visible"; 
                body.style.overflowY = "visible"; 
                login_hdr_btn_txt.innerText = "User";
                login_hdr_btn.style.backgroundColor = "transparent";
                login_hdr_btn.style.color = "var(--darkGreen2)";
                login_hdr_btn.style.borderColor = "transparent";
                login_hdr_btn.style.width = "100%";
                login_hdr_btn.style.fontWeight = "650";
                user_arrow_txt.style.display = "block";
                user_contxt_menu.style.display = 'flex';
            }
            else if(data[0] === 401){
                alert('Something went wrong!');
            }
            else if(data[0] === 404){
                alert('username Already taken!');
            }
        }).catch(function(err) {
            console.log(err);
            alert('Error');
        });
    } 
}


let catg_contxt_menu = document.getElementById('catg-contxt-menu');

catg_hdr_btn_wrpr.addEventListener('mouseover', () => {
    catg_hdr_btn_wrpr.classList.add('catg-hdr-btn-wrpr-hover');
    html.style.overflowY = "hidden"
});
catg_hdr_btn_wrpr.addEventListener('mouseleave', () => {
    html.style.overflowY = "visible";
    setTimeout(() => {
    }, 300);
});

let login_hdr_btn_wrpr = document.getElementsByClassName('login-hdr-btn-wrpr')[0];
login_hdr_btn_wrpr.addEventListener('mouseover', () => {
    html.style.overflowY = "hidden";
});
login_hdr_btn_wrpr.addEventListener('mouseleave', () => {
    html.style.overflowY = "visible";
    setTimeout(() => {
    }, 300);
});


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

// Populating Category Main page Products
// let pro_frow = document.getElementsByClassName('pro-frow')[0]; 
let pro_items_wrapper = document.getElementsByClassName('pro-items-wrapper')[0];

function populateHome(data, title) {
    let htmlText = '';
    let count = undefined;
    data.forEach((value, index) => {
        console.log(value['filename'], index);
        htmlText += '<div class="pro-wrpr" data-productid=' + value['productId'] + ' onclick="event.stopPropagation(); pro_wrpr_clicked(this)"><div class="pro-i-wrapper"><div class="pro-i" style="background-image: url(\'userData/images/' + value['filename'] + '\');"></div></div><div class="pro-i-det"><p class="pro-ratings">4.5★</p><div class="pro-name-wrpr"><p class="pro-name">' + value['title'] +'</p></div><p class="pro-author">' + value['author'] +'</p><div class="pro-prices"><p class="pro-mrp-price">' + value['MRP_price'] +'</p><p class="pro-rel-price">₹' + value['retail_price'] +'</p><button class="pro-wshlst-btn emt-hrt-icon" value="unchecked" onclick="event.stopPropagation(); pro_wishlist_btn_clicked(this)"></button></div></div></div>';
    });
    pro_items_wrapper.innerHTML += '<div class="pro-frow"><div class="pro-frow-catg">' + title + '</div><div class="pro-all-wrpr"><button class="pro-scroll-btn pro-scrollLeft-btn" onclick="scrollRightBtnClicked(this, 0)"><</button>' + htmlText + '<button class="pro-scroll-btn pro-scrollRight-btn" onclick="scrollRightBtnClicked(this, 1)">></button></div></div>';
    // let pro_scroll_btn = document.querySelectorAll('.pro-scroll-btn');
    // pro_name.forEach((value, index) => {
    // });
    let pro_name = document.querySelectorAll('.pro-name');
    pro_name.forEach((value, index) => {
        console.log(pro_name[index].clientWidth)
        if (pro_name[index].clientWidth >= 140 && pro_name[index].clientWidth <= 165) {
            pro_name[index].style.animation = 'scroll-left-1s 7s linear infinite';
        }
        else if (pro_name[index].clientWidth >= 165 && pro_name[index].clientWidth <= 200) {
            pro_name[index].style.animation = 'scroll-left-2s 8.5s linear infinite';
        }
        else if (pro_name[index].clientWidth >= 200 && pro_name[index].clientWidth <= 250) {
            pro_name[index].style.animation = 'scroll-left-3s 10s linear infinite';
        }
        else if (pro_name[index].clientWidth >= 250 && pro_name[index].clientWidth <= 300) {
            pro_name[index].style.animation = 'scroll-left-4s 11.5s linear infinite';
        }
    });
}

// 0 - left  1 - Right
function scrollRightBtnClicked(element, direction){
    // element.scrollIntoView({
    //     behavior: 'smooth'
    // });
    element.offsetParent.scrollLeft = 0;
    console.log(element.offsetParent);
    if (direction === 1) {
        element.offsetParent.scrollLeft += 1437;
        console.log(element.offsetParent.scrollLeft, element.offsetParent.scrollLeftMax);
        element.offsetParent.firstChild.style.visibility = 'visible';
        // if (element.offsetParent.scrollLeft === element.offsetParent.scrollLeftMax){
        //     element.offsetParent.firstChild.style.visibility = 'hidden';
        // }
    }
    else{
        element.offsetParent.scrollLeft -= 1437;
        if (element.offsetParent.scrollLeft <= 1437){
            element.offsetParent.firstChild.style.visibility = 'hidden';
        }
    }
}

// function scrollRightBtnClicked(element){
//     // element.scrollIntoView({
//     //     behavior: 'smooth'
//     // });
//     console.log(element.offsetParent.firstChild);
//     element.offsetParent.scrollLeft += 1437;
//     if (element.offsetParent.scrollLeft !== 0){
//         element.offsetParent.firstChild.visibility = 'visible';
//     }
//     console.log(element.offsetParent.scrollLeft);
// }

async function pro_wrpr_clicked(element){
    // e.stopPropagation();
    let eData = undefined;
    // data = element.childNodes[0].childNodes[0].style.backgroundImage;
    // console.log("op", element); 
    // let productId = element.dataset.productid;
    // let ratings = element.childNodes[1].childNodes[0].innerText;
    // let title = element.childNodes[1].childNodes[1].innerText;
    // let author = element.childNodes[1].childNodes[2].innerText;
    // let mrp_price = element.childNodes[1].childNodes[3].childNodes[0].innerText;
    // let rel_price = element.childNodes[1].childNodes[3].childNodes[1].innerText;

    queryMe('query/prodet', 'Select quantity from products where productId = ?', [element.dataset.productid], function (response){
        console.log(response[1][1][0]['quantity'])
        if (response[0] === true){
            window.sessionStorage.setItem('pro_quantity', response[1][1][0]['quantity']);
        }
        else{
            return false;
        }
    });

    let data = {'productId': element.dataset.productid, 'img': element.childNodes[0].childNodes[0].style.backgroundImage, 'title': element.childNodes[1].childNodes[1].innerText, 'author': element.childNodes[1].childNodes[2].innerText, 'MRP_price': element.childNodes[1].childNodes[3].childNodes[0].innerText, 'retail_price': element.childNodes[1].childNodes[3].childNodes[1].innerText, 'ratings': element.childNodes[1].childNodes[0].innerText};
    // let productId = element.attributes[1]['nodeValue'];
    for(let key in data) {
        await window.sessionStorage.setItem(key, data[key]);
    };
    pro_wrpr_status = 1;
    window.location.href = "./product.html";
} 

function pro_wishlist_btn_clicked(element){
    console.log(element);

    if(element.value === 'unchecked'){
        element.classList.remove("emt-hrt-icon");
        element.classList.add("red-hrt-icon");
        element.value = 'checked'
        let values = [element.offsetParent.getAttribute('data-productid'), window.sessionStorage.getItem('userId'), element.offsetParent.getAttribute('data-productid'), window.sessionStorage.getItem('userId')]
        queryMe('query/addWishlist', 'INSERT into wishlist (productId, userId) Select ?, ? where NOT EXISTS (Select * from wishlist where productId = ? and userId = ?)', values, function (response){
            if (response[0] === true && response[1][1].affectedRows === 1) {
                console.log('client-Wishlist', response[1][1].affectedRows);
                // alert('Book added to Wishlist!');
            }
            else if(response[0] === true && response[1][1].affectedRows === 0){
                alert('Book already in Wishlist!');
            }
            else{
                return;
            }
        });
        console.log("hrt is red, ", pro_wishlist_btn_status);
    }
    else{
        element.classList.remove("red-hrt-icon");
        element.classList.add("emt-hrt-icon");
        let values = [element.offsetParent.getAttribute('data-productid'), window.sessionStorage.getItem('userId')]
        queryMe('query/addWishlist', 'delete from wishlist where productId = ? and userId = ?', values, function (response){
            if (response[0] === true) {
                console.log('client-Wishlist', response);
                alert('Book removed from Wishlist!');
            }
            else{
                return;
            }
        });
        console.log("hrt is empty, ", pro_wishlist_btn_status);
        element.value = 'unchecked';
    }
}

function callback(data){
    return data;
}

function populateProducts(query, values, callback){
    fetch('populate/products', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'query': query, 'values': values})
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        callback(data);
    }).catch(function(err) {
        console.log(err);
        alert('Error');
    });
}

// Header Sesrch Bar Query
hdr_srch_input.addEventListener('keypress', hdr_srch_input_entered);

function genHTMLText(start, body, end) {
    return start + body + end;
}

function populateSearchedProducts(data){
    let count = 0;
    let htmlText = '';
    data.forEach((value, index) => {
        console.log(value['filename'], index);
        htmlText += '<div class="pro-wrpr" style="margin: 2em 2.25em 2em 2.25em" data-productid=' + value['productId'] + ' onclick="event.stopPropagation(); pro_wrpr_clicked(this)"><div class="pro-i-wrapper"><div class="pro-i pro-frow-i1" style="background-image: url(\'userData/images/' + value['filename'] + '\');"></div></div><div class="pro-i-det"><p class="pro-ratings">4.5★</p><div class="pro-name-wrpr"><p class="pro-name">' + value['title'] +'</p></div><p class="pro-author">' + value['author'] +'</p><div class="pro-prices"><p class="pro-mrp-price">' + value['MRP_price'] +'</p><p class="pro-rel-price">₹' + value['retail_price'] +'</p><button class="pro-wshlst-btn emt-hrt-icon" value="unchecked" onclick="event.stopPropagation(); pro_wishlist_btn_clicked(this)"></button></div></div></div>'
    });
    pro_items_wrapper.innerHTML = '<div class="pro-frow"><div class="pro-all-wrpr">' + htmlText + '</div></div>';
    let pro_all_wrpr = document.getElementsByClassName('pro-all-wrpr')[0];
    // pro_frow.style.overflowX = 'hidden';
    pro_all_wrpr.style.flexWrap = 'wrap';
    let pro_name = document.querySelectorAll('.pro-name');
    pro_name.forEach((value, index) => {
        console.log(pro_name[index].clientWidth)
        if (pro_name[index].clientWidth >= 140 && pro_name[index].clientWidth <= 165) {
            pro_name[index].style.animation = 'scroll-left-1s 7s linear infinite';
        }
        else if (pro_name[index].clientWidth >= 165 && pro_name[index].clientWidth <= 200) {
            pro_name[index].style.animation = 'scroll-left-2s 8.5s linear infinite';
        }
        else if (pro_name[index].clientWidth >= 200 && pro_name[index].clientWidth <= 250) {
            pro_name[index].style.animation = 'scroll-left-3s 10s linear infinite';
        }
        else if (pro_name[index].clientWidth >= 250 && pro_name[index].clientWidth <= 300) {
            pro_name[index].style.animation = 'scroll-left-4s 11.5s linear infinite';
        }
    });
}

function hdr_srch_input_entered(e){
    if (e.key === 'Enter') {    
        e.preventDefault(); 
        // pro_frow.style.flexWrap = 'wrap';
        let value = ['%' + hdr_srch_input.value + '%', '%' + hdr_srch_input.value + '%', '%' + hdr_srch_input.value + '%', '%' + hdr_srch_input.value + '%'];
        populateProducts("SELECT products.productId, products.title, products.author, products.category, products.ratings, products.quantity, products.MRP_price, products.retail_price, book_filename.filename, description.description FROM products JOIN book_filename ON products.fileId = book_filename.fileId JOIN description ON products.dscpId = description.dscpId where products.title like ? OR products.author like ? OR products.category like ? OR description.description like ?", value, function (data){
            populateSearchedProducts(data);
            ads.style.display = 'none';
        });
    // window.sessionStorage.setItem('page', 8);
    }
}

function catg_contxt_menu_txt_clicked(e) {
    let value = e.innerText;
    // pro_frow.style.flexWrap = 'wrap';
    console.log(e);
    populateProducts("SELECT products.productId, products.title, products.author, products.category, products.ratings, products.quantity, products.MRP_price, products.retail_price, book_filename.filename FROM products JOIN book_filename ON products.fileId = book_filename.fileId WHERE category = ?", value, function (data){
            populateSearchedProducts(data);
            catg_hdr_btn_wrpr.classList.remove('catg-hdr-btn-wrpr-hover');
            html.style.overflowY = "visible";
            ads.style.display = 'none';
        });
    // window.sessionStorage.setItem('page', 7);
}

function response(data) {
    return data;
}

// function queryMe(route, query, data, response){
//     fetch(route, {
//         method: 'post',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({values: data, 'query': query})
//     }).then(async function(res) {
//         console.log(res);
//         if (res.status === 200){
//             return [res.status, await res.json()];
//         }
//         else{
//             return [res.status, await res.json()];
//         }
//     }).then(function(data) {
//         if (data[0] === 200){
//             console.log(route, " queryMe:" ,data);
//             response([true, data]);
//         }
//         else{
//             response([false, null]);
//         }
//     }).catch(function(err) {
//         console.log(err);
//         alert('Error');
//     });
// }

function queryMe(route, method, data, response){
    if (method !== 'get'){
        fetch(route, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
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
}