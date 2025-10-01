import {Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import { IProduct } from './producst.model';
import { ProductsDto } from './products.dto';
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Products') private readonly productModel: Model<IProduct>
    ){}

    async create(product: ProductsDto){
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async findAll(){
        return await this.productModel.find().exec();
    }

    async edit(id: string, product: ProductsDto){
        const editProduct=  await this.productModel.findByIdAndUpdate(id, product, {new: true});
        return editProduct;
    }

    async delete(id: string){
        const deleteProduct = await this.productModel.findByIdAndDelete(id);
        return  deleteProduct;
    }

}
