import HttpExceptions from "./HttpExceptions";

class  NotFoundExceptions extends HttpExceptions{
        constructor()
        {
            super(404, "Product not found !")
        }
}
export default NotFoundExceptions;
