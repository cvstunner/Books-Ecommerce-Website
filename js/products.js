// import populateProducts from "./index.js";

let login_hdr_btn_txt = document.getElementById('login-hdr-btn-txt');
let login_hdr_btn = document.getElementById('login-hdr-btn');
let user_arrow_txt = document.getElementById('user-arrow-txt');
let user_contxt_menu = document.getElementById('user-contxt-menu');
let pro_input_txt = document.getElementById('pro-input-txt'); 
let ret_policy_days_input = document.querySelector('#ret-policy-days-input'); 
let ret_policy_yes_input = document.getElementById('ret-policy-yes-input'); 
ret_policy_yes_input.addEventListener('click', ret_policy_input_clicked);
let ret_policy_no_input = document.getElementById('ret-policy-no-input');  
ret_policy_no_input.addEventListener('click', ret_policy_input_clicked);
// let ret_policy_days = 0;

window.onload = () => {
    let seller_name_input = document.getElementById('seller-name-input'); 
    let seller_contact_input = document.getElementById('seller-contact-input'); 
    let seller_email_input = document.getElementById('seller-email-input'); 
    login_hdr_btn_txt.innerText = "User";
    login_hdr_btn.style.backgroundColor = "transparent";
    login_hdr_btn.style.color = "rgb(140,73,93)";
    login_hdr_btn.style.borderColor = "transparent";
    login_hdr_btn.style.width = "100%";
    login_hdr_btn.style.fontWeight = "650";
    user_arrow_txt.style.display = "block";
    user_contxt_menu.style.display = 'flex';
    pro_input_txt.value = '';  
    let username = window.sessionStorage.getItem('username');
    querySelect("Select name, contact, email from users where username = ?", [username], function (data){
        console.log(data)
        seller_name_input.value = data['0']['name'];
        seller_contact_input.value = data['0']['contact'];
        seller_email_input.value = data['0']['email']
    });
};

function ret_policy_input_clicked(){
    if(ret_policy_yes_input.checked){
        ret_policy_days_input.disabled = false;
        ret_policy_days
    }
    else if(ret_policy_no_input.checked){
        ret_policy_days_input.disabled = true;

    }
}

function ret_policy_days(){
    if(ret_policy_yes_input.checked){

        return ret_policy_days_input.options[ret_policy_days_input.selectedIndex].textContent;
    }
    else if(ret_policy_no_input.checked){
        return '0 days';
    }
}

let pro_chse_img_input = document.getElementById('pro-chse-img-input'); 
let pro_frow_i1 = document.getElementsByClassName('pro-frow-i1')[0]; 

let pro_chse_img_input_chng = () => uploadFile(pro_chse_img_input.files[0]);

let filename = '';

let uploadFile = (file) => {
    filename = file.name;
    pro_input_txt.value = file.name;
    let formData = new FormData();
    formData.append('data', file);
    console.log(file , typeof(file));
    fetch('upload/image', {
        method: 'post',
        body: formData
    }).then(async function(res) {
        if (res.status === 200){
            return [res.status, await res.json()];
        }
        else{
            return [res.status, await res.json()];
        }
    }).then(function(data) {
        if (data[0] === 200){
            console.log(data[1]['dir'])
            pro_frow_i1.style.backgroundImage = "url('" + data[1]['dir'] + "')";
            pro_frow_i1.innerText = '';
        }
        else{
            response([false, null]);
        }
    }).catch(function(err) {
        console.log(err);
        alert('Error');
    });
};  

function response(data){
    return data;
}

// pro_chse_img_input.files[0]
pro_chse_img_input.addEventListener('change', pro_chse_img_input_chng, false);


let pro_sell_btn = document.getElementById('pro-sell-btn');
pro_sell_btn.addEventListener('click', pro_sell_btn_clicked);

function pro_sell_btn_clicked(e){
    e.preventDefault();
    let title = document.getElementById('book-title-input').value;
    let author = document.getElementById('book-author-input').value;
    let catg_select = document.querySelector('#book-catg-input');
    let catg = catg_select.options[catg_select.selectedIndex].textContent;
    let quantity = document.getElementById('book-quantity-input').value;
    let MRP_price = document.getElementById('book-MRP-price-input').value;
    let retail_price = document.getElementById('book-retail-price-input').value;
    let dscp = document.getElementById('book-dscp-input').value;

    let book_pages = document.getElementById('book-pages-input').value;
    // let pages_colour = '';
    let pages_colour = document.querySelector('input[name="pages-colour-input"]:checked').getAttribute('data-page-color');
    let ret_policy = ret_policy_days();
    let country_of_origin_select = document.querySelector('#country-of-origin-input');
    let country_of_origin = country_of_origin_select.options[country_of_origin_select.selectedIndex].textContent;
    let userId = window.sessionStorage.getItem('userId');

    console.log('sell pro');
    querySeller(function (response){
        console.log('sellerId: ', response);
        if (response[0] === true){
            fetch('sell/product', {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({'title': title, 'author': author, 'catg': catg, 'quantity': quantity, 'MRP_price': MRP_price, 'retail_price': retail_price, 'dscp': dscp, 'pages': book_pages, 'pages_colour': pages_colour, 'return_policy': ret_policy, 'country_of_origin': country_of_origin, 'filename': filename, 'userId': userId, sellerId: response[1]})
            }).then(function(res) {
                return res.json();
            }).then(function(data) {
                alert('Book Added Succesfully!')
                console.log(data);
                // alert('form submited');
            }).catch(function(err) {
                console.log(err);
                alert('Error');
            });
        }
        else{
            return;
        }
    })
}

function querySeller(response){
    let name = document.getElementById('seller-name-input').value; 
    let contact = document.getElementById('seller-contact-input').value; 
    let email = document.getElementById('seller-email-input').value; 
    // let age = document.getElementById('seller-age-input').value; 
    // let gender = document.querySelector('input[name="seller-gender-input"]:checked').getAttribute('data-seller-gender');
    let idproof_select = document.querySelector('#seller-idproof-input');
    let idproof = idproof_select.options[idproof_select.selectedIndex].textContent;
    let idnumber = document.getElementById('seller-idnumber-input').value;
    let address = document.getElementById('seller-address-input').value;
    let userId = window.sessionStorage.getItem('userId');
    let query = 'Insert INTO seller (name, contact, email, id_proof, id_number, address, userId) values (?, ?, ?, ?, ?, ?, ?)';
    let querySelect = 'Select MAX(sellerId) from seller where userId = ?';
    let values = [name, contact, email, idproof, idnumber, address, userId]

    // JSON.stringify({'name': name, 'age': age, 'gender': gender, 'contact': contact, 'email': email, 'id_proof': idproof, 'id_number': idnumber, 'address': address, 'userId': userId, 'query': query})

    fetch('query/seller', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({values: values, 'query': query})
    }).then(function(res) {
        if (res.status === 200){
            fetch('query/seller', {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({values: userId, 'query': querySelect})
            }).then(async function(res) {
                if (res.status === 200){
                    return [res.status, await res.json()];
                }
                else{
                    return [res.status, await res.json()];
                }
            }).then(function(data) {
                console.log(data)
                if (data[0] === 200){
                    console.log(data[1][0])
                    response([true, data[1][0]['MAX(sellerId)']]);
                }
                else{
                    response([false, null]);
                }
            }).catch(function(err) {
                console.log(err);
                alert('Error');
            });
        }
        else{
            res.json();
        }
        return res.json();
    }).then(function(data) {
        console.log(data);
        // alert('form submited');
    }).catch(function(err) {
        console.log(err);
        alert('Error');
    });
}

function querySelect(query, values, callback){
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