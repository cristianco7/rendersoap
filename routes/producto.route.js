import { Router } from "express";
import { getAll , postProducto, getProducto, deleteProducto, updateProducto   } from "../controllers/producto.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {postProductoValidator} from "../validators/producto.validator.js";

const router = Router();

router.get("/", getAll )  
router.post("/", validate(postProductoValidator) , postProducto )  
router.get("/:id", getProducto);
router.delete("/:id", deleteProducto);
router.put("/:id", updateProducto);



export default router;
