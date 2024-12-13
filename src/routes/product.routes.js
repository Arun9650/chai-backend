import { Router } from "express";
import {getAllProduct,uploadProduct} from "../controllers/product.controller.js";




const router = Router();


router.route("/").get(getAllProduct)
router.route("/uploadProduct").post(uploadProduct)

export default router