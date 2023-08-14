const validate = {
    isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}
function checkLogin(){
    let login= document.getElementsByClassName("Login")[0];
    let logout = document.getElementsByClassName("Logout")[0];
    let register = document.getElementsByClassName("Register")[0];
    let user = document.getElementsByClassName("user")[0];
    if (localStorage.getItem("Login")) {
        login.style.display="none"
        register.style.display="none";
        logout.style.display="block";
        user.style.display="block"
        user.innerText =`Xin chào ` + JSON.parse(localStorage.getItem("Login")).username;
    }else {
        login.style.display="block"
        register.style.display="blocl";
        logout.style.display="none";
        user.style.display="none"
    }
}
checkLogin();
//Login User
function login(e) {
    e.preventDefault();

    //Kiểm tra định dạng Email
    if (!(validate.isEmail(e.target.mail.value))){
        document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
        Email không đúng định dạng! </div>`
        return;
    }
//Lấy người dùng trên local
    let users=JSON.parse(localStorage.getItem("users"));
    if (users) {
        let checkLogin={
            mail: e.target.mail.value,
            password: e.target.password.value,
        }
        let user;
        //Kiểm tra email từng đăng ký chưa
        for (let i = 0; i<users.length; i++){
            if (users[i].mail == checkLogin.mail){
                user = users[i];
            }else{
                document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
                    Người dùng không tồn tại!</div>`
                    return;
                }
        }
        if(user){
            //Kiểm tra mật khẩu
            if(user.password == checkLogin.password){
                document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-success" role="alert">
                Đăng nhập thành công </div>`;
                localStorage.setItem("Login",JSON.stringify(user));
                setTimeout(()=> {
                    window.location.href='../index.html'
                }
                ,3000);
            }
            else {
                document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
                Sai mật khẩu! </div>`
                return;
            }
        } 
    }
    else{
        document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
        Server bận! Tạo tài khoản mới?</div>`
        return;
    }
}