export class ParamsError extends Error {
    constructor(name: string) {
        super('参数错误:' + name);
    }
}