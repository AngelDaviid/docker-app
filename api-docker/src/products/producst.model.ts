import {Mongoose, Schema} from 'mongoose';
import { MongooseModule } from "@nestjs/mongoose";

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, required: true },
    categories: { type: String },
})

export interface IProduct extends MongooseModule{
    name: string;
    price: number;
    description?: string;
    stock: Number;
    categories: string;
}