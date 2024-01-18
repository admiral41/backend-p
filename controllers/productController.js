const cloudinary = require("cloudinary");
const Products = require("../models/productModel");

const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const { productName, productDescription, productPrice } =
    req.body;
  const { productImage } = req.files;

  if (
    !productImage ||
    !productName ||
    !productDescription ||
    !productPrice 
    
  ) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      productImage.path,
      {
        folder: "products",
        crop: "scale",
      }
    );

    const newProduct = new Products({
      productImageUrl: uploadedImage.secure_url,
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
    });
    await newProduct.save();
    res.json({
      success: true,
      message: "The product has been created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});
    res.json({
      success: true,
      message: "All the products have been fetched successfully",
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const singleProduct = await Products.findById(productId);
    res.json({
      success: true,
      message: "The single product has been fetched successfully",
      product: singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

const updateProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const { productName, productDescription, productPrice } =
    req.body;
  const { productImage } = req.files;

  if (
    !productName ||
    !productDescription ||
    !productPrice 
  ) {
    return res.json({
      success: false,
      message: "The required fields are missing",
    });
  }

  try {
    if (productImage) {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        productImage.path,
        {
          folder: "products",
          crop: "scale",
        }
      );

      const updatedData = {
        productImageUrl: uploadedImage.secure_url,
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
      };

      const productId = req.params.id;
      await Products.findByIdAndUpdate(productId, updatedData);
      res.json({
        success: true,
        message: "The product has been successfully updated with image",
        updatedProduct: updatedData,
      });
    } else {
      const updatedData = {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
      };

      const productId = req.params.id;
      await Products.findByIdAndUpdate(productId, updatedData);
      res.json({
        success: true,
        message: "The product has been successfully updated without image",
        updatedProduct: updatedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Products.findByIdAndDelete(productId);
    res.json({
      success: true,
      message: "The product has been successfully deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
