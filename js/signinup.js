let signin_txt_btn = document.getElementById('signin-txt-btn');
let signup_txt_btn = document.getElementById('signup-txt-btn');
let login_btn = document.getElementById('login-btn');
let login_close_wrapper = document.getElementById('login-close-wrapper');
let sub_cont_1 = document.getElementsByClassName('sub-cont-1')[0];
let sub_cont4 = document.getElementsByClassName('sub-cont4')[0];
let main_cont = document.getElementsByClassName('main-cont')[0];
let main_cont2 = document.getElementsByClassName('main-cont2')[0];

signin_txt_btn.addEventListener('click', signin_txt_btn_clicked);
signup_txt_btn.addEventListener('click', signup_txt_btn_clicked);

let signinup_flag = 0

function signin_txt_btn_clicked(){
	// sub_cont_1.classList.remove('login_contnt_ani');
	main_cont.style.width = "400px";
	login_close_wrapper.style.width = "380px";
	main_cont2.style.width = "350px";
	sub_cont_1.style.marginRight = '0px';
	signin_txt_btn.style.backgroundColor = "var(--lightGreenHTMLbg2)";
	signup_txt_btn.style.backgroundColor = "var(--lightGreenHTMLbg3)";
	signin_txt_btn.style.color = "var(--darkGreen2)";
	signup_txt_btn.style.color = "rgb(140, 150, 140)";
	// signin_txt_btn.style.outlineWidth = "2px 2px 0px 2px";
	// signup_txt_btn.style.outlineWidth = "2px 2px 0px 0px";
	signin_txt_btn.style.zIndex = "1";
	signup_txt_btn.style.zIndex = "0";
	signin_txt_btn.style.outlineColor = "var(--darkGreen3)";
	signup_txt_btn.style.outlineColor = "var(--darkGreen4)";

	// sub_cont_1.classList.add('login_contnt_ani');
	sub_cont_1.innerHTML = '<div class="sub-cont-3"><h2 id="sign-status-txt">Please Login To Continue</h2></div><h2>Username</h2><input id="user-signin-username" type="username" name="signin-username" placeholder="Enter your username"><hr><h2>Password</h2><input id="user-signin-pswd" type="password" name="signin-password" placeholder="Enter your password"><hr>';

	sub_cont4.innerHTML = '';

	login_btn.innerText = "SignIn";
	login_btn.setAttribute('name' ,'signin-btn');
	document.title = "Books | SignIn";
}

function signup_txt_btn_clicked(){
	main_cont.style.width = "850px";
	login_close_wrapper.style.width = "830px";
	main_cont2.style.width = "750px";
	sub_cont_1.style.marginRight = '50px';
	signup_txt_btn.style.backgroundColor = "var(--lightGreenHTMLbg2)";
	signin_txt_btn.style.backgroundColor = "var(--lightGreenHTMLbg3)";
	signup_txt_btn.style.color = "var(--darkGreen2)";
	signin_txt_btn.style.color = "rgb(140, 150, 140)";
	// signup_txt_btn.style.outlineWidth = "2px 2px 0px 2px";
	// signin_txt_btn.style.outlineWidth = "2px 0px 0px 2px";
	signup_txt_btn.style.zIndex = "1";
	signin_txt_btn.style.zIndex = "0";
	signup_txt_btn.style.outlineColor = "var(--darkGreen3)";
	signin_txt_btn.style.outlineColor = "var(--darkGreen4)";

	// sub_cont_1.classList.add('login_contnt_ani');
	sub_cont_1.innerHTML = '<h2>Name</h2><input id="user-signup-name" type="text" name="signup-name" placeholder="Enter your name"><hr><h2>Age</h2><input id="user-signup-age" type="text" name="signup-age" placeholder="Enter your age"><hr><h2>Gender</h2><select name="" id="user-signup-gender"><option>Male</option><option>Female</option><option>Others</option></select><h2>Contact</h2><input id="user-signup-contact" type="text" name="signup-contact" placeholder="Enter your contact"><hr>';


	// sub_cont_1.innerHTML = '<h2>Name</h2><input id="user-signup-name" type="text" name="signup-name" placeholder="Enter your name"><hr><h2>Age</h2><input id="user-signup-age" type="text" name="signup-age" placeholder="Enter your age"><hr><h2>Gender</h2><input id="user-signup-gender" type="text" name="signup-gender" placeholder="Enter your gender"><hr><h2>Contact</h2><input id="user-signup-contact" type="text" name="signup-contact" placeholder="Enter your contact"><hr>';

	sub_cont4.innerHTML = '<h2>Email</h2><input id="user-signup-email" type="text" name="signup-email" placeholder="Enter your email"><hr><h2>Username</h2><input id="user-signup-username" type="username" name="signup-username" placeholder="Enter your username"><hr><h2>Password</h2><input id="user-signup-pswd" type="password" name="signup-password" placeholder="Enter your password"><hr><h2>Confirm Password</h2><input id="user-signup-cnfpswd" type="password" name="signup-cnfpswd" placeholder="Enter password again"><hr>';

	login_btn.innerText = "SignUp";
	login_btn.setAttribute('name' ,'signup-btn');
	document.title = "Books | SignUp";
}