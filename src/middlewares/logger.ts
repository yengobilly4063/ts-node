import  { NextFunction, Response, Request } from "express"

function loggerMiddleware(request: Request, response: Response, next: NextFunction){
    console.log(`${request.method} ${request.url}`)
    next()
}

export default loggerMiddleware