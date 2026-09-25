const token = localStorage.getItem("token");

const orderTable = document.getElementById("orderTable");
const searchOrder = document.getElementById("searchOrder");

async function loadOrders() {

    try {

        const response = await fetch("/api/orders/admin", {

            headers: {
                Authorization: "Bearer " + token
            }

        });

        const orders = await response.json();
        const keyword = searchOrder.value.toLowerCase();

const filteredOrders = orders.filter(order => {

    return (

        (order.order_id &&
            order.order_id.toString().includes(keyword)) ||

        (order.full_name &&
            order.full_name.toLowerCase().includes(keyword)) ||

        (order.status &&
            order.status.toLowerCase().includes(keyword))

    );

});

console.log("Orders:", orders);

        if (!response.ok) {
            alert(orders.message);
            return;
        }

        orderTable.innerHTML = "";

        filteredOrders.forEach((order, index) => {

           orderTable.innerHTML += `

<tr>

    <td>${index + 1}</td>
    <td>${order.order_id}</td>

    <td>${order.full_name}</td>

    <td>₹${order.total_amount}</td>

    <td>${order.status}</td>

    <td>${new Date(order.created_at).toLocaleDateString()}</td>

   <td>

    <button
        class="btn btn-primary btn-sm"
        onclick="viewOrder(${order.order_id})">

        View

    </button>

    <button
        class="btn btn-warning btn-sm"
        onclick="editStatus(${order.order_id}, '${order.status}')">

        Update Status

    </button>

</td>

</tr>

`;

        });

    } catch (error) {

        console.log(error);
        alert("Unable to load orders.");

    }

}

loadOrders();

async function viewOrder(id) {

    try {

        const response = await fetch(`/api/orders/admin/${id}`, {

            headers: {
                Authorization: "Bearer " + token
            }

        });

        const order = await response.json();

        if (!response.ok) {

            alert(order.message);
            return;

        }

        let html = `

            <h5>Customer Details</h5>

            <p><strong>Name:</strong> ${order[0].full_name}</p>

            <p><strong>Email:</strong> ${order[0].email}</p>

            <p><strong>Phone:</strong> ${order[0].phone}</p>

            <p><strong>Address:</strong> ${order[0].address}</p>

            <hr>

            <h5>Ordered Products</h5>

            <table class="table table-bordered">

                <thead>

                    <tr>

                        <th>Product</th>

                        <th>Quantity</th>

                        <th>Price</th>

                    </tr>

                </thead>

                <tbody>

        `;

        order.forEach(item => {

            html += `

                <tr>

                    <td>${item.product_name}</td>

                    <td>${item.quantity}</td>

                    <td>₹${item.price}</td>

                </tr>

            `;

        });

        html += `

                </tbody>

            </table>

            <hr>

            <p><strong>Total Amount:</strong> ₹${order[0].total_amount}</p>

            <p><strong>Status:</strong> ${order[0].status}</p>

            <p><strong>Order Date:</strong> ${new Date(order[0].created_at).toLocaleDateString()}</p>

        `;

        document.getElementById("orderDetails").innerHTML = html;

        const modal = new bootstrap.Modal(document.getElementById("viewOrderModal"));

        modal.show();

    } catch (error) {

        console.log(error);

        alert("Unable to load order details.");

    }

}

function editStatus(id, status) {

    document.getElementById("order_id").value = id;

    document.getElementById("order_status").value = status;

    const modal = new bootstrap.Modal(document.getElementById("statusModal"));

    modal.show();

}

async function updateStatus() {

    const id = document.getElementById("order_id").value;

    const status = document.getElementById("order_status").value;

    try {

        const response = await fetch(`/api/orders/admin/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({ status })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Order Status Updated Successfully");

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("statusModal")
            );

            modal.hide();

            loadOrders();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Unable to update order status.");

    }

}

searchOrder.addEventListener("input", () => {

    loadOrders();

});