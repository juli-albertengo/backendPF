import {productModel} from '../repositories/index';

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
    products: any;
    
    constructor(arrayProducts: any){
        this.products = arrayProducts;
    }

    async getAllProducts(){
        this.products = await productModel.find({})
        if(this.products === null || this.products === []){
            return []
        }
        return this.products;
    }

    async getProductById(id: string){
        let product = await productModel.findOne({_id: id})
        if(!product){
            return {}
        }
        return product;
    }

    async getProductsByName(name: string){
        let expr = new RegExp(name, "gi")
        let products = await productModel.find({name: {$regex: expr}})
        if(products === null || products === []){
            return []
        }
        return products;
    }

    async getProductsByPriceRange(min, max){
        let myMin = parseInt(min);
        let myMax = parseInt(max);
        let products = await productModel.find({$and : [{price: {$gte: myMin}}, {price: {$lte: myMax}}]})
        if(products === null || products === []){
            return []
        }
        return products;
    }

    async addProduct(product: any){
        let productToSave = new productModel(product);
        let savedProduct = await productToSave.save();
        return savedProduct;
    }

    async updateProductById(id: string, updatedProduct: any){
        let product = await productModel.updateOne({_id: id}, {$set: updatedProduct});
        if(!product){
            return {error : 'Producto no encontrado'}
        }
        return product;
    }

    async deleteProduct(id: string){
        let product = await productModel.deleteOne({_id: id})
        if(!product){
            return {}
        }
        return product;
    }
}

