class HttpExceptions {
    public message: string;
    public status : number;

    constructor(statut : number,message : string) {
        this.message = message;
        this.status = statut
    }
}
export default HttpExceptions;
