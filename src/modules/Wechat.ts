import { ApiController } from '../index';
namespace Wechat {
    class WechatController extends ApiController {
        protected get_url(method: string) {
            if (!WechatID) {
                throw new Error('WechatID Error')
            }
            return ['', this.prefix, this.name, method, WechatID].join('/');
        }
    }
    class auth extends WechatController {
    }
    class admin extends WechatController { }
    class js extends WechatController { }
    class menu extends WechatController { }
    class MsgType {
        value: string = ''
        color: string = ''
    }
    class msg extends WechatController {
        send(TemplateID: string, Data: { OpenID?: string, UID?: number | string, Data: { first: MsgType | string, remark: MsgType | string, [index: string]: MsgType | string } }[]) {
            if (Data instanceof Array && Data.length > 0) {
                for (let x of Data) {
                    if (x.OpenID && x.OpenID.length > 10 || x.UID) {

                    } else {
                        throw new Error('接收对象参数错误')
                    }
                    if (!x.Data.first) {
                        throw new Error('发送对象参数错误')
                    }
                    for (let s of Object.keys(x.Data)) {
                        if ('string' == typeof x.Data[s]) {
                            // if (x.Data[s].length <= 0)
                            //     throw new Error('发送内容为空')
                            // x.Data[s].
                        }
                        switch (s) {
                            case 'first': break;
                            case 'remark': break;
                            default: break;
                        }
                    }
                    if ('string' == typeof x.Data.first && x.Data.first.length > 0) {
                        x.Data.first = { value: x.Data.first, color: '' }
                    } else { throw new Error('First 参数错误') }
                    if ('string' == typeof x.Data.remark && x.Data.remark.length > 0) {
                        x.Data.remark = { value: x.Data.remark, color: '' }
                    } else { throw new Error('First 参数错误') }

                }
                return this.post('send', { TemplateID, Data });
            }
            throw new Error('消息内容应该为数组且长度大于0')
        }
    }
    const prefix = '_wechat'
    export var WechatID = "";
    export function set_wechatid(id: string) {
        WechatID = id;
        return true;
    }
    export const Auth = new auth('Auth', prefix);
    export const Admin = new admin('Admin', prefix);
    export const Js = new js('Js', prefix);
    export const Menu = new menu('Menu', prefix);
    export const MsgApi = new msg('Menu', prefix);
}
export default Wechat;