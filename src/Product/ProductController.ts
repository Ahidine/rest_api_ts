import ProductRepository from "./ProductRepository";
import {Request,Response, NextFunction} from "express";
import HttpExceptions from "../Exceptions/HttpExceptions";
import NotFoundExceptions from "../Exceptions/NotFoundExceptions";
import Iproduct from "./Iproduct";
import * as path from "path";
import {UploadedFile} from "express-fileupload";
class ProductController {
    protected productRepository = new ProductRepository();
    getAllProducts = async ( req : Request ,res : Response , next : NextFunction)=>{
        try {
            const products = await this.productRepository.findAll();
            res.status(200).json({products});
        }
        catch (e) {
            console.log(e);
           next(new HttpExceptions(500,"something is wrong "))
        }

    };
    getProductById = async (req : Request , res : Response ,  next : NextFunction)=>{
        try {
            const id = req.params.id;
            const product = await this.productRepository.findById(id);
            res.status(200).json({product});
        }
        catch (e) {
            next(new NotFoundExceptions());
        }
    };
    deleteProductById =  async ( req : Request ,res : Response , next : NextFunction)=>{
        try {
            const id = req.params.id;
            const product = <Iproduct> await this.productRepository.deleteById(id);
            res.status(200).json({message : "the product"+ product.name+"is deleted"});
        }
        catch (e) {
            next(new NotFoundExceptions());
        }
    };
    updateProductById = async ( req : Request ,res : Response ,  next : NextFunction)=>{
        try {
            const id = req.params.id;
            const productToUpdate = <Iproduct> req.body;
            const product = <Iproduct> await this.productRepository.updateById(id ,productToUpdate);
            res.status(200).json({product});
        }
        catch (e) {
            next(new NotFoundExceptions());
        }

    };
    createProduct =  async ( req : Request , res : Response , next : NextFunction)=>{
        try {
            console.log("here");
            const productToUpdate = <Iproduct> req.body;
            const product = <Iproduct> await this.productRepository.create(productToUpdate);
            res.status(200).json({product});
        }
        catch (e) {
            next(new NotFoundExceptions());
        }
    };
}
export default ProductController;
