export class BaseResponse {
    code: number;
    message: string;
    statusCode: number;
    data: object;

    constructor(code: number, message: string, status: number, data?: object) {
        this.code = code;
        this.message = message;
        this.statusCode = status;
        this.data = data;
    }
}