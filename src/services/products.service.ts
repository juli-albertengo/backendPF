import {productModel} from '../repositories/index';

export class Product {
    public id: string
    public name: string
    public category: string
    public description: string
    public foto: string
    public price: number

    constructor(id: string, category: string, name: string, description: string, foto: string, price:number){
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.foto = foto;
        this.price = price;
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

    async getProductsByCategory(category: string){
        let products = await productModel.find({category: category})
        if(products === null || products === []){
            return []
        }
        return products;
    }

    async getProductById(id: string){
        let product = await productModel.findOne({_id: id})
        if(!product){
            return {}
        }
        return product;
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



/* Other functions/methods I could potentially use
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

*/
