import { Router } from "express";
import { CartManager } from "../services/cartmanager.js"
import path from 'path';


const router = Router();
const service = new CartManager();
await service.customConstructor(path.resolve() + "\\src\\db\\carts.json");

router.post("/", async (req, res) => {
        const addedCart = await service.addCart();
        if (!!addedCart) {
            ;
            return res.status(200).json({
                status: "Success",
                message: "Cart created successfully",
                data: addedCart
            });
        } else return res.status(400).json({
            status: "Error",
            message: "the cart was not created",
            data: null
        });
});

router.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    const cart = await service.getCartById(id);
    if (!!cart) return res.status(200).json({
        status: "Success",
        message: "Cart found",
        data: cart.products
    })
    else return res.status(404).json({
        status: "Error",
        message: `Cart with id=${id} not found`,
        data: null
    });
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const addedProduct = await service.addProductToCart(cartId, productId);
    if (!!addedProduct) {
        return res.status(200).json({
            status: "Success",
            message: "Product added successfully",
            data: addedProduct
        });
    } else return res.status(400).json({
        status: "Error",
        message: "Invalid request.",
        data: null
    });

});

export default router;