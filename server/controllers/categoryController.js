const Category = require("../models/categoryModel");

// Add Category
exports.addCategory = (req, res) => {

    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({
            message: "Category name is required"
        });
    }

    Category.addCategory(category_name, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error adding category",
                error: err
            });
        }

        res.status(201).json({
            message: "Category added successfully"
        });

    });

};

// Get All Categories
exports.getCategories = (req, res) => {

    Category.getAllCategories((err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching categories",
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// Update Category
exports.updateCategory = (req, res) => {

    const { id } = req.params;
    const { category_name } = req.body;

    Category.updateCategory(id, category_name, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error updating category",
                error: err
            });
        }

        res.status(200).json({
            message: "Category updated successfully"
        });

    });

};

// Delete Category
exports.deleteCategory = (req, res) => {

    const { id } = req.params;

    Category.deleteCategory(id, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error deleting category",
                error: err
            });
        }

        res.status(200).json({
            message: "Category deleted successfully"
        });

    });

};