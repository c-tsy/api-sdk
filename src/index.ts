import { Controller } from '@ctsy/request';
import Client from '@ctsy/ws-rpc-client'
import { base_covert } from '@ctsy/covert';
import hook, { HookWhen } from '@ctsy/hook';
const md5: any = require('md5')
class ApiConfig {
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
/**
 * 单聊消息体内容
 */
interface MsgItem {
    /**
     * 消息编号
     */
    MID: string;
    /**
     * 发送方
     */
    From: string;
    /**
     * 接收方
     */
    To: string;
    /**
     * 消息时间版本
     */
    timestamp: number;
    /**
     * 发送方地址，开发者定义，如：四川·绵阳
     */
    Addr: string;
    /**
     * 发送时间
     */
    CTime: number;
    /**
     * 消息类型，默认：text，自定义，如：md,json,xml等等
     */
    CType: string;
    /**
     * 消息来源设备，如：WechatWeb，开发者自定义
     */
    Device: string;
    /**
     * 附件列表,
     */
    Files: string;
    /**
     * 消息状态
     */
    Status: number;
    /**
     * 消息内容
     */
    Text: string;
}
export var ApiWSClient: Client | undefined;
export enum ApiHooks {
    Created = 'ApiCreated'
}
/**
 * 创建Api客户端
 * @param appid 
 * @param secret 
 * @param usertoken 
 */
export default function create(appid: string, secret: string, usertoken: string) {
    ApiConfig.AppID = appid;
    ApiConfig.Secret = secret;
    ApiConfig.UserToken = usertoken;
    ApiWSClient = new Client('wss://https://v1.api.tansuyun.cn/ws', base_covert(10, 62, Math.floor(Math.random() * 1000000)).toString())
    ApiWSClient.create();
    hook.emit(ApiHooks.Created, HookWhen.After, ApiWSClient, ApiConfig);
    if (usertoken) {
        ApiWSClient.subscribe(appid + '/im/recv/' + usertoken, (data, rpc) => {
            hook.emit('im/recv/' + usertoken, HookWhen.After, rpc, data);
        })
    }
    return {
        IM: {
            One: new IM.One(),
            Group: new IM.Group(),
            Kefu: new IM.Kefu()
        }
    }
}
/**
 * 
 */
export class ApiController extends Controller {
    host = "https://v1.api.tansuyun.cn/"
    /**
     * 发起请求
     * @param method 
     * @param data 
     * @param opt 
     */
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
namespace IM {
    export class Kefu extends ApiController {
        isKefu: boolean = false;
        KFID: string = ""
        constructor() {
            super('Kefu')
        }
        /**
         * 客服登陆
         * @param Account 
         * @param PWD 
         */
        async login(Account: string, PWD: string) {
            let rs = await this._post('login', { Account, PWD })
            this.isKefu = true;
            this.KFID = rs.KFID;
            if (ApiWSClient) {
                ApiWSClient.subscribe(ApiConfig.AppID + '/im/kf/recv/' + rs.KFID, (data, rpc) => {
                    hook.emit('im/recv/' + rs.KFID, HookWhen.After, rpc, data);
                })
            }
            return rs;
        }
        /**
         * 退出客服登陆
         */
        async logout() {
            let rs = await this._post('logout', {})
            if (ApiWSClient) {
                ApiWSClient.unsubscribe(ApiConfig.AppID + '/im/kf/recv/' + this.KFID, () => { })
            }
            return true;
        }
        /**
         * 注册客服账号
         * @param Account 
         * @param PWD 
         * @param Group 
         */
        regist(Account: string, PWD: string, Group: string) {
            return this._post('regist', { Account, PWD, Group })
        }
        /**
         * 客户发起请求
         * @param Group 
         * @param Text 
         * @param CType 
         * @param Device 
         * @param Addr 
         * @param Files 
         */
        request(Group: string, Text: string, CType: string = "text", Device: string = "unknow", Addr: string = "", Files: string[] = []) {
            if (this.isKefu) { throw new Error('CustomerOnly') }
            return this._post('request', { Group, Text, CType, Device, Addr, Files })
        }
        /**
         * 客服回复内容
         * @param To 
         * @param Text 
         * @param CType 
         * @param Device 
         * @param Files 
         */
        response(To: string, Text: string, CType: string = 'text', Device: string = 'unknow', Files: string[] = []) {
            if (!this.isKefu) {
                throw new Error('KefuOnly')
            }
            return this._post('response', { Group, Text, CType, Device, To, Files })
        }
    }
    export class Group extends ApiController {
        prefix = '_im';
        constructor() {
            super('Group')
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