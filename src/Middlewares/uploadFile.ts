import {NextFunction, Request, Response} from "express";
import {UploadedFile} from "express-fileupload";
import * as path from "path";
import NotFoundExceptions from "../Exceptions/NotFoundExceptions";

const uploadFile = async  ( req : Request , res : Response , next : NextFunction)=>{
    try {
        if(!req.files)
            next(req.body);
        else
        {
            let file =  <UploadedFile> req.files.fichier ;
            let path_file = path.join(path.resolve(__dirname, '../..'), '/public/uploads/'+file.name);
            await file.mv(path_file);
            req.body.file = file.name;
            next()
        }

    }
    catch (e) {
        next(new NotFoundExceptions());
    }
};
export default uploadFile
