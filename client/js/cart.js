const API_URL = "http://localhost:5000/api/cart";

const cartToken = localStorage.getItem("token");

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

// Load Cart
async function loadCart() {

    if (!cartToken) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(API_URL, {
            headers: {
                Authorization: "Bearer " + cartToken
            }
        });

        const data = await response.json();

        cartItems.innerHTML = "";

        let total = 0;

        if (data.length === 0) {

            cartItems.innerHTML = `
                <div class="text-center py-5">

                    <i class="fa-solid fa-cart-shopping fa-5x text-secondary mb-4"></i>

                    <h3>Your Cart is Empty</h3>

                    <p class="text-muted">
                        Start shopping to add products.
                    </p>

                    <a href="products.html"
                    class="btn btn-primary mt-3">

                    Shop Now

                    </a>

                </div>
            `;

            totalPrice.innerHTML = "<h2>₹0</h2>";

            return;
        }

        data.forEach(item => {

            const subtotal = Number(item.price) * Number(item.quantity);

            total += subtotal;

            cartItems.innerHTML += `

            <div class="cart-card">

                <div class="row align-items-center">

                    <div class="col-md-3 text-center">

                        <img
                        src="http://localhost:5000/uploads/${item.image}"
                        class="cart-img">

                    </div>

                    <div class="col-md-5">

                        <h4 class="product-name">

                            ${item.product_name}

                        </h4>

                        <p class="product-price">

                            ₹${item.price}

                        </p>

                        <div class="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">

                            <button
                            class="btn btn-danger qty-btn"
                            onclick="changeQuantity(${item.id}, ${item.quantity-1})">

                            <i class="fa-solid fa-minus"></i>

                            </button>

                            <span class="fw-bold fs-5">

                                ${item.quantity}

                            </span>

                            <button
                            class="btn btn-success qty-btn"
                            onclick="changeQuantity(${item.id}, ${item.quantity+1})">

                            <i class="fa-solid fa-plus"></i>

                            </button>

                        </div>

                    </div>

                    <div class="col-md-4 text-center text-md-end mt-3 mt-md-0">

                        <h4 class="text-primary">

                            ₹${subtotal}

                        </h4>

                        <button
                        class="btn btn-outline-danger remove-btn"
                        onclick="removeItem(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                        Remove

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

        totalPrice.innerHTML = `

            <h2>

                ₹${total}

            </h2>

        `;

    }

    catch (err) {

        console.log(err);

    }

}

// Update Quantity

async function changeQuantity(cartId, quantity) {

    if (quantity < 1) return;

    try {

        await fetch(`${API_URL}/${cartId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + cartToken

            },

            body: JSON.stringify({

                quantity

            })

        });

        await loadCart();

        if (window.loadCartCount) {

            await window.loadCartCount();

        }

    }

    catch (err) {

        console.log(err);

    }

}

// Remove Item

async function removeItem(cartId) {

    if (!confirm("Remove this product from cart?")) return;

    try {

        await fetch(`${API_URL}/${cartId}`, {

            method: "DELETE",

            headers: {

                Authorization: "Bearer " + cartToken

            }

        });

        await loadCart();

        if (window.loadCartCount) {

            await window.loadCartCount();

        }

    }

    catch (err) {

        console.log(err);

    }

}

loadCart();