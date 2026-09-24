const user = JSON.parse(localStorage.getItem("user"));

const guestMenu = document.getElementById("guestMenu");
const userMenu = document.getElementById("userMenu");
const userName = document.getElementById("userName");
const dashboardLink = document.getElementById("dashboardLink");

if (user) {

    if (guestMenu) {
        guestMenu.style.display = "none";
    }

    if (userMenu) {
        userMenu.style.display = "block";
    }

    if (userName) {
        userName.innerText = user.full_name;
    }

    if (dashboardLink && user.role !== "admin") {
        dashboardLink.style.display = "none";
    }

}