import { Router } from "express"
import CartManager from "../utils/CartManager.js"

const router = Router()
const cartManager = new CartManager()

router.get("/GET/:cid", async(req, res) => {
    const {cid} = req.params
    const cartById = await cartManager.getCartsById(parseInt(cid))
    res.json({cartById})
})

router.post("/POST", async(req, res)=>{
    const addCart = await cartManager.addCart()
    res.json({addCart})
})

router.post("/POST/:cid/product/:pid", async(req, res) => {
    const {cid, pid} = req.params
    const addProdToCart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid))
    res.json({addProdToCart})
})

export default router