(() => {
    const init = () => {
        self.buildHTML();
        self.buildCSS();
        self.setEvents();
        self.getProducts();
        self.createCardComponent();
    };

    self.getProducts = () => {
        if (localStorage.getItem("products")) {
                console.warn("local storage fetching")
                const localData = localStorage.getItem("products")
                self.createCardComponent(JSON.parse(localData))
                return;
        }
        fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json").then(res => res.json())
        .then(data => {
            localStorage.setItem("products", JSON.stringify(data));
            self.createCardComponent(data);
            console.warn("Fetch is fetching ☝🏻🤓")
        })
    }

    self.createCardComponent = (data) => {
        data?.forEach(el => {
            const html = `
                <a class="product-item" href="${el.url}" target="_blank">
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
                        <img src="https://www.e-bebek.com/assets/svg/default-favorite.svg" class="heart-icon"/>
                        <img src="https://www.e-bebek.com/assets/svg/default-hover-favorite.svg" class="heart-icon hovered"/>
                    </div>
                    <div class="product-item-content">
                        <div class="product-item__price">
                            <button class="btn close-btn disable ng-star-inserted">Sepete Ekle</button>
                        </div>
                    </div>
                </a>`;

            document.querySelector(".product-list__best-products").insertAdjacentHTML("beforeend", html);
        });
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
                    <div class="product-list__best-products"></div>
                </div>
                <button class="myCarousel-prev"></button>
                <button class="myCarousel-next"></button>
            </div>
        </div>
        `;
        document.querySelector(".banner__opportunity").insertAdjacentHTML("beforebegin", html)
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
            .heart-icon {
                scale: .5;
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
        const prevEl = document.querySelector(".myCarousel-prev")
        const nextEl = document.querySelector(".myCarousel-next")
        const cardBody = document.querySelector(".product-list__best-products")
        prevEl.addEventListener("click", () => {
            cardBody.scrollBy({ left: -148, behavior: "smooth" });
        })

         nextEl.addEventListener("click", () => {
            cardBody.scrollBy({ left: 148, behavior: "smooth" });
        })
        console.log(prevEl, nextEl)
    };
    
    if (location.pathname === "/") {
        init();
    } else {
        console.log("wrong page")
    }
})();

