import {query, queryMe} from './query.js';
// const re = require('./query.js');

let acc_pic_input = document.getElementById('acc-pic-input'); 
let acc_pic = document.getElementById('acc-pic'); 
let acc_pic_input_chng = () => uploadFile(acc_pic_input.files[0]);
let filename = '';
let user_signup_name = document.getElementById('user-signup-name');
let user_signup_age = document.getElementById('user-signup-age');
let user_signup_gender = document.getElementById('user-signup-gender');
let user_signup_contact = document.getElementById('user-signup-contact');
let user_signup_email = document.getElementById('user-signup-email');
let user_signup_username = document.getElementById('user-signup-username');
let user_signup_pswd = document.getElementById('user-signup-pswd');
let username_det_txt = document.getElementById('username-det-txt');
user_signup_pswd.value = '********';
let name = undefined;  
let age = undefined;  
let gender = undefined;  
let contact = undefined;  
let email = undefined;  
let username = undefined;  
// username_det_txt.innerText = '5684' 

window.onload = () => {
    if(window.sessionStorage.getItem("username") === null){
        setTimeout(() => {
            login_form_wrpr.style.display = "flex";
            html.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';
        }, 2000);    
    }
    else{
	let login_hdr_btn_txt = document.getElementById('login-hdr-btn-txt');
	let login_hdr_btn = document.getElementById('login-hdr-btn');
	let user_arrow_txt = document.getElementById('user-arrow-txt');
	let user_contxt_menu = document.getElementById('user-contxt-menu');
    login_hdr_btn_txt.innerText = "User";
    login_hdr_btn.style.backgroundColor = "transparent";
    login_hdr_btn.style.color = "var(--darkGreen2)";
    login_hdr_btn.style.borderColor = "transparent";
    login_hdr_btn.style.width = "100%";
    login_hdr_btn.style.fontWeight = "650";
    user_arrow_txt.style.display = "block";
    user_contxt_menu.style.display = 'flex';
    }
	query('api/user?qid=1', 'get', null, function (data){
        if (data[0] === 200 && data[1] === null){
        }
        else{
            acc_pic.style.width = '150px';
            acc_pic.style.height = '150px';
            acc_pic.style.backgroundImage = "url('" + 'userdata/images/' + window.sessionStorage.getItem('username') + '/' + data[1][0]['filename'] + "')"; 
            filename = data[1][0]['filename'];
        }
	});
	query('api/user?qid=2', 'get', null, function (data){
        if (data[0] === 200){
        	user_signup_name.value = name = data[1][0]['name'];
        	user_signup_age.value = age = data[1][0]['age'];
        	user_signup_gender.value = gender = data[1][0]['gender'];
        	user_signup_contact.value = contact = data[1][0]['contact'];
        	user_signup_email.value = email = data[1][0]['email']; 
        	user_signup_username.value = username = data[1][0]['username'];
            username_det_txt.innerText = '@' + data[1][0]['username'];
        }
        else{
        }
	});
}

let save_btn = document.getElementById('save-btn');
save_btn.addEventListener('click', saveBtnClicked);

function saveBtnClicked(){
	query('api/user?qid=3', 'get', null, function (response){
		console.log(response);
        if (response[0] === 200 && response[1][0]['fileId'] === null){
			query('api/user?qid=0', 'put', [filename, user_signup_name.value, user_signup_age.value, user_signup_gender.value, user_signup_contact.value, user_signup_email.value, user_signup_username.value, window.sessionStorage.getItem('userId')], function (data){
		        if (data[0] === 200){
		        	console.log(data);
		        	alert('Account Updated!');
		        }
		        else{
		        }
			});		
		}
        else if (response[0] === 200 && response[1][0]['fileId'] !== null){
			query('api/user?qid=1', 'put', [filename, response[1][0]['fileId'], user_signup_name.value, user_signup_age.value, user_signup_gender.value, user_signup_contact.value, user_signup_email.value, user_signup_username.value, window.sessionStorage.getItem('userId')], function (data){
		        if (data[0] === true){
		        	console.log(data);
		        	alert('Account Updated!');
		        }
		        else{
		        }
			});		
		}
	});
}

let uploadFile = (file) => {
    filename = file.name;
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
            acc_pic.style.width = '150px';
            acc_pic.style.height = '150px';
            acc_pic.style.backgroundImage = "url('" + data[1]['dir'] + "')";
            // acc_pic.innerText = '';
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

acc_pic_input.addEventListener('change', acc_pic_input_chng, false);

// function queryMe(route, method, query, data, response){
// 	if(method === 'post'){
// 	    fetch(route, {
// 	        method: method,
// 	        headers: {
// 	          'Accept': 'application/json',
// 	          'Content-Type': 'application/json'
// 	        },
// 	        body: JSON.stringify({values: data, 'query': query})
// 	    }).then(async function(res) {
// 	        console.log(res);
// 	        if (res.status === 200){
// 	            return [res.status, await res.json()];
// 	        }
// 	        else{
// 	            return [res.status, await res.json()];
// 	        }
// 	    }).then(function(data) {
// 	        if (data[0] === 200){
// 	            console.log(route, " queryMe:" ,data);
// 	            response([true, data]);
// 	        }
// 	        else{
// 	            response([false, null]);
// 	        }
// 	    }).catch(function(err) {
// 	        console.log(err);
// 	        alert('Error');
// 	    });
// 	}
// 	else {
// 		fetch(route, {
// 	        method: method,
// 	        headers: {
// 	          'Accept': 'application/json',
// 	          'Content-Type': 'application/json'
// 	        }
// 	    }).then(async function(res) {
// 	        console.log(res);
// 	        if (res.status === 200){
// 	            return [res.status, await res.json()];
// 	        }
// 	        else{
// 	            return [res.status, await res.json()];
// 	        }
// 	    }).then(function(data) {
// 	        if (data[0] === 200){
// 	            console.log(route, " queryMe:" ,data);
// 	            response([true, data]);
// 	        }
// 	        else{
// 	            response([false, null]);
// 	        }
// 	    }).catch(function(err) {
// 	        console.log(err);
// 	        alert('Error');
// 	    });
// 	}
// }
