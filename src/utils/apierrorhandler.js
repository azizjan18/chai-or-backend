import { Error } from "mongoose"

class API_ERROR extends Error {
    constructor(statusCode, 
        message = "something went wrong",
        error = [],
        stack =""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = false
        this.error = error




        if (stack) {
            this.stack = stack
        }
        else{
            error.captureStackTrace(this,this.constructor)
        }
    }
}


export { API_ERROR};