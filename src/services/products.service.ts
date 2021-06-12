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
        try {
            this.products = await productModel.find({})
            if(this.products === null || this.products === []){
                return []
            }
            return this.products;
        } catch (error){
            console.log(error)
            return [];
        }
    }

    async getProductsByCategory(category: string){
        try{
            let products = await productModel.find({category: category})
            if(products === null || products === []){
                return []
            }
            return products;
        } catch (error){
            console.log(error)
            return [];
        }

    }

    async getProductById(id: string){
        try {
            let product = await productModel.findOne({_id: id})
            if(!product){
                return {}
            }
            return product;
        } catch (error){
            console.log(error)
            return {};
        }
    }

    async addProduct(product: any){
        let productToSave = new productModel(product);
        try {
            let savedProduct = await productToSave.save();
            return savedProduct;
        } catch (error) {
            console.log(error);
            return {}
        }
    }

    async updateProductById(id: string, updatedProduct: any){
        try {
            let product = await productModel.updateOne({_id: id}, {$set: updatedProduct});
            if(!product){
                return {error : 'Product not found'}
            }
            return product;
        } catch (error) {
            console.log(error);
            return {}
        }
    }

    async deleteProduct(id: string){
        try {
            let product = await productModel.deleteOne({_id: id})
            if(!product){
                return {error: `Product not found`}
            }
            return product;
        } catch (error){
            console.log(error);
            return {}
        }
    }
}


//OTHER METHODS I COULD POTENTIALLY INCLUDE IN THE PRODUCTS CLASS
/*

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
