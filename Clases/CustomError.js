class CustomError extends Error{
    
    constructor(message, nameError){
        super(message);
        this.name = nameError;
    }
    
}