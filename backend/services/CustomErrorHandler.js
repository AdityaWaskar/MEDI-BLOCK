class CustomErrorHandler extends Error{
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
     }

    static alreadyExist(message){
        return new CustomErrorHandler(409, message);
    } 
    
    static serverError(message = 'Invalid Information'){
        return new CustomErrorHandler(500, message);
    } 

    static notRegister(message){
        return new CustomErrorHandler(401, message);
    }

}

export default CustomErrorHandler;