const token = localStorage.getItem("token");

const userTable = document.getElementById("userTable");
const searchUser = document.getElementById("searchUser");

async function loadUsers() {

    try {

        const response = await fetch("/api/users", {

            headers: {
                Authorization: "Bearer " + token
            }

        });

        const users = await response.json();

        console.log(users);

        userTable.innerHTML = "";

        const keyword = searchUser.value.toLowerCase();
console.log("Keyword:", keyword);
const filteredUsers = users.filter(user => {

    return (
        (user.full_name &&
            user.full_name.toLowerCase().includes(keyword)) ||

        (user.email &&
            user.email.toLowerCase().includes(keyword)) ||

        (user.phone &&
            user.phone.toLowerCase().includes(keyword)) ||

        (user.role &&
            user.role.toLowerCase().includes(keyword))
    );

});

filteredUsers.forEach((user, index) => {

            userTable.innerHTML += `

                <tr>

                    <td>${index + 1}</td>
                    <td>${user.id}</td>

                    <td>${user.full_name}</td>

                    <td>${user.email}</td>

                    <td>${user.phone}</td>

                    <td>${user.role}</td>

                    <td>${new Date(user.created_at).toLocaleDateString()}</td>

                    <td>

                        <button
    class="btn btn-warning btn-sm"
    onclick="editUser(${user.id})">

    Edit

</button>

                        <button
    class="btn btn-danger btn-sm"
    onclick="deleteUser(${user.id})">

    Delete

</button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.log(error);
        alert("Unable to load users.");

    }

}

loadUsers();

async function editUser(id) {

    try {

        const response = await fetch(`/api/users/${id}`, {

            headers: {
                Authorization: "Bearer " + token
            }

        });

        const user = await response.json();

        document.getElementById("user_id").value = user.id;
        document.getElementById("full_name").value = user.full_name;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("address").value = user.address;
        document.getElementById("role").value = user.role;

        const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
        modal.show();

    } catch (error) {

        console.log(error);
        alert("Unable to load user.");

    }

}


const editUserForm = document.getElementById("editUserForm");

editUserForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const id = document.getElementById("user_id").value;

    const user = {

        full_name: document.getElementById("full_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        role: document.getElementById("role").value


    };
    console.log(user);
console.log("Role value:", document.getElementById("role").value);

    try {

        const response = await fetch(`/api/users/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(user)

        });

        const data = await response.json();

        if (response.ok) {

            alert("User Updated Successfully");

            const modal = bootstrap.Modal.getInstance(document.getElementById("editUserModal"));
            modal.hide();

            loadUsers();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Unable to update user.");

    }

});

async function deleteUser(id) {

    const confirmDelete = confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`/api/users/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: "Bearer " + token
            }

        });

        const data = await response.json();

        if (response.ok) {

            alert("User Deleted Successfully");

            loadUsers();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Unable to delete user.");

    }

}

searchUser.addEventListener("input", () => {

    loadUsers();

});