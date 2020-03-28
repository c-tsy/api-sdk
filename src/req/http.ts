import { Req } from ".";
import Axios from "axios";

import * as store from 'store'
import * as qs from 'querystring'
import * as p from 'protobufjs';
import { ApiConfig } from "..";
const md5: any = require('md5')
export var Token = store.get('token') || ''
const req = Axios.create({
    // responseType: "arraybuffer",
    withCredentials: true,
});

const protoed: { [index: string]: p.Root } = {};
const base = p.Root.fromJSON({ "nested": { "base": { "fields": { "c": { "type": "uint32", "id": 1 }, "e": { "type": "string", "id": 2 }, "d": { "type": "bytes", "id": 3 } } }, "SearchResult": { "fields": { "P": { "type": "uint32", "id": 1 }, "N": { "type": "uint32", "id": 2 }, "T": { "type": "uint32", "id": 3 }, "R": { "type": "bytes", "id": 4 }, "L": { "type": "bytes", "id": 5 } } }, "SearchWhere": { "fields": { "P": { "type": "uint32", "id": 1 }, "N": { "type": "uint32", "id": 2 }, "Keyword": { "type": "string", "id": 3 }, "Sort": { "type": "string", "id": 4 }, "W": { "type": "bytes", "id": 5 } } } } }).lookupType('base')
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
            let pjson = await Axios.get(ApiConfig.Host + '/proto/' + m + '.json')
            protoed[m] = p.Root.fromJSON(pjson.data)
        }
        let msg = protoed[m].lookupType([c, f].join('_'));
        pd.d = msg.toObject(msg.decode(pd.d));
        if (pd.d._ && pd.d._ instanceof Array) {
            pd.d = pd.d._;
        } else if (pd.d._m) {
            pd.d = pd.d._m;
        }
        data.data = pd;
    } else if (ctype.includes('json') && (data.data instanceof ArrayBuffer || data.data instanceof Buffer)) {
        data.data = JSON.parse(Buffer.from(data.data).toString());
    }
    return data;
})
req.interceptors.request.use((conf: any) => {
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
    conf.path = conf.url.replace('/_', '');
    conf.url = ApiConfig.Host + conf.url
    // conf.headers['accept'] = 'application/x-protobuf,*/*'
    return conf;
})
export default class Http extends Req {
    async post() {

    }
    async get() {

    }
    async put() { }
    async del() { }
}