import axios from 'axios';
import * as store from 'store'
import * as qs from 'querystring'
const md5: any = require('md5')
var Token = store.get('token') || ''
const req = axios.create();

req.interceptors.response.use((data) => {
    if (data.headers['token']) {
        Token = data.headers['token'];
        store.set('token', Token)
    }
    return data;
})

req.interceptors.request.use((conf) => {
    if (!ApiConfig.AppID || !ApiConfig.Secret) {
        // throw new Error('AppID or Secret')
    }
    if (Token) {
        conf.headers['token'] = Token;
    }
    conf.headers['appid'] = ApiConfig.AppID + '_' + ApiConfig.Key;
    conf.headers['rand'] = Date.now();
    conf.headers['md5']
    if (ApiConfig.UID) {
        conf.headers['uid'] = ApiConfig.UID;
    }
    let txt = [conf.headers['rand'], conf.headers['uid'] || '', conf.url, ApiConfig.Secret].join('');
    if ('string' != typeof conf.data) {
        if (conf.method == 'get') {
            conf.data = qs.stringify(conf.data);
            if (conf.data.length > 0) {
                txt += conf.data;
                conf.url = conf.url + '?' + conf.data;
            }
        } else {
            conf.headers['content-type'] = 'application/json';
            conf.data = JSON.stringify(conf.data);
            txt += conf.data;
        }
    }
    conf.headers['md5'] = md5(txt);
    if (ApiConfig.Rand) {
        conf.headers['rkey'] = ApiConfig.Rand;
    }
    conf.url = ApiConfig.Host + conf.url
    return conf;
})

function request(method: 'post' | 'get', path: string, data: any) {
    let q: any = req[method];
    return q(path, method == 'get' ? { data } : data).then((e: any) => {
        log(path, method, e.config.headers['rand'], Date.now() - e.config.headers['rand'], e.data.c || e.status, e.config.data.length, e.headers['content-length'], e.data.e ? e.data.e.m : '')
        if (e.data.c != 200) {
            throw new Error(e.data.e.m || e.data.c);
        }
        return e.data.d;
    }).catch((e: any) => {
        if (e.response && e.response.data) {
            log(path, method, e.config.headers['rand'], Date.now() - e.config.headers['rand'], e.response.status, e.config.data.length, e.response.headers['content-length'], e.response.data.e.m)
            throw new Error(e.response.data.e.m);
        }
        throw new Error(e.message)
    });
}

function log(path: string, method: string, time: number, t: number, status: number, reqlen: number, replen: number, err: string = '') {
    axios.get('https://tsy-app.cn-hangzhou.log.aliyuncs.com/logstores/tsy-web-api/track_ua.gif?APIVersion=0.6.0&__topic__=api&' + ['appid=' + ApiConfig.AppID, 'uid=' + ApiConfig.UID, 'token=' + Token, 'time=' + time, 'path=' + encodeURI(path), 'reqlen=' + reqlen, 'replen=' + replen, 'method=' + method, 'key=' + ApiConfig.Key, 't=' + t, 'status=' + status, 'e=' + err].join('&'))
}

export class ApiHooks {
    static Created = 'ApiCreated';
    static IMEvent = 'IMEvent'
}

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
     * 密钥混淆值，字典序正序
     */
    Rand: string = "";
    protected _host: string = "https://v1.api.tansuyun.cn";
    /**
     * 服务器地址
     */
    set Host(v: string) {
        this._host = v.indexOf('http') == 0 ? v : ('https://' + v);
    }
    get Host() { return this._host; }
}
export const ApiConfig = new ApiConfigClass
/**
 * 
 */
export class ApiController {
    name: string = "";
    prefix: string = "";
    constructor(name: string, prefix: string) {
        this.name = name;
        this.prefix = prefix;
    }
    protected get_url(method: string) {
        return ['', this.prefix, this.name, method].join('/');
    }
    /**
     * 发起请求
     * @param method 
     * @param data 
     * @param opt 
     */
    post(method: string, data: any = {}) {
        return request('post', this.get_url(method), data);
    }
    /**
     * 
     * @param method 
     * @param data 
     */
    get(method: string, data: any = {}) {
        return request('get', this.get_url(method), data);
    }
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
