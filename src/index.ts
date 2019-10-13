import { Controller } from '@ctsy/request';
const md5: any = require('md5')
export default class ApiConfig {
    static AppID: string = "";
    static Secret: string = "";
    static UserToken: string = "";
}
export class ApiController extends Controller {
    host = "https://v1.api.tansuyun.cn/"
    async _post(method: string, data: any, opt?: any) {
        let headers = {
            appid: ApiConfig.AppID,
            rand: Date.now(),
            md5: '',
            ut: ApiConfig.UserToken,
        }
        headers.md5 = md5([headers.rand, this.get_url(method).replace(this.host, '/'), ApiConfig.Secret].join(''))
        return await super._post(method, data, {
            headers
        });
    }
}
export namespace IM {
    export class One extends ApiController {
        prefix = '_im';
        async send(To: string, Text: string, CType: string, Device: string, Addr: string, Files: string[]) {
            return await this._post('send', { To, Text, CType, Device, Addr, Files })
        }
    }
}