import { BaseController } from '@ctsy/request';
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
export class ApiHooks {
    static Created = 'ApiCreated';
    static IMEvent = 'IMEvent'
}
/**
 * 创建Api客户端
 * @param appid 
 * @param secret 
 * @param usertoken 
 */
export default function create(appid: string, secret: string) {
    ApiConfig.AppID = appid;
    ApiConfig.Secret = secret;
}
/**
 * 注册IM能力
 * @param ut 
 */
export function registIM(ut: string) {
    if (ut) {
        ApiConfig.UserToken = ut;
        ApiWSClient = new Client('wss://v1.api.tansuyun.cn/ws/?appid=' + ApiConfig.AppID, base_covert(10, 62, Math.floor(Math.random() * 1000000)).toString())
        ApiWSClient.create();
        hook.emit(ApiHooks.Created, HookWhen.After, ApiWSClient, ApiConfig);
        ApiWSClient.subscribe(ApiConfig.AppID + '/im/recv/' + ut, (data) => {
            hook.emit('im/recv', HookWhen.After, data, data.data);
        })
    }
}
/**
 * 
 */
export class ApiController extends BaseController {
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
export namespace User {
    export class Group extends ApiController {
        prefix = 'user_';
        constructor() {
            super('Group');
        }
        /**
         * 获取分组数据
         * @param Type 
         */
        all(Type: string = 'all') {
            return this._post('all', { Type })
        }
        /**
         * 更新分组信息
         * @param UGID 
         * @param Data 
         */
        save(UGID: number, Data: any) {
            return this._post('save', { UGID, Data });
        }
        /**
         * 获取分组用户
         * @param UGID 
         * @param P 
         * @param N 
         */
        members(UGID: number, P: number = 1, N: number = 10) {
            return this._post('members', { UGID, P, N });
        }
        /**
         * 添加分组
         * @param Title 
         * @param Memo 
         * @param Sort 
         * @param PUGID 
         */
        add(Title: string, Memo: string, Sort: number = 0, PUGID: number = 0) {
            return this._post('add', { Title, Memo, Sort, PUGID })
        }
        /**
         * 用户分组
         * @param UGID 
         * @param UIDs 
         */
        link(UGID: number, UIDs: number) {
            return this._post('link', { UGID, UIDs });
        }
        /**
         * 移除用户分组关系
         * @param UGID 
         * @param UIDs 
         */
        unlink(UGID: number, UIDs: number) {
            return this._post('unlink', { UGID, UIDs });
        }
    }
    export class Auth extends ApiController {
        prefix = 'user_';
        constructor() {
            super('Auth');
        }
        /**
         * 账号密码登陆
         * @param Account 
         * @param PWD 
         */
        async login(Account: string, PWD: string) {
            let rs = await this._post('login', { Account, PWD: md5(PWD) })
            if (rs.UID) {
                hook.emit('logined', HookWhen.After, '', rs);
            }
            return rs;
        }
        /**
         * 三方登陆
         * @param Type 
         * @param Account 
         */
        async thirdLogin(Type: string, Account: string) {
            return await this._post('alogin', { Type, Account });
        }
        /**
         * 
         * @param Type 三方登陆绑定
         * @param Account 
         */
        async thirdBind(Type: string, Account: string) {
            return await this._post('abind', { Type, Account });
        }/**
         * 
         * @param Type 三方登陆解绑
         * @param Account 
         */
        async thirdUnBind(Type: string, Account: string) {
            return await this._post('abind', { Type, Account });
        }
        /**
         * 获取我的权限
         */
        async getPermissions() {
            return await this._post('getPermissions', '');
        }
        /**
         * 获取当前登录用户信息
         */
        async info() {
            return await this._post('info', {});
        }
        /**
         * 退出登录
         */
        async logout() {
            let rs = await this._post('logout', {});
            hook.emit('logout', HookWhen.After, '', rs);
            return rs;
        }
        /**
         * 检查并获取当前登录状态，返回内容同登录操作
         */
        async relogin() {
            let rs = await this._post('rlogin', '')
            if (rs.UID) {
                hook.emit('login', HookWhen.After, '', rs);
            }
            return rs;
        }
        /**
         * 账号注册
         * @param Account 
         * @param PWD 
         * @param PUID 
         */
        async regist(Account: string, PWD: string, PUID: string) {
            return await this._post('regist', { Account, PWD: md5(PWD), PUID })
        }
        /**
         * 忘记密码重设
         * @param Account 
         * @param PWD 
         * @param VCode 
         */
        async forget(Account: string, PWD: string, VCode: string) {
            return await this._post('forget', { Account, PWD, VCode });
        }
    }
}
export namespace IM {
    export class Member extends ApiController {
        prefix = "_im"
        constructor() {
            super('Member')
        }
        mine() {
            return this._post('mine', '')
        }
    }
    export class Msg extends ApiController {
        prefix = "_im"
        constructor() {
            super('Msg')
        }
        /**
         * 发送消息
         * @param To 
         * @param Text 
         * @param Opt 
         */
        send(To: string, Text: string, Opt: {
            CType?: string,
            Device?: string,
            Addr?: string,
            Ats?: string[],
            Files?: string[]
        } = {}) {
            // if(Opt.Files)
            return this._post('send', Object.assign(Opt, { To, Text }))
        }
        /**
         * 读取消息
         * @param P 
         * @param N 
         * @param UID 
         */
        read(P: number = 1, N: number = 10, UIDs: string[] = []) {
            return this._post('read', { P, N, UIDs })
        }
    }
}