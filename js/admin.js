let add_trend_btn = document.getElementById('add-trend-btn');
add_trend_btn.addEventListener('click', add_trend_btn_clicked);
let trend_title_input = document.getElementById('trend-title-input');
let trend_bookCatg_input = document.querySelector('#trend-bookCatg-input');
let trend_ratingFrom_input = document.getElementById('trend-ratingFrom-input');
let trend_ratingTo_input = document.getElementById('trend-ratingTo-input');
let trend_priceFrom_input = document.getElementById('trend-priceFrom-input');
let 
trend_priceTo_input = document.getElementById('trend-priceTo-input');

let tb1_body = document.getElementById('tb1-body');

window.onload = () => {
    if(window.sessionStorage.getItem("username") === null){
        setTimeout(() => {
            login_form_wrpr.style.display = "flex";
            html.style.overflowY = "hidden";     
            user_contxt_menu.style.display = 'none';
        }, 2000);
        // sub_cont1.style.opacity = "100%";      
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
	queryMe('query/trend', 'post', 'SELECT * FROM trends', null, function (data){
        if (data[0] === true){
        	console.log(data);
        	populateHome(data[1][1]);
        }
        else{
        }
	});
}

function add_trend_btn_clicked(){
    let trend_bookCatg_input_value = trend_bookCatg_input.options[trend_bookCatg_input.selectedIndex].textContent;
	queryMe('query/trend', 'post', 'INSERT INTO trends (title, category, rating_from, rating_to, price_from, price_to) values (?, ?, ?, ?, ?, ?)', [trend_title_input.value, trend_bookCatg_input_value, trend_ratingFrom_input.value, trend_ratingTo_input.value, trend_priceFrom_input.value, trend_priceTo_input.value], function (data){
        if (data[0] === true){
        	// alert('trend Added!');
			queryMe('query/trend', 'post', 'SELECT * FROM trends', null, function (data){
		        if (data[0] === true){
		        	console.log(data);
		        	populateHome(data[1][1]);
		        }
		        else{
		        }
			});
        }
        else{
        	alert('trend Failed!');
        }
	});

}


function populateHome(data) {
    let htmlText = '';
    data.forEach((value, index) => {
        console.log(value['filename'], index);
        let rating_flag = '';
        let price_flag = '';
        let up_style = '';
        let down_style = '';
        if (value['rating_from'] !== '' && value['rating_to'] !== ''){
        	rating_flag = '★';
        }
        else {
        	rating_flag = '';
        }
        if (value['price_from'] !== '' && value['price_to'] !== ''){
        	price_flag = '₹';
        }
        else {
        	price_flag = '';
        }
        if (index === 0){
        	up_style = 'style="display: none;"';
        }
        else{
        	up_style = '';
        }
        if (index === data.length - 1){
        	down_style = 'style="display: none;"';
        }
        else{
        	down_style = '';
        }


        htmlText += '<ul name=' + value['trendId']+ '><li class="tb-td1">' + value['title'] + '</li><li class="tb-td2">' + value['category'] + '</li><li class="tb-td3">' + (value['rating_from'] + rating_flag + ' - ' + value['rating_to'] + rating_flag) + '</li><li class="tb-td4">' + (value['price_from'] + price_flag + ' - ' +  value['price_to'] + price_flag) + '</li><li class="tb-td5"><button onclick="trend_del_btn_clicked(this)">delete</button><button onclick="trend_up_btn_clicked(this)" ' + up_style + '>up</button><button onclick="trend_down_btn_clicked(this)"' + down_style + '>down</button></li></ul>'
    });
    tb1_body.innerHTML = htmlText;
    // let pro_scroll_btn = document.querySelectorAll('.pro-scroll-btn');
    // pro_name.forEach((value, index) => {
    // });
    // let pro_name = document.querySelectorAll('.pro-name');
    // pro_name.forEach((value, index) => {
    // });
}

function trend_down_btn_clicked(element){
	console.log(element.parentNode.parentNode.nextSibling.getAttribute('name'), element.parentNode.parentNode.getAttribute('name'));
	let id1 = element.parentNode.parentNode.nextSibling.getAttribute('name');
	let id2 = element.parentNode.parentNode.getAttribute('name');
	queryMe('query/trend', 'post', 'UPDATE trends set trendId = 0 where trendId = ?;UPDATE trends set trendId = ? where trendId = ?;UPDATE trends set trendId = ? where trendId = 0;', [id2, id2, id1, id1], function (data){
        if (data[0] === true){
        	console.log(data);
			queryMe('query/trend', 'post', 'SELECT * FROM trends', null, function (data){
		        if (data[0] === true){
		        	console.log(data);
		        	populateHome(data[1][1]);
		        }
		        else{
		        }
			});
        }
        else{
        }
	});
}

function trend_up_btn_clicked(element){
	console.log(element.parentNode.parentNode.previousSibling.getAttribute('name'), element.parentNode.parentNode.getAttribute('name'));
	let id1 = element.parentNode.parentNode.previousSibling.getAttribute('name');
	let id2 = element.parentNode.parentNode.getAttribute('name');
	queryMe('query/trend', 'post', 'UPDATE trends set trendId = 0 where trendId = ?;UPDATE trends set trendId = ? where trendId = ?;UPDATE trends set trendId = ? where trendId = 0;', [id1, id1, id2, id2], function (data){
        if (data[0] === true){
        	console.log(data);
			queryMe('query/trend', 'post', 'SELECT * FROM trends', null, function (data){
		        if (data[0] === true){
		        	console.log(data);
		        	populateHome(data[1][1]);
		        }
		        else{
		        }
			});
        }
        else{
        }
	});
}

function trend_del_btn_clicked(element){
	queryMe('query/trend', 'post', 'DELETE FROM trends where trendId = ?', [element.parentNode.parentNode.getAttribute('name')], function (data){
        if (data[0] === true){
        	console.log(data);
			queryMe('query/trend', 'post', 'SELECT * FROM trends', null, function (data){
		        if (data[0] === true){
		        	console.log(data);
		        	populateHome(data[1][1]);
		        }
		        else{
		        }
			});
        }
        else{
        }
	});
}

function queryMe(route, method, query, data, response){
	if(method === 'post'){
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
	else {
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
}
