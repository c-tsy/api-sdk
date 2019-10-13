import { Controller } from '@ctsy/request';
const md5: any = require('md5')
export default class ApiConfig {
    static AppID: string = "";
    static Secret: string = "";
    static UserToken: string = "";
}

interface SearchResult {
    L: any[];
    P: number;
    N: number;
    T: number;
    R: any;
}
interface MsgReadSearchResult {
    L: MsgItem[];
    P: number;
    N: number;
    T: number;
    R: any;
}

interface MsgItem {
    MID: string;
    From: string;
    To: string;
    timestamp: number;
    Addr: string;
    CTime: number;
    CType: string;
    Device: string;
    Files: string;
    Status: number;
    Text: string;
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
        constructor() {
            super('One')
        }
        /**
         * 发送消息
         * @param To 接收者 
         * @param Text 内容
         * @param CType 内容类型
         * @param Device 设备类型
         * @param Addr 地址
         * @param Files 附件列表
         */
        async send(To: string, Text: string, CType: string = "text", Device: string = "unknow", Addr: string = '', Files: string[] = []) {
            return await this._post('send', { To, Text, CType, Device, Addr, Files })
        }
        /**
         * 读取消息记录
         * @param P 页码
         * @param N 每页数量
         * @param To 接收者
         */
        async read(P: number = 1, N: number = 10, To?: string): Promise<MsgReadSearchResult> {
            return await this._post('read', { P, N, To })
        }
    }
}