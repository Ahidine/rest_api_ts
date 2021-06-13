import router from '../interfaces/router'
import {Router} from "express";
import ProductController from "./ProductController";

class ProductRouter  implements router {
    public router = Router();
    public path = '/products';
    public controller : any;
    constructor()
    {
        this.controller = new ProductController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.route(this.path)
            .get(this.controller.getAllProducts)
            .post(this.controller.createProduct);

        this.router.route(this.path + '/:id')
            .get(this.controller.getProductById)
            .put(this.controller.updateProductById)
            .delete(this.controller.deleteProductById);
    }
}
export default ProductRouter;
