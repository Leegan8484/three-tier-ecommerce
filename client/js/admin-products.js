const token = localStorage.getItem("token");
let editProductId = null;
const productTable = document.getElementById("productTable");
const searchProduct = document.getElementById("searchProduct");

const categorySelect = document.getElementById("category_id");

async function loadCategories() {

    try {

        const response = await fetch("/api/categories");

        const categories = await response.json();

        console.log("Categories:", categories);

        const categorySelect = document.getElementById("category_id");

        categorySelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Category";
        categorySelect.appendChild(defaultOption);

        categories.forEach(category => {

            const option = document.createElement("option");

            option.value = category.id;

            option.textContent = category.category_name;

            categorySelect.appendChild(option);

        });

    } catch (error) {

        console.log("Category Error:", error);

    }

}



async function loadProducts() {

    try {

        const response = await fetch("/api/products", {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const products = await response.json();
        const keyword = searchProduct.value.toLowerCase();

const filteredProducts = products.filter(product =>

    product.product_name.toLowerCase().includes(keyword) ||

    product.category_name.toLowerCase().includes(keyword)

);

        productTable.innerHTML = "";

        filteredProducts.forEach((product, index) => {

            productTable.innerHTML += `

                <tr>

                    <td>${index + 1}</td>
                    <td>${product.id}</td>

                    <td>${product.product_name}</td>

                    <td>₹${product.price}</td>

                    <td>${product.stock}</td>

                    <td>${product.category_name}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editProduct(${product.id})">

                            Edit

                        </button>

                       <button
    class="btn btn-danger btn-sm"
    onclick="deleteProduct(${product.id})">

    Delete

</button>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

        alert("Unable to load products.");

    }

}

loadProducts();
loadCategories();
// Add Product

const addProductForm = document.getElementById("addProductForm");

if (addProductForm) {

    addProductForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData();

        formData.append("product_name", document.getElementById("product_name").value);

        formData.append("price", document.getElementById("price").value);

        formData.append("stock", document.getElementById("stock").value);

        formData.append("category_id", document.getElementById("category_id").value);

        formData.append("image", document.getElementById("image").files[0]);

        try {

            let url = "/api/products";
let method = "POST";

if (editProductId) {

    url = `/api/products/${editProductId}`;

    method = "PUT";

}

const response = await fetch(url, {

    method: method,

    headers: {

        "Authorization": "Bearer " + token

    },

    body: formData

});

            const data = await response.json();
if (response.ok) {

    const isUpdate = editProductId !== null;

    if (isUpdate) {
        alert("Product Updated Successfully");
    } else {
        alert("Product Added Successfully");
    }

    addProductForm.reset();

    editProductId = null;

    document.getElementById("modalTitle").innerText = "Add Product";

    document.querySelector("#addProductForm button[type='submit']").innerText = "Save Product";

    document.getElementById("previewImage").style.display = "none";

    loadProducts();
    loadCategories();

    const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));

    modal.hide();

} else {

    alert(data.message);

}

        } catch (error) {

            console.log(error);

            alert("Error adding product.");

        }

    });

}

async function editProduct(id) {
    editProductId = id;

    try {

        const response = await fetch(`/api/products/${id}`);

        const product = await response.json();

        document.getElementById("product_name").value = product.product_name;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("category_id").value = product.category_id;
       

const preview = document.getElementById("previewImage");

preview.src = "/uploads/" + product.image;

preview.style.display = "block";
document.getElementById("modalTitle").innerText = "Edit Product";

document.querySelector("#addProductForm button[type='submit']").innerText = "Update Product";

        const modal = new bootstrap.Modal(document.getElementById("addProductModal"));
        modal.show();

    } catch (error) {

        console.log(error);
        alert("Unable to load product.");

    }

}

async function deleteProduct(id) {

    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`/api/products/${id}`, {

            method: "DELETE",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const data = await response.json();

        if (response.ok) {

            alert("Product Deleted Successfully");

            loadProducts();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Unable to delete product.");

    }

}

searchProduct.addEventListener("keyup", () => {

    loadProducts();

});