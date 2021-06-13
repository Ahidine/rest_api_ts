import * as mongoose from 'mongoose';
import Iproduct from "./Iproduct";
const productSchema = new mongoose.Schema({
        name: {
            type : String,
            trim : true,
            maxlength:50
        },
        file: {
            type : String,
        },
        description : {
            type : String,
        },
        price : {
            type : Number
        },
        inStock :{
            type: Boolean
        }
    },
    { timestamps: true }
);
const Product = mongoose.model<Iproduct & mongoose.Document>('product', productSchema);
export default Product;
