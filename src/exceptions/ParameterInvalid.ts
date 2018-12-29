import HttpException from "./HttpException";

class ParameterInvalid extends HttpException {
    constructor(param: any) {
        super(404, `Parameter ${param} invalid`);
    }
}

export default ParameterInvalid;