const token = localStorage.getItem("token");

// Check login
if (!token) {
    alert("Please login as Admin.");
    window.location.href = "../login.html";
}

// Dashboard Function
async function loadDashboard() {

    try {

        const response = await fetch("/api/admin/dashboard", {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        // Only update if the elements exist
        if (document.getElementById("usersCount")) {
            document.getElementById("usersCount").innerText = data.totalUsers;
        }

        if (document.getElementById("productsCount")) {
            document.getElementById("productsCount").innerText = data.totalProducts;
        }

        if (document.getElementById("ordersCount")) {
            document.getElementById("ordersCount").innerText = data.totalOrders;
        }

        if (document.getElementById("revenue")) {
            document.getElementById("revenue").innerText = "₹" + data.totalRevenue;
        }

    } catch (error) {

        console.log(error);

    }

}

// ===============================
// Recent Orders
// ===============================
async function loadRecentOrders() {

    try {

        const response = await fetch(
            "/api/admin/recent-orders",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const orders = await response.json();

        if (!response.ok) {
            console.log(orders.message);
            return;
        }

        const table = document.getElementById("recentOrders");

        if (!table) return;

        table.innerHTML = "";

        orders.forEach(order => {

            let badge = "";

            switch (order.status) {

                case "Pending":
                    badge = "bg-warning";
                    break;

                case "Processing":
                    badge = "bg-info";
                    break;

                case "Shipped":
                    badge = "bg-primary";
                    break;

                case "Delivered":
                    badge = "bg-success";
                    break;

                default:
                    badge = "bg-secondary";

            }

            table.innerHTML += `

                <tr>

                    <td>#${order.id}</td>

                    <td>${order.full_name}</td>

                    <td>
                        <span class="badge ${badge}">
                            ${order.status}
                        </span>
                    </td>

                    <td>₹${order.total_amount}</td>

                </tr>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}

// Run only on dashboard page
// Run only on dashboard page
if (document.getElementById("usersCount")) {
    loadDashboard();
    loadRecentOrders();
}

// Revenue Chart
// ===============================
if (document.getElementById("salesChart")) {

    new Chart(document.getElementById("salesChart"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Revenue",
                data: [12000, 18000, 25000, 22000, 30000, 45000],
                borderColor: "#0d6efd",
                backgroundColor: "rgba(13,110,253,.15)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

}

// ===============================
// Order Status Chart
// ===============================
if (document.getElementById("orderChart")) {

    new Chart(document.getElementById("orderChart"), {
        type: "doughnut",
        data: {
            labels: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered"
            ],
            datasets: [{
                data: [4, 2, 3, 8],
                backgroundColor: [
                    "#ffc107",
                    "#0dcaf0",
                    "#0d6efd",
                    "#198754"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });

}