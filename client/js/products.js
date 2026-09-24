const API = "http://localhost:5000/api/products";

const container = document.getElementById("productsContainer");

let allProducts = [];

// Load Products
async function loadProducts() {

    try {

        const res = await fetch(API);

        allProducts = await res.json();

        displayProducts(allProducts);

    } catch (err) {

        console.log(err);

    }

}

// Display Products
function displayProducts(products) {

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
        <div class="col-12 text-center">
            <h4>No Products Found</h4>
        </div>
        `;

        return;
    }

    products.forEach(product => {

        container.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="card product-card h-100 shadow">

                <img
                    src="http://localhost:5000/uploads/${product.image}"
                    class="card-img-top"
                    alt="${product.product_name}">

                <div class="card-body d-flex flex-column">

                   <div class="mb-2">
    <span class="badge bg-primary category-badge">
        ${product.category_name}
    </span>
</div>

                    <h5 class="card-title">

                        ${product.product_name}

                    </h5>

                    <p class="price">

                        ₹${product.price}

                    </p>

                    <p class="stock">

                        Stock : ${product.stock}

                    </p>

                    <button
                        class="btn btn-primary mt-auto"
                        onclick="addToCart(${product.id})">

                        <i class="fa-solid fa-cart-shopping"></i>

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// Category Filter
function filterProducts(category) {

    if (category === "All") {

        displayProducts(allProducts);

    } else {

        const filtered = allProducts.filter(product =>

            product.category_name === category

        );

        displayProducts(filtered);

    }

}

// Search
document.getElementById("search").addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const filtered = allProducts.filter(product =>

        product.product_name.toLowerCase().includes(search)

    );

    displayProducts(filtered);

});

// Add To Cart
async function addToCart(productId) {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    try {

        const response = await fetch("http://localhost:5000/api/cart/add", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + token

            },

            body: JSON.stringify({

                product_id: productId,

                quantity: 1

            })

        });

        const data = await response.json();

if (response.ok) {

    alert(data.message);

    // Update cart badge immediately
    if (typeof loadCartCount === "function") {
        loadCartCount();
    }

} else {

    alert(data.message);

}

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

loadProducts();