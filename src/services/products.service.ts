const fs = require('fs')
const path = require('path')

export class Product {
    public id: string
    public timestamp: Date
    public name: string
    public description: string
    public code: string
    public foto: string
    public price: number
    public stock: number

    constructor(id: string, timestamp: Date, name: string, description: string, code: string, foto: string, price:number, stock: number ){
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.foto = foto;
        this.price = price;
        this.stock = stock;
    }
}

export class Products{
    products: Array<Product>
    
    constructor(arrayProducts: Array<Product>){
        this.products = arrayProducts;
    }

    async getAllProducts(){
        this.products = await bringProductsFromDB()
        if(this.products === null || this.products === []){
            return []
        }
        return this.products;
    }

    async getProductById(id: string){
        this.products = await bringProductsFromDB()
        let product = this.products.find(product => {
            return product.id === id
        })
        if(!product){
            return {}
        }
        return product;
    }

    async addProduct(product: Product){
        this.products = await bringProductsFromDB()
        this.products = [... this.products, product];
        saveProductsToDB(this.products);
        return product;
    }

    async updateProductById(id: string, updatedProduct: any){
        //Encontrar el producto y modificarlo
        this.products = await bringProductsFromDB();
        let product = this.products.find(product => {
            return product.id === id;
        })
        if(!product){
            return {error : 'Producto no encontrado'}
        }
        product.timestamp = updatedProduct.timestamp;
        product.name = updatedProduct.name;
        product.description = updatedProduct.description;
        product.code = updatedProduct.code;
        product.foto = updatedProduct.foto;
        product.price = updatedProduct.price;
        product.stock = updatedProduct.stock;

        //Guardar el nuevo array de productos a la db
        let newProducts = this.products.filter(product => {
            return product.id !== id
        })
        this.products = [...newProducts, product];
        saveProductsToDB(this.products);

        return product;
    }

    async deleteProduct(id: string){
        this.products = await bringProductsFromDB();
        let product = this.products.find(product => {
            return product.id === id;
        })
        if(!product){
            return {error : 'Producto no encontrado'}
        }
        let newProducts = this.products.filter(product => {
            return product.id !== id
        })
        this.products = newProducts;
        saveProductsToDB(this.products);
    }
}

const bringProductsFromDB = async() => {
    try {
        const data = await fs.promises.readFile(`${path.join(__dirname + '/../repositories/products.json')}`, 'utf-8');
        const products = await JSON.parse(data);
        return products;
    } catch (error){
        console.log(error);
        return [];
    }
}

const saveProductsToDB = async(products: Array<Product>) => {
    let parsedProducts = JSON.stringify(products);
    try {
        await fs.promises.writeFile(`${path.join(__dirname + '/../repositories/products.json')}`, parsedProducts);
    } catch (error){
        console.log(error);
        return [];
    }
}
