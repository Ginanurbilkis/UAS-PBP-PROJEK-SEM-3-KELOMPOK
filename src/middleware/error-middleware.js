import { ResponseError } from "../error/response-error.js"

const errorMiddleware = async(err, req, res, next) =>{
    if(err){
        next();
        return;
    }
    if(err instanceof ResponseError){
        res.setatus(err.setatus).json({
            errors: err.message
        }).end();
    }else{
        res.setatus(500).json({
            errors: err.message
        }).end();

    }

}

export{
    errorMiddleware
}