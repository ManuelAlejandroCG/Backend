import fs from 'fs';
import { Cart } from '../models/carts.js';

export class CartManager {
    constructor () {}

    async customConstructor(path){
        this.path = path;
        this.carts = await this.getCarts();
    }

    async readFile(){
        return fs.promises.readFile(this.path, "utf-8")
        .then(datos=> JSON.parse(datos))
    }

    async writeFile(newData){
        return await fs.promises.writeFile(this.path, JSON.stringify(newData))
    }

    async getCarts() {
        const carts = await this.readFile();
        return carts
        }

    async addCart(){
        const carts = await this.readFile();
        const cart = new Cart();
        if (carts === 0){
            cart.setId = 1;
        } else {
            cart.setId = carts[carts.length -1].id + 1;
        }
        this.carts.push(cart);
        await this.writeFile(carts)
        return cart;
    }
    
    async getCartById(id){
        const carts = await this.readFile();
        const datos = carts.find(cart => cart.id == id)
        return datos ? datos : null
    }

    async addProductToCart(cartId, productId){
        const carts = await this.readFile();
        const buscador = carts.findIndex(cart => cart.id == cartId)
        if (buscador === -1){
            console.log("ese id no existe por favor utilice realice un post de cart")
        } else {            
            buscadorProductos = carts[buscador].products.findindex(prod => prod.id == productId)
            if(buscador === -1){                
                carts[buscador].productos.push({"id": productId, "quantity": 1})
            } else {
                carts[buscador].products[buscadorProductos].quantity++;
            }
            await this.writeFile(carts)
        }
    }
}