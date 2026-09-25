const checkoutToken = localStorage.getItem("token");
const summary = document.getElementById("summary");

// Load Cart Summary
async function loadSummary() {

    try {

        const response = await fetch("/api/cart", {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const items = await response.json();

        let total = 0;

        summary.innerHTML = "";

        items.forEach(item => {

            const subtotal = item.price * item.quantity;

            total += subtotal;

            summary.innerHTML += `

                <p>

                    ${item.product_name}

                    × ${item.quantity}

                    <span class="float-end">

                        ₹${subtotal}

                    </span>

                </p>

            `;

        });

        summary.innerHTML += `
            <hr>
            <h4>Total : ₹${total}</h4>
        `;

    } catch (error) {

        console.log(error);

        summary.innerHTML = "Unable to load order summary.";

    }

}

loadSummary();

// Place Order
document.getElementById("checkoutForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    console.log("Place Order button clicked");

    try {

       const response = await fetch("/api/orders/checkout", {

    method: "POST",

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + checkoutToken
        
    },

    body: JSON.stringify({

        full_name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        payment_method: document.getElementById("payment").value
        

    })

});

        console.log("Response:", response);

        const data = await response.json();

        console.log("Data:", data);

        if (response.ok) {

            alert("🎉 Order Placed Successfully!");
            window.location.href = "orders.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

});