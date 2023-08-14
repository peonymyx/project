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
function register(e) {
    e.preventDefault();

    //Kiểm tra định dạng email
    if(!(validate.isEmail(e.target.mail.value))){
        document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
        Email không đúng định dạng!
      </div>`
        return;
    }

    //Kiểm tra mật khẩu có trùng khớp với mật khẩu nhập lại
    if (e.target.password.value != e.target.passwordConfirm.value) {
        document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
        Mật khẩu không trùng khớp!
      </div>`
        return;
    }
    //lấy người dùng trên Local hoặc tạo chuỗi mới
    let users = JSON.parse(localStorage.getItem("users"))||[];

    //Kiểm tra email đã tồn tại chưa
    if (users.find(user => user.mail == e.target.mail.value)) {
        document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
        Email đã tồn tại!
      </div>`
      return;
    }

    //kiểm tra số điện thoại đã tồn tại chưa
    if (users.find(user => user.phone == e.target.phone.value)) {
        document.getElementsByClassName("error")[0].innerHTML=`<div class="alert alert-danger" role="alert">
        Số điện thoại đã tồn tại!
      </div>`
      return;
    }

    //tạo object cho người dùng đó
    let userRegister = {
        id: Date.now()*Math.random(),
        username: e.target.username.value,
        mail: e.target.mail.value,
        phone:e.target.phone.value,
        address :e.target.address.value,
        password: e.target.password.value
    }

    //đưa vào danh sách người dùng
    users.push(userRegister);

    //lưu lại trên local
    localStorage.setItem("users",JSON.stringify(users));
    alert("Đăng ký thành công");
    window.location.href="../index.html";
}