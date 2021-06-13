import Product from './ProductModel'
import Iproduct from "./Iproduct";
class ProductRepository {
    private productModel  = Product;

    public  findAll = async ()=>
    {
        return await this.productModel.find({}).lean().exec();
    };
    public findById = async (id : string)=>
    {
        return this.productModel.findById(id);
    };
    public deleteById = async (id : string)=>
    {
        return  this.productModel.findByIdAndDelete({
            _id: id
        })
    };
    public updateById = async (id : string , product :Iproduct)=>
    {
        return await this.productModel.findByIdAndUpdate({
                _id : id
            },product,
            {new:true}).lean().exec()
    };
    public create = async (product : Iproduct)=>
    {
        const createdProduct = new this.productModel({
            ...product,
        });
        return await createdProduct.save();
    }
}
export default ProductRepository;
