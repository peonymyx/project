

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
function checkLogin() {
    let login = document.getElementsByClassName("Login")[0];
    let logout = document.getElementsByClassName("Logout")[0];
    let register = document.getElementsByClassName("Register")[0];
    let user = document.getElementsByClassName("user")[0];
    if (localStorage.getItem("Login")) {
        login.style.display = "none"
        register.style.display = "none";
        logout.style.display = "block";
        user.style.display = "block";
        user.innerText = `Xin chào ` + JSON.parse(localStorage.getItem("Login")).username;
    }
}
checkLogin();
//Logout
function logout(){
    if (confirm("Bạn muốn đăng xuất")){
        localStorage.removeItem("Login")
        window.location.href="../index.html";
    }
}

//render sản phẩm
function renderCart(cart) {
    console.log(cart);
    let text = ``;
    let total =0;
    for (let i = 0; i < cart.length; i++) {
        let price = VND.format(cart[i].price);
        total +=(cart[i].quantity * cart[i].price);
        text += `
        <tr>
                <td scope="col">${i + 1}</td>
                <td scope="col" ><img src="${cart[i].image}" style="width: 100px; height:100px;"></td>
                <td scope="col">${cart[i].name}</td>
                <td scope="col">${price}</td>
                <td scope="col">
                <button onclick="updateItem(${cart[i].id}, '-')">-</button>
                ${cart[i].quantity}
                <button onclick="updateItem(${cart[i].id}, '+')">+</button>
                </td>
                <td scope="col">${VND.format(cart[i].quantity * cart[i].price)}</td>
                <td scope="col">
                <button class="btn btn-danger" onclick="deleteItem(${cart[i].id})">x</button></td>
              </tr>
        `
    }
    text += `<tfoot>
    <tr>
      <td colspan="5"> Tổng tiền </td>
      <td> ${VND.format(total)}</td>
    </tr>
  </tfoot>`
    document.getElementsByClassName("tbody")[0].innerHTML = text;
}
renderCart(JSON.parse(localStorage.getItem("Login")).cart);

//delete Sản phẩm
function deleteItem(itemID) {
    if (!confirm("Bạn muốn xóa sản phẩm này?")) {
        return;
    }
    let Login = JSON.parse(localStorage.getItem("Login"));
    let userCart = Login.cart;
    Login.cart = userCart.filter(item => item.id != itemID);

    //save to Local
    localStorage.setItem("Login", JSON.stringify(Login));

    let users = JSON.parse(localStorage.getItem("users"))
    users = users.map(user => {
        if (user.id == Login.id) {
            return Login
        }
        return user
    })
    localStorage.setItem("users", JSON.stringify(users));
    renderCart(JSON.parse(localStorage.getItem("Login")).cart);

}

//update Item's quantity
function updateItem(itemID, type) {
    let userLogin = JSON.parse(localStorage.getItem("Login"));
    let userCart = userLogin.cart;
    if (type == '-') {
        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].id == itemID) {

                if (userCart[i].quantity == 1) {
                    deleteItem(itemID);
                    return;

                } else {
                    userCart[i].quantity -= 1;
                }
                break;

            }
        } 
    }else{
            for (let i = 0; i < userCart.length; i++) {
                if (userCart[i].id == itemID) {
                    userCart[i].quantity += 1;
                    break;
                }
            }

        }
    
    //save to Local
    localStorage.setItem("Login", JSON.stringify(userLogin));

    let users = JSON.parse(localStorage.getItem("users"));
    users = users.map(user => {
        if (user.id == userLogin.id) {
            return userLogin
        }
        return user
    })
    localStorage.setItem("users", JSON.stringify(users));
    //reload the page
    renderCart(JSON.parse(localStorage.getItem("Login")).cart);

}