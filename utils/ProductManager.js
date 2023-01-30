import fs from "fs"

export default class ProductManager {

    constructor(){
        this.products = []
        this.path = "./products.json"
    }

    async addProducts(prod){

        try {
        
        const prodsFile = await this.getProducts()
        const productCode = this.#validateCodeProduct(prod.code)

        const product = {
            id: this.#generateId(),
            status: true,
            ...prod
        }

        if(productCode === undefined && prod.title && prod.description && prod.price && prod.stock && prod.code && prod.category){

            prodsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(prodsFile))}}

        catch(error){
            console.log("error")
        }

    }

    #validateCodeProduct(code) {
        return this.products.find(prd=>prd.code===code)
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf-8")
                this.products = JSON.parse(products)
                return this.products
            } else {
                return this.products = []
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    
    async getProductsById(id){
        const prodsFileId = await this.getProducts()
        const productById = prodsFileId.find(product=>product.id===id)
        if (productById === undefined){
            console.log("Not found")
        } else {
            return productById
        }
    }

    async updateProduct(prod){
        const prodToUpdate = await this.getProductsById(parseInt(prod.id))
        
    }
    

    async deleteProduct(prodId){
        const deleteProd = await this.getProducts()
        deleteProd.splice(prodId - 1, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProd))
        return deleteProd
    }

    #generateId() {
        let id = 1
        if (this.products.length !== 0){
            id = this.products[this.products.length - 1].id + 1
        }
        return id
    }
}

let products = new ProductManager()
let product = {id:1,title:"cuchuflito",description:"cuchuflo",price:500,code:10,stock:300,status:true}