import axios, { AxiosResponse } from 'axios';
import * as store from 'store'
import * as qs from 'querystring'
import * as p from 'protobufjs/light';
import { SearchWhere, SearchResult, ApiSDKHooks as hooks } from './lib';
import hook, { Hook, HookWhen } from '@ctsy/hook';
import { debug } from 'console';
// import * as rpc from '@ctsy/ws-rpc-client';

declare let window: any;
declare let uni: any;
let blocked: { [index: string]: string[] } = {

}

setInterval(() => {
    if (Object.keys(blocked).length > 1) {
        for (let x in blocked) {
            if (Number(x) < Math.ceil(Date.now() / 1000 - 6)) {
                delete blocked[x];
            }
        }
    }
}, 10000);

export const ApiSDKHooks = hooks;

const rate = {
    time: {},
}

var isWindow: boolean = true
try {
    //uniapp中不存在globalThis变量
    var global: any = globalThis;
    isWindow = global.__proto__.constructor.name == 'Window';
} catch (error) {

}
// var debugs: string[] = []
// function //debug(txt: string, end: boolean = false) {
//     debugs.push(txt);
//     if (end) {
//         console.log(debugs.join('\r\n'))
//         debugs = [];
//     }
// }
p.wrappers[".google.protobuf.Timestamp"] = {
    fromObject: function (object: any) {
        //Convert ISO-8601 to epoch millis
        var dt = Date.parse(object);
        return this.create({
            seconds: Math.floor(dt / 1000),
            nanos: dt % 1000
        })
    },
    toObject: function (message: any, options) {
        return new Date(message.seconds * 1000 + message.nanos);
    }
};

const md5: any = require('md5')
/**
 * 用户识别符
 */
export let Token = ''
Token = store.get('token') || '';
/**
 * 设置通信Token
 * @param token 
 */
