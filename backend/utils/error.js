export class ExpressError extends Error
{
    constructor(){
        super()
        this.code = 500;
        this.display = "OOPS! Something went wrong"
    }
}

