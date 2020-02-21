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
    class msg extends WechatController {
        send(TemplateID: string, Data: { OpenID: string, Data: { [index: string]: string }[] }) {
            this.post('send', { TemplateID, Data });
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