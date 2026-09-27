// ==========================================
// ZUNO PRODUCTS
// ==========================================

const products = [

    // PRODUCT 1 — CAT
    {
        id: 1,

        name: "Smart Self-Cleaning Litter Box",

        category: "cats",

        price: 299.99,

        oldPrice: 349.99,

        images: [
            "images/products/litter-box/1.png",
            "images/products/litter-box/2.png",
            "images/products/litter-box/3.png",
            "images/products/litter-box/4.png"
        ],

        badge: "BEST SELLER",

        description:
            "A smarter and easier way to keep your cat's litter area clean."
    },


    // PRODUCT 2 — DOG
    {
        id: 2,

        name: "Waterproof Pet Car Seat Cover",

        category: "dogs",

        price: 69.99,

        oldPrice: 89.99,

        images: [
            "images/products/car-seat-cover/1.png",
            "images/products/car-seat-cover/2.png",
            "images/products/car-seat-cover/3.png",
            "images/products/car-seat-cover/4.png"
        ],

        badge: "POPULAR",

        description:
            "A waterproof car seat cover designed to protect your vehicle while keeping your dog comfortable."
    }

];


// ==========================================
// CREATE PRODUCT CARD
// ==========================================

function createProductCard(product) {

    return `
        <article class="product-card">

            <a
                href="product.html?id=${product.id}"
                class="product-image"
            >

                <span class="product-badge">
                    ${product.badge}
                </span>

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </a>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>


                <a
                    href="product.html?id=${product.id}"
                    class="product-name"
                >
                    ${product.name}
                </a>


                <div class="product-price">

                    <span class="current-price">
                        $${product.price.toFixed(2)}
                    </span>

                    <span class="old-price">
                        $${product.oldPrice.toFixed(2)}
                    </span>

                </div>


                <a
                    href="product.html?id=${product.id}"
                    class="quick-add"
                >
                    VIEW PRODUCT →
                </a>

            </div>

        </article>
    `;
}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

const featuredGrid =
    document.getElementById("featured-product-grid");


if (featuredGrid) {

    featuredGrid.innerHTML =
        products
            .map(createProductCard)
            .join("");

}