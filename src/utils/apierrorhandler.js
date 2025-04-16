class API_ERROR extends ERROR {
    constructor(statusCode, 
        message = "something went wrong",
        error = [],
        statk =""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = false
        this.error = error




        if (statck) {
            this.statck = statk
        }
        else{
            error.captureStackTrace(this,this.constructor)
        }
    }
}


export { API_ERROR};