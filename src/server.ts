import 'dotenv/config';
import App from "./app";
import ProductRouter from "./Product/ProductRouter";


const app = new App([new ProductRouter()]);
app.listen();


