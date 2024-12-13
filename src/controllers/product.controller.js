import Product from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products);
})


const uploadProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
})

export  {getAllProduct, uploadProduct};