export function set_token(token: string) {
    Token = token;
    store.set('token', token)
}
const req = axios.create({
    // responseType: "arraybuffer",
    withCredentials: true,
});
const protoed: { [index: string]: p.Root } = {};
const base = p.Root.fromJSON({ nested: { base: { fields: { c: { type: "uint32", id: 1 }, e: { type: "string", id: 2 }, d: { type: "bytes", id: 3 } } }, SearchResult: { fields: { P: { type: "uint32", id: 1 }, N: { type: "uint32", id: 2 }, T: { type: "uint32", id: 3 }, R: { type: "bytes", id: 4 }, L: { type: "bytes", id: 5 } } }, SearchWhere: { fields: { P: { type: "uint32", id: 1 }, N: { type: "uint32", id: 2 }, Keyword: { type: "string", id: 3 }, Sort: { type: "string", id: 4 }, W: { type: "bytes", id: 5 } } } } }).lookupType('base')
req.interceptors.response.use(async (data: any) => {
    if (data.headers['token']) {
        Token = data.headers['token'];
        store.set('token', Token)
    }
    let ctype = data.headers['content-type'] || ''
    if (ctype.includes('protobuf')) {
        //准备进行protobuf的解码，并将解码内容放到data中
        let pd: any = base.decode(p.util.newBuffer(data.data))
        let [m, c, f] = data.config.path.split('/');
        if (!protoed[m]) {
            try {
                let pjson = await axios.get(ApiConfig.Host + '/proto/' + m + '.json')
                protoed[m] = p.Root.fromJSON(pjson.data)
            } catch (error) {
                //自动退回到JSON模式
                ApiConfig.Debug = true;
                // debugger
                protoed[m] = p.Root.fromJSON({})
            }
        }
        let msg = protoed[m].lookupType([c, f].join('_'));
        let decoded = msg.decode(pd.d);
        pd.d = msg.toObject(decoded);
        if (pd.d._ && pd.d._ instanceof Array) {
            pd.d = pd.d._;
        } else if (pd.d._m) {
            pd.d = pd.d._m;
        }
        data.data = pd;
    } else if (ctype.includes('json') && (data.data instanceof ArrayBuffer || data.data instanceof Buffer)) {
        data.data = JSON.parse(Buffer.from(data.data).toString());
    }
    // if (data.md5content) {
    //     cached[data.md5content] = data.data;
    // }
    return data;
})
req.interceptors.request.use(async (conf: any) => {
    if (!ApiConfig.AppID || !ApiConfig.Secret) {
        // throw new Error('AppID or Secret')
    }
    if (Token) {
        conf.headers['token'] = Token;
    }
    // 取得当前13位毫秒时间戳
    let rand = conf.start = Date.now()
    //debug('1.取得当前毫秒级时间戳，若是秒级时间戳请在末尾添加3个0:' + rand)
    // 准备一个字符串，用于存储签名内容，分别用 时间戳，请求路径，密钥 组合
    let txt = [rand, conf.url, ApiConfig.Secret].join('');
    //debug('2.组合 时间戳,请求路径,密钥 直接按字符串链接:')
    //debug(`\t"${rand}" + "${conf.url}" + "${ApiConfig.Secret}" = "${txt}"`)
    if ('string' != typeof conf.data) {
        if (conf.method == 'get') {
            conf.data = qs.stringify(conf.data);
            if (conf.data.length > 0) {
                txt += conf.data;
                conf.url = conf.url + '?' + conf.data;
            }
        } else {
            conf.headers['content-type'] = 'application/json';
            let str = JSON.stringify(conf.data);
            // 将请求的内容字符串化后添加到签名字符串中，
            txt += str;
            conf.data = str;
            let tm = Math.ceil(Date.now() / 3000);
            if (!blocked[tm]) {
                blocked[tm] = [];
            }

            let md5content = md5(conf.url + str);
            if (blocked[tm] && blocked[tm].includes(md5content)) {
                console.trace('重复请求,请求地址:' + conf.url, conf.data);
            } else {
                blocked[tm].push(md5content);
            }
            conf.md5content = md5content;
            //debug('3. 将请求内容追加到签名字符串中:')
            //debug(`\t请求内容:\r\n\t${str}`)
            //debug(`\t追加后:\r\n\t${txt}`)
        }
    }
    // 生成签名内容 分别是 AppID，Key，随机数，md5后的签名用下划线链接
    let sign = md5(txt);
    //debug(`4. 将签名内容进行MD5运算得到:${sign}`)
    conf.headers['auth'] = [ApiConfig.AppID, ApiConfig.Key, rand, sign].join('_');
    //debug(`5. 组合参数形成header中的auth信息：\r\n\t分别将：AppID,Key,时间戳,签名 按 _ 进行组合：`)
    //debug(`\t"${ApiConfig.AppID}", "${ApiConfig.Key}", "${rand}", "${sign}"`)
    //debug(`\t发送的header中的auth参数为:${conf.headers['auth']}`)
    //debug(`\t发送的header中的token参数为:${conf.headers['token']}`)

    // return;
    conf.path = conf.url.replace('/_', '');
    if (!conf.url.startsWith('http'))
        conf.url = ApiConfig.Host + conf.url
    else {
        conf.url = conf.url.replace(/^\//, '');
    }
    // conf.headers['accept'] = 'application/x-protobuf,*/*'
    // await hook.emit(ApiSDKHooks.Request, HookWhen.Before, req, conf)
    await hook.emit(ApiSDKHooks.Request, HookWhen.Before, conf.data, { conf, config: conf, req: conf.data, rep: {}, error: "" });
    await hook.emit(ApiSDKHooks.Request + conf.path, HookWhen.Before, conf.data, { conf, config: conf, req: conf.data, rep: {}, error: "" });
    return conf;
})

// function check_proto(path: string) {
//     let [m, c, f] = path.replace('_', '').split('/')
//     if (ApiConfig.protos[m] && ApiConfig.protos[m][c])
// }
async function request(method: 'post' | 'get', path: string, data: any) {
    let q: any = req[method], conf: any = {};
    if (false === ApiConfig.inited) {
        if (ApiConfig.Debug == false)
            try {
                await axios.get(ApiConfig.Host + '/proto/list.json').then((d) => {
                    ApiConfig.protos = d.data;
                    // debugger
                }).catch((e: any) => { })
            } catch (error) {

            }
        // try {
        //     if (isWindow && uni) {
        //uniapp 环境
        // axios.defaults.adapter = function (config: any) {
        //     return new Promise((resolve, reject) => {
        //         var settle = require('axios/lib/core/settle');
        //         var buildURL = require('axios/lib/helpers/buildURL');
        //         uni.request({
        //             method: config.method.toUpperCase(),
        //             url: buildURL(config.url, config.params, config.paramsSerializer),
        //             header: config.headers,
        //             data: config.data,
        //             dataType: config.dataType,
        //             responseType: config.responseType,
        //             sslVerify: config.sslVerify,
        //             complete: function complete(response: any) {
        //                 response = {
        //                     data: response.data,
        //                     status: response.statusCode,
        //                     errMsg: response.errMsg,
        //                     statusText: response.errMsg,
        //                     headers: response.header,
        //                     config: config
        //                 };
        //                 settle(resolve, reject, response);
        //             }
        //         })
        //     })
        // }
        //     }
        // } catch (error) {

        // }
        ApiConfig.inited = true;
    }
    let [m, c, f] = path.replace('/_', '').split('/');
    if (
        isWindow
        && ApiConfig.Debug === false
        && ApiConfig.protos[m]
        && ApiConfig.protos[m][c]
        && ApiConfig.protos[m][c][f]
    ) {
        conf.responseType = "arraybuffer";
        conf.headers = { accept: 'application/x-protobuf' }
        if (!protoed[m]) {
            axios.get(ApiConfig.Host + '/proto/' + m + '.json').then((pjson) => {
                protoed[m] = p.Root.fromJSON(pjson.data)
            }).catch((e) => {
                //自动退回到JSON模式
                ApiConfig.Debug = true;
                // debugger
                protoed[m] = p.Root.fromJSON({})
            })
        }
    }
    if (method == 'get') {
        // path += ('?' + query.stringify(data));
    }

    return await q(path, method == 'get' ? conf : data, conf).then(async (e: AxiosResponse | any) => {
        conf = e.config;
        if (e.data.c != 200) {
            let err = e.data.e || {};
            err = 'object' == typeof err ? err.m : ('string' == typeof err ? err : e.data.c)
            // await hook.emit(ApiSDKHooks.Request, HookWhen.Error, req, { conf, req: data, rep: e, error: err });
            throw new Error(err);
        }
        log(path, method, e.config.start, Date.now() - e.config.start, e.data.c || e.status, e.config.data.length, e.headers['content-length'], e.data.e ? e.data.e.m : '', e.config.md5content)
        let d = await hook.emit(ApiSDKHooks.Request, HookWhen.After, e.data, { conf, config: conf, req: data, rep: e.data, error: "" });
        // if (d !== undefined) {
        //     e.data = d;
        // }
        d = await hook.emit(ApiSDKHooks.Request + conf.path, HookWhen.After, e.data, { conf, config: conf, req: e.data, rep: {}, error: "" });
        // if (d !== undefined) {
        //     e.data = d;
        // }
        return e.data.d;
    }).catch(async (e: any) => {
        let err = e.message;
        if (e.response && e.response.data) {
            log(path, method, e.config.start, Date.now() - e.config.start, e.response.status, e.config.data.length, e.response.headers['content-length'], e.response.data.e.m, e.config.md5content)
            err = e.response.data.e ? e.response.data.e.m : e.response.data;
        }
        await hook.emit(ApiSDKHooks.Request, HookWhen.Error, e.data, { conf, config: conf, req: data, rep: e.data, error: err });
        await hook.emit(ApiSDKHooks.Request + conf.path, HookWhen.Error, e.data, { conf, config: conf, req: e.data, rep: {}, error: "" });
        throw new Error(err);
    });
}
/**
 * 记录请求日志
 * @param path 
 * @param method 
 * @param time 
 * @param t 
 * @param status 
 * @param reqlen 
 * @param replen 
 * @param err 
 */
function log(path: string, method: string, time: number, t: number, status: number, reqlen: number, replen: number, err: string = '', md5: string) {
    // axios.get('https://tsyapi.cn-hangzhou.log.aliyuncs.com/logstores/web/track_ua.gif?APIVersion=0.6.0&__topic__=api&' + ['md5=' + md5, 'appid=' + ApiConfig.AppID, 'uid=' + ApiConfig.UID, 'token=' + Token, 'time=' + time, 'path=' + encodeURI(path), 'reqlen=' + reqlen, 'replen=' + replen, 'method=' + method, 'key=' + ApiConfig.Key, 't=' + t, 'status=' + status, 'e=' + err, 'hash=' + (isWindow ? encodeURI(window.location.hash) : '')].join('&'))
}

export class ApiHooks {
    static Created = 'ApiCreated';
    static IMEvent = 'IMEvent'
}
/**
 * 应用配置信息
 */
class ApiConfigClass {
    /**
     * 应用AppID
     */
    AppID: string = "";
    /**
     * 应用键
     */
    Key: string = "";
    /**
     * 应用密钥，支持随机数混淆
     */
    Secret: string = "";
    /**
     * 当前登录用户
     */
    UID: string | number = "";
    /**
     * 开启调试模式
     */
    Debug: boolean = false;
    /**
     * 密钥混淆值，字典序正序
     */
    Rand: string = "";
    protected _host: string = "https://v1.api.tansuyun.cn";
    /**
     * 服务器地址
     */
    set Host(v: string) {
        this._host = v.indexOf('http') == 0 ? v : ('https://' + v);
        if (this._host.endsWith('/')) {
            this._host = this._host.substr(0, this._host.length - 1);
        }
    }
    get Host() { return this._host; }
    /**
     * 
     */
    protos: { [index: string]: { [index: string]: { [index: string]: string[] } } } = {};
    /**
     * 初始化
     */
    inited: boolean = false;
}
export const ApiConfig = new ApiConfigClass
/**
 * 
 */
export class ApiController {
    name: string = "";
    prefix: string = "";
    host: string = "";
    constructor(name: string, prefix: string) {
        this.name = name;
        this.prefix = prefix;
    }
    protected get_url(method: string) {
        let p = [this.host];
        if (this.prefix) {
            p.push(this.prefix);
        }
        p.push(this.name); p.push(method)
        return p.join('/')
        // return [this.host, this.prefix, this.name, method].join('/');
    }
    /**
     * 发起请求
     * @param method 
     * @param data 
     * @param opt 
     */
    _post(method: string, data: any = {}) {
        return request('post', this.get_url(method), data);
    }
    /**
     * 
     * @param method 
     * @param data 
     */
    _get(method: string, data: any = {}) {
        return request('get', this.get_url(method), data);
    }
}
/**
 * 使用d.api.tansuyun.cn域名的访问
 */
export class DApiController extends ApiController {
    host: string = "https://d.api.tansuyun.cn";
}
/**
 * 
 * @param url 
 */
export function jsonp(url: string, cbname: string = '', timeout: number = 1000): Promise<any> {
    return new Promise((s, j) => {
        if ('string' != typeof cbname) {
            cbname = (Math.random() * 100000).toFixed(0)
        }
        url = url.includes('?') ? url + '&cb=' + cbname : url + '?cb=' + cbname
        if (!window[cbname]) {
            window[cbname] = s;
        }
        let script = document.createElement('script')
        script.src = url;
        document.body.appendChild(script);
        setTimeout(() => {
            j('Timeout')
            document.body.removeChild(script);
            delete window[cbname]
        }, timeout)
    })

}
/**
 * 创建Api客户端
 * @param appid 
 * @param secret 
 * @param usertoken 
 */
export default function create(appid: string, key: string, secret: string, rand: string = '') {
    ApiConfig.AppID = appid;
    ApiConfig.Secret = secret;
    ApiConfig.Key = key;
    ApiConfig.Rand = rand;
}


export namespace ApiCommon {
    /**
     * 列表数据结构
     */
    export class List<T> {
        /**
         * 数据类容
         */
        L: T[] = [];
        /**
         * 累计总数
         */
        T: number = 0;
        /**
         * 分页页码
         */
        P: number = 1;
        /**
         * 分页页内数
         */
        N: number = 10;
        /**
         * 统计数据，可选
         */
        R?: Object = {};
    }
}
/**
 * 不完整的完整控制器
 */
export class ControllerApi<T> extends ApiController {
    PK: string = "ID"
    /**
     * 查询接口
     * @param d 
     */
    search(d: SearchWhere): PromiseLike<SearchResult<T>> {
        return this._post('search', d).then((v) => {
            if (!v.L) {
                v.L = [];
            }
            return v;
        });
    }
    /**
     * 单个添加数据
     * @param d 
     */
    add(d: T): Promise<T> {
        return this._post('add', d);
    }
    /**
     * 批量添加数据
     * @param d 
     */
    adds(d: T[]): Promise<T[]> {
        return this._post('adds', d);
    }
    /**
     * 更新某个数据
     * @param PKID 
     * @param Params 
     */
    save(PKID: number | T, Params?: T) {
        if ('object' == typeof PKID) {
            return this._post('save', { [this.PK]: (<any>PKID)[this.PK], Params: PKID })
        }
        return this._post('save', { [this.PK]: PKID, Params })
    }
    /**
     * 属性结构读取
     * 返回结构默认为数组，若需要组合成树形结构请使用array_tree方法
     * @param W 
     * @param Deep 
     */
    async tree(W: { [index: string]: number[] | number }, Deep: number = 3) {
        return this._post('tree', Object.assign(W, { Deep }))
    }
    /**
     * 读取单个
     * @param PKID 
     */
    get(PKID: number) {
        return this._post('get', { [this.PK]: PKID })
    }
    /**
     * 删除
     * @param PKID 
     */
    del(PKID: number) {
        return this._post('del', { [this.PK]: PKID });
    }
    /**
     * 读取分组统计数据
     * @param d 
     */
    group(d: { Group: string, Sum: string, Count: string, Max: string, Min: string, Avg: string, W: { [index: string]: any } }[]) {
        return this._post('group', d);
    }
}



if (isWindow) {
    window.CTsyApiSDK = {
        ApiSDKHooks,
        set_token,
        ApiHooks,
        ApiConfig,
        ApiController,
        jsonp,
        create,
        default: create,
        ApiCommon,
        ControllerApi,
        SearchWhere,
        SearchResult,
    }
}