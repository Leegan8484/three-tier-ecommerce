const ordersToken = localStorage.getItem("token");
const container = document.getElementById("ordersContainer");

async function loadOrders() {

    try {

        const response = await fetch("/api/orders", {

            headers: {

                "Authorization": "Bearer " + ordersToken

            }

        });

const orders = await response.json();
console.log(orders);
        container.innerHTML = "";

        if (orders.length === 0) {

            container.innerHTML = `
                <div class="alert alert-info">
                    No orders found.
                </div>
            `;

            return;

        }

        orders.forEach(order => {

container.innerHTML += `

<div class="card mb-4 shadow border-0 rounded-4">

<div class="card-body">

<div class="row align-items-center">

<div class="col-md-3 text-center">

<img
src="/uploads/${order.image}"
class="img-fluid rounded"
style="width:120px;height:120px;object-fit:cover;">

</div>

<div class="col-md-6">

<h4>${order.product_name}</h4>

<p>

Quantity :
<b>${order.quantity}</b>

</p>

<p>

Price :
<b>₹${order.price}</b>

</p>

<p>

Status :

<span class="badge bg-success">

${order.status}

</span>

</p>

<p>

${new Date(order.created_at).toLocaleString()}

</p>

</div>

<div class="col-md-3 text-end">

<h4>

₹${order.total_amount}

</h4>

</div>

</div>

</div>

</div>

`;

});

    } catch (error) {

        console.log(error);

        alert("Unable to load orders.");

    }

}

loadOrders();