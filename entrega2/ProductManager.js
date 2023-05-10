const fs = require ('fs')

class ProductManager {
    constructor(archivo){
        this.path = archivo
        this.productos = []
    }

    async leerArchivo(){
        return fs.promises.readFile(this.path, "utf-8")
        .then(datos=> JSON.parse(datos))
    }

    escribirArchivo(){
        return fs.promises.writeFile(this.path, JSON.stringify(this.productos))
    }


    async start() {
        try {
            const datos =  await this.leerArchivo()
            if (datos.length > 0){
                this.productos = datos
            }
        } catch (err) {
            console.log(err)
        }
    }

    async addProduct(product){
        if (this.productos.length === 0){
            product.id = 1;
        } else {
            product.id = this.productos[this.productos.length -1].id + 1;
        }
        this.productos.push(product)
        try{
            await this.escribirArchivo()
        } catch(err) {
            console.log(err)
        }
    }

    async updateProduct(product){
        const buscador = this.productos.findIndex(prod => prod.id == product.id)
        if (buscador === -1){
            console.log("ese id no existe por favor utilice addProduct")
        } else {            
            this.productos[buscador] = product
            await this.escribirArchivo()
        }
    }

    async getProducts(){
        return this.productos
    }

    async getProductsByID(id){
        const datos = this.productos.find(prod => prod.id == id)
        return datos ? datos : "no existe ese ID"
    }

    async deleteProduct(id){
        const buscador = this.productos.findIndex(prod => prod.id == id)
        this.productos.splice(buscador, 1)
        console.log("/////////////////////////////////////////////////////////////////////////////////////////////////////////////")
        console.log(this.productos)

        try{
            this.escribirArchivo()
        } catch (err) {
            console.log("ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA")
            console.log(err)
        }
    }

    leerArchivo(){
        return fs.promises.readFile(this.path, "utf-8")
        .then(datos=> JSON.parse(datos))
    }

    escribirArchivo(){
        return fs.promises.writeFile(this.path, JSON.stringify(this.productos))
    }

}

module.exports = ProductManager
