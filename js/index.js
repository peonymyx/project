const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  
function renderProducts(list) {
    let products = list;
    let text=``;
    for (const i in products ){
        let price = VND.format(products[i].price);
        text+=`
        <div class="product">
                    <img src="${products[i].image}" alt="">
                    <span> ${products[i].name} </span>
                    <span> ${price} </span>
                    <i onclick="addItem(${products[i].id})" class="fa-solid fa-cart-plus"></i>
        </div>
        `  
        }
        document.getElementById("products").innerHTML=text;
}
renderProducts(JSON.parse(localStorage.getItem("products")));

function logout(){
    if (confirm("Bạn muốn đăng xuất")){
        localStorage.removeItem("Login")
        window.location.reload();
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

function removeAccentLowerCase(str) {
    return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

function searchByInfo(event) {
    let productCopy = [...JSON.parse(localStorage.getItem("products"))];
    productCopy = productCopy.filter(product => removeAccentLowerCase(product.name + product.price + product.category).includes(removeAccentLowerCase(event.target.value)));
    renderProducts(productCopy);
}
function getProductByID(itemID){
    return JSON.parse(localStorage.getItem("products")).find(product => product.id == itemID);
}
function addItem(itemID) {
    let users = JSON.parse(localStorage.getItem("users"));
    let checkLogin = JSON.parse(localStorage.getItem("Login"));
    if (checkLogin){
        if (checkLogin.cart.find(item => item.id == itemID)){
            let product = checkLogin.cart.find(item => item.id == itemID)
            product.quantity +=1 
        }else {
            let product = getProductByID(itemID);
            checkLogin.cart.push(product);
        }
        localStorage.setItem("Login",JSON.stringify(checkLogin));
        users = users.map(user =>{
            if (user.id == checkLogin.id){
                return checkLogin;
            }
            return user
        })
        localStorage.setItem("users",JSON.stringify(users));
    }
    else{
        alert("Bạn chưa đăng nhập!");
    }
}

//check befor enter on Cart
function enterOnCart(){
    if (JSON.parse(localStorage.getItem("Login"))) {
        window.location.href="./pages/cart.html"
        return;
    }
    alert("Bạn phải đăng nhập!");
}