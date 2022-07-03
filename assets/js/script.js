const menu = document.querySelector(".nav-menu");
const menuBtn = document.querySelector("#menu-btn");
const menuBtnClose = document.querySelector("#icon-close");

const cart = document.querySelector(".cart-modal");
const cartButton = document.querySelector("#icon-cart");

const minusBtn = document.querySelector("#minus-img");
const plusBtn = document.querySelector("#plus-img");
const productCounter = document.querySelector("#counter");

const addToCartBtn = document.querySelector("#cart-btn");
const cartCount = document.querySelector('.cart-number');
const productInCart = document.querySelector('#cart-products')
const cartEmpty = document.querySelector('.cart-empty');
const checkout = document.querySelector('#checkout');

const thumbGallery = document.querySelectorAll(".thumb");
const mainImg = document.querySelector('#main-sneaker-img');
const arrowPrevious = document.querySelector(".previous-arrow");
const arrowNext = document.querySelector(".next-arrow");

const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');

//Numerical
let productCounterValue = 1;
let cartProducts = 0;
let productprice = 250.0
let productdiscount = 0.5;


//Dropdown menu
const onMenuClick = () => {
    menu.classList.remove('hidden');
}

const offMenuClick = () => {
    menu.classList.add('hidden');
}

menuBtn.addEventListener('click', onMenuClick);
menuBtnClose.addEventListener('click', offMenuClick);


//Cart button
const openCart = () => {
    cart.classList.toggle("hidden");
}

cartButton.addEventListener('click', openCart);


//Product counter 
const minusCounter = () => {
    setCounter(-1);
}

const plusCounter = () => {
    setCounter(1);
}

const setCounter = (value) => {
    if ((productCounterValue + value) > 0) {
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue;
    }
}

minusBtn.addEventListener('click', minusCounter);
plusBtn.addEventListener('click', plusCounter);


//Add to Cart
const addToCartFunction = () => {
    cartProducts += productCounterValue;

    const cartHTMLElement = `
    <div id="product">
        <img src="assets/images/image-product-1-thumbnail.jpg" alt="product 1 thumbnail" id="product-one-thumb">
            <div id="nav-cart-details">
                <div id="product-name">Autumn Limited Edition....</div>
                <div id="price-group">
                    <div id="product-price">$${(productprice * productdiscount).toFixed(2)}</div> x
                    <div id="product-count">${cartProducts}</div>
                    <div id="total-price">$${(productprice * productdiscount * cartProducts).toFixed(2)}</div>
                </div>
            </div>
            <img src="assets/images/icon-delete.svg" alt="icon delete" id="icon-delete">
    </div>
    `;

    productInCart.innerHTML = cartHTMLElement;

    amendProducts();

    const iconDelete = document.querySelector('#icon-delete');
    iconDelete.addEventListener('click', clickBtnDelete);

}

addToCartBtn.addEventListener('click', addToCartFunction);

const amendProducts = () => {
    amendCartIcon();
    amendEmptyMsg();
    amendCheckoutButton();
}

const amendCartIcon = () => {
    cartCount.textContent = cartProducts;
    if (cartProducts == 0) {
        if (!cartCount.classList.contains('hidden')) {
            cartCount.classList.add('hidden');
        }
    } else {
        cartCount.classList.remove('hidden');
    }
}

function amendEmptyMsg() {
    if (cartProducts == 0) {
        if (cartEmpty.classList.contains('hidden')) {
            cartEmpty.classList.remove('hidden');
        }
    } else {
        if (!cartEmpty.classList.contains('hidden')) {
            cartEmpty.classList.add('hidden');
        }
    }

}

const amendCheckoutButton = () => {
    if (cartProducts == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        }
    } else {
        checkout.classList.remove('hidden');
    }
}

const clickBtnDelete = () => {
    cartProducts--;
    amendProducts();

    const el = document.querySelector('#product-count');
    const totalAmount = document.querySelector('#total-price');
    el.innerHTML = cartProducts;
    totalAmount.innerHTML = `$${(productprice * productdiscount * cartProducts).toFixed(2)}`;

    if (cartProducts == 0) {
        productInCart.innerHTML = '';
    }
}


//Gallery - 1440px +
const thumbPicClick = (event) => {
    thumbGallery.forEach(img => {
        img.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');

    mainImg.src = event.target.src.replace('-thumbnail', '');
}

thumbGallery.forEach(img => {
    img.addEventListener('click', thumbPicClick)
});

//Gallery - arrows
const clickArrowPrevious = () => {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setMainImage(imageIndex);
}


const clickArrowNext = () => {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setMainImage(imageIndex);
}

arrowPrevious.addEventListener('click', clickArrowPrevious);
arrowNext.addEventListener('click', clickArrowNext);

const getCurrentImageIndex = () => {
    const imageIndex = parseInt(mainImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

const setMainImage = (imageIndex) => {
    mainImg.src = `./assets/images/image-product-${imageIndex}.jpg`;
    thumbGallery.forEach(img => {
        img.classList.remove('active');
    });
    thumbGallery[imageIndex - 1].classList.add('active');
}

//Overlay & Lightbox
const mainImgClick = () => {
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1) {
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const closeOverlay = document.querySelector('#closeOverlay');
            closeOverlay.addEventListener('click', closeOverlayBtn);

            galleryLightbox = overlay.querySelectorAll('.thumb-pic');
            mainLightbox = overlay.querySelector('#main-sneaker-img');
            galleryLightbox.forEach(img => {
                img.addEventListener('click', galleryLightboxBtn);
            });

            const nextBtnOverlay = overlay.querySelector('.next-arrow');
            const previousBtnOverlay = overlay.querySelector('.previous-arrow');
            nextBtnOverlay.addEventListener('click', clickNextOverlay);
            previousBtnOverlay.addEventListener('click', clickPreviousOverlay);
        }
        overlay.classList.remove('hidden');
    }
}

let galleryLightbox;
let mainLightbox;
mainImg.addEventListener('click', mainImgClick);

const closeOverlayBtn = () => {
    overlay.classList.add('hidden');
}

const galleryLightboxBtn = (event) => {
    galleryLightbox.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    mainLightbox.src = event.target.src.replace('-thumbnail', '');
}

const clickNextOverlay = () => {
    let imageIndex = overlayImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayMainImage(imageIndex);
}

const clickPreviousOverlay = () => {
    let imageIndex = overlayImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayMainImage(imageIndex);
}

const overlayImageIndex = () => {
    const imageIndex = parseInt(mainLightbox.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

const setOverlayMainImage = (imageIndex) => {
    mainLightbox.src = `./assets/images/image-product-${imageIndex}.jpg`;
    //images are not sync
    galleryLightbox.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    galleryLightbox[imageIndex - 1].classList.add('active');
}