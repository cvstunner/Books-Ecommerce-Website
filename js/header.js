document.querySelectorAll('.nav-elements-link').forEach((element, index) => {
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
    }, 150*index);
});

// export function onloadHeader() {
//         if(window.sessionStorage.getItem("username") === null){
//             setTimeout(() => {
//                 login_form_wrpr.style.display = "flex";
//                 html.style.overflowY = "hidden";     
//                 user_contxt_menu.style.display = 'none';
//             }, 2000);
//             // sub_cont1.style.opacity = "100%";      
//         }
//         else{
//         login_hdr_btn_txt.innerText = "User";
//         login_hdr_btn.style.backgroundColor = "transparent";
//         login_hdr_btn.style.color = "var(--darkGreen2)";
//         login_hdr_btn.style.borderColor = "transparent";
//         login_hdr_btn.style.width = "100%";
//         login_hdr_btn.style.fontWeight = "650";
//         user_arrow_txt.style.display = "block";
//         user_contxt_menu.style.display = 'flex';
//         }
//     }

// export {onloadHeader};