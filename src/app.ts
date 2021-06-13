import * as express from "express";
import * as mongoose from "mongoose";
import { json, urlencoded } from 'body-parser'
import errorMiddleware from "./Middlewares/errorMiddleware";
import * as fileUpload from "express-fileupload"
import router from "./interfaces/router";
import * as path from "path";
import uploadFile from "./Middlewares/uploadFile";

class App {
    public app : express.Application;
    constructor(routes : router[])
    {
        this.app = express();
        try {
            this.connectToTheDatabase().then(r => console.log("connected"));
            this.initializeMiddlewares();
            this.initializeRoutes(routes);
            this.initializeErrorHandling();
        }
        catch (e) {
            console.log(e);
        }

    }
    public listen()
    {
        this.app.listen(process.env.PORT, ()=>{
            console.log('App listening on the port '+process.env.PORT);
        })
    }
    private  connectToTheDatabase = async() => {
        const {MONGO_USER,MONGO_PASSWORD,MONGO_PATH} = process.env;
        try {
            await mongoose.connect(`mongodb+srv://hidine:JvISsSkcctwzMrY3@cluster0.onlaq.mongodb.net/myFirstDatabase?retryWrites=true`,
                {  useUnifiedTopology: true  , useNewUrlParser: true });
        }
        catch (e) {
            console.error(e);
        }
    };

    private initializeMiddlewares() {
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(fileUpload({
            createParentPath : true,
            debug : true
        }));
        console.log(path.join(path.resolve(__dirname, '..'), '/public/uploads'));
        this.app.use('/uploads',express.static(path.join(path.resolve(__dirname, '..'), '/public/uploads')));
        this.app.use(uploadFile);
    }

    private initializeRoutes(routes : router[]) {
        routes.map(r=>{
            this.app.use('/api', r.router)
        })
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }
}

export default App;
