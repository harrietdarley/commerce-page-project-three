const menu = document.querySelector(".nav-menu")
const menuBtn = document.querySelector("#menu-btn")
const menuBtnClose = document.querySelector("#icon-close")
const cart = document.querySelector(".cart-modal");
const cartButton = document.querySelector("#icon-cart");

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
    cart.classList.toggle("hidden");
}