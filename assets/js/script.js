const menu = document.querySelector(".nav-menu")
const menuBtn = document.querySelector("#menu-btn")
const menuBtnClose = document.querySelector("#icon-close")
const cart = document.getElementsByClassName("cart-modal");
const cartButton = document.getElementById("icon-cart");

menuBtn.addEventListener('click', onMenuClick);
menuBtnClose.addEventListener('click', offMenuClick);

function onMenuClick() {
    menu.classList.remove('hidden');
}

function offMenuClick() {
    menu.classList.add('hidden');
}



cartButton.addEventListener('click', openCart);

function openCart() {
    cart.classList.toggle('hidden');
}