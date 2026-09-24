const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const isValid = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
    }

};

const upload = multer({

    storage: storage,
    fileFilter: fileFilter

});

module.exports = upload;