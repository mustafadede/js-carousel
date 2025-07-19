const init = () => {
    if(localStorage.getItem("fav_products") === null) {
        localStorage.setItem("fav_products", JSON.stringify([]));
    } else {
        localStorage.getItem("fav_products");
        console.warn("Already fav items created 😎");
    }
    self.buildHTML();
    self.buildCSS();
    self.setEvents();
    self.getProducts();
    self.createCardComponent();
};
self.getProducts = () => {
    if (localStorage.getItem("products")) {
            console.warn("local storage fetching");
            const localData = localStorage.getItem("products");
            self.createCardComponent(JSON.parse(localData));
            return;
    }
    fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json").then(res => res.json())
    .then(data => {
        localStorage.setItem("products", JSON.stringify(data));
        self.createCardComponent(data);
        console.warn("Fetch is fetching ☝🏻🤓");
    })
}
self.createCardComponent = (data) => {
    const favProducts = JSON.parse(localStorage.getItem("fav_products")) || [] 
    
    data?.forEach(el => {
        const html = `
            <a class="product-item myCarousel-card" target="_blank">
                <img src="${el.img}" class="product-item__img"/>
                <div class="product-item-content">
                    <div class="product-item__brand">
                        <b>${el.brand} - </b>
                        <span>${el.name}</span>
                    </div>
                    <div class="product-item__price">
                        <span class="product-item__new-price">${el.original_price} TL</span>
                    </div>
                </div>
                <div class="product-list-promo">
                    <p>Sepette ${el.price} TL</p>
                    <p> ${(Math.round((el.price - el.original_price)/el.original_price) * 100)} % İNDİRİM!</p>
                </div>
                <div class="heart">
                    <div class="heart-icon icon-add ${favProducts.some(card => card.id === el.id) ? "has-fav" : "has-not-fav"}"></div>
                    <div src="https://www.e-bebek.com/assets/svg/default-hover-favorite.svg" class="heart-icon hovered"></div>
                </div>
                <div class="product-item-content">
                    <div class="product-item__price">
                        <button class="btn close-btn disable ng-star-inserted">Sepete Ekle</button>
                    </div>
                </div>
            </a>`;
        
        document.querySelector(".myCarousel-cards").insertAdjacentHTML("beforeend", html)
    });
    createHeartAction();
};
self.buildHTML = () => {
    const html = `
    <div class="banner__opportunity banner">
        <div class="container">
            <div class="banner__titles">
                <h1 class="title-primary">
                    Beğenebileceğinizi düşündüklerimiz
                </h1>
            </div>
            <div class="banner__wrapper banner__opportunity-wrapper">
                <div class="product-list__best-products myCarousel-cards"></div>
            </div>
            <button class="myCarousel-prev"></button>
            <button class="myCarousel-next"></button>
        </div>
    </div>
    `;
    document.querySelector(".banner__opportunity").insertAdjacentHTML("beforebegin", html);
};

self.buildCSS = () => {
    const css = `
        .banner {
            margin: 20px 0;
            position: relative;
        }
        .myCarousel-prev, .myCarousel-next {
            background-color: #fef6eb;
            width: 50px;
            height: 50px;
            position: absolute;
            top: auto;
            bottom: 50%;
            border-radius: 50%;
        }
        .myCarousel-prev {
            left: -50px;
            background-image: url('https://cdn06.e-bebek.com/assets/svg/prev.svg');
            background-repeat: no-repeat;
            background-position: 16px;
        }
        .myCarousel-next {
            right: -50px;
            background-image: url('https://cdn06.e-bebek.com/assets/svg/next.svg');
            background-repeat: no-repeat;
            background-position: 16px;
            background-size: auto;
        }
        .product-list__best-products {
            display: flex;
            overflow-x: scroll;
            gap: 20px;
            background-size: auto;
            padding: 0 20px;
        }
        .product-item {
            min-width: 242px !important;
        }
        .heart {
            z-index: 50;
        }
        
        .heart-icon {
            scale: .5;
        }
        .has-fav::before {
            content: "";
        }
        .has-fav {
            background: url("https://www.svgrepo.com/show/406819/orange-heart.svg");
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position-y: bottom;
        }
        .heart-icon:not(.has-fav):hover {
            background: url("https://www.e-bebek.com/assets/svg/default-hover-favorite.svg");
            width: 100%;
            height: 100%;
            scale: 1;
            background-repeat: no-repeat;
            background-size: contain;
            background-position-y: bottom;
        }
        .has-not-fav::before {
            content: "";
        }
        .has-not-fav {
            background-image: url("https://www.e-bebek.com/assets/svg/default-favorite.svg");
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: contain;
            background-position-y: bottom;
        }
        .hovered {
            scale: 1;
        }
        @media (max-width: 700px) {                
            .myCarousel-prev {
                left: -35px;
            }
            .myCarousel-next {
                right: -35px;
            }
        }
        @media (max-width: 430px) {
            .myCarousel-next, .myCarousel-prev {
                display: none;
            }
        }
    }`;
    
    const style = document.createElement("style");
    style.classList.add("carousel-style");
    style.textContent = css;
    document.head.appendChild(style);
};
self.setEvents = () => {
    const prevEl = document.querySelector(".myCarousel-prev");
    const nextEl = document.querySelector(".myCarousel-next");
    const cardBody = document.querySelector(".product-list__best-products");
    // pagination elementsss
    prevEl.addEventListener("click", () => {
        cardBody.scrollBy({ left: -148, behavior: "smooth" });
    });
    nextEl.addEventListener("click", () => {
        cardBody.scrollBy({ left: 148, behavior: "smooth" });
    });       
};
const createHeartAction = () => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || []
    document.querySelectorAll(".myCarousel-card").forEach((card, i) => {
        const iconHeart = card.querySelector(".icon-add")
        
        card.querySelector(".heart").addEventListener("click", () => {
            let favProducts = JSON.parse(localStorage.getItem("fav_products")) || [];
            const selectedProduct = allProducts[i];

            const hasFav = favProducts.some(fav => fav.id === selectedProduct.id)
            if(hasFav) {
                favProducts = favProducts.filter(product => product.id !== selectedProduct.id)
                iconHeart.classList.remove("has-fav")
                iconHeart.classList.add("has-not-fav")
                console.warn("kalp çıkartıldı")
            } else {
                favProducts.push(selectedProduct)
                iconHeart.classList.remove("has-not-fav")
                iconHeart.classList.add("has-fav")
                console.warn("kalp eklendi")
            }
            localStorage.setItem("fav_products", JSON.stringify(favProducts))
            
        })
    })
    
}
if (location.pathname === "/") {
    init();
} else {
    console.log("wrong page");
}
