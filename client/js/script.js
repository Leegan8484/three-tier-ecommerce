const user = JSON.parse(localStorage.getItem("user"));


const guestMenu = document.getElementById("guestMenu");
const userMenu = document.getElementById("userMenu");
const userName = document.getElementById("userName");
const dashboardLink = document.getElementById("dashboardLink");

if (user) {

    if (guestMenu) guestMenu.style.display = "none";

    if (userMenu) userMenu.style.display = "block";

    if (userName) userName.innerText = user.full_name;

    // Show Dashboard only for admin
    if (dashboardLink) {
        if (user.role !== "admin") {
            dashboardLink.style.display = "none";
        }
    }

}

function logout() {

    localStorage.clear();

    window.location.replace("login.html");

}

const token = localStorage.getItem("token");

// Redirect only for pages that require login
const protectedPages = [
    "cart.html",
    "orders.html",
    "checkout.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (!token && protectedPages.includes(currentPage)) {
    window.location.replace("login.html");
}

async function loadCartCount() {

    const token = localStorage.getItem("token");
    const badge = document.getElementById("cartCount");

    if (!badge) return;

    if (!token) {
        badge.style.display = "none";
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/cart", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const cart = await response.json();

        console.log("Cart:", cart);

        badge.innerText = cart.length;

        if (cart.length > 0) {
            badge.style.display = "inline-block";
        } else {
            badge.style.display = "none";
        }

    } catch (err) {
        console.log(err);
    }

}

document.addEventListener("DOMContentLoaded", loadCartCount);
window.loadCartCount = loadCartCount;
