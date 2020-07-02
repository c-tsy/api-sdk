import { ApiController } from '../index';
import { SearchWhere } from '../lib';
namespace Wechat {
    export class ClassWechatUserGroup {
        /**
         * 用户组编号
         */
        GroupID = 0
        /**
         * 组名
         */
        Name = ''
        /**
         * 状态
         */
        Status = 1
        /**
         * C时间
         */
        CTime = ''
    }

    export class ClassWechatUserGroupLink {
        LinkID = 0
        WUID = 0
        GroupID = 0
    }
    export class ClassWechatUser {
        /**
         * 用户编号
         */
        WUID = 0
        /**
         * 是否关注
         * 0未关注 1已关注
         */
        Subscribe = 1
        /**
         * openid
         */
        OpenID = ''
        /**
         * 昵称
         */
        NickName = ''
        /**
         * 性别
         */
        Sex = 0
        /**
         * 语言
         */
        Language = ''
        /**
         * 城市
         */
        City = ''
        /**
         * 省
         */
        Province = ''
        /**
         * 国家
         */
        Country = ''
        /**
         * 头像
         */
        HeadImgUrl = ''
        /**
         * 关注时间
         */
        SubscribeTime = ''
        /**
         * 区域ID
         */
        UnionID = ''
        /**
         * 备注
         */
        Remark = ''
        /**
         * 分组ID
         */
        GroupID = 0
        /**
         * MD5
         */
        MD5 = ''
        /**
         * 二维码
         */
        QrScene = 0
        /**
         * 二维码串
         */
        QrSceneStr = ''
        /**
         * 
         */
        SubscribeScene = ''
        /**
         * 更新shijian
         */
        UTime = ''
    }

    class WechatController extends ApiController {
        protected get_url(method: string) {
            if (!WechatID) {
                throw new Error('WechatID Error')
            }
            return ['', this.prefix, this.name, method, WechatID].join('/');
        }
    }
    class users extends WechatController {
        sync() {
            return this._post('sync')
        }
        search(w: SearchWhere) {
            return this._post('search', w)
        }
        save(d: Wechat.ClassWechatUser) {
            return this._post('save', d)
        }
        remark(d: Wechat.ClassWechatUser) {
            return this._post('remark', d)
        }
    }
    class group extends WechatController {
        add(Name: string) {
            return this._post('add', { Name })
        }
        search() {
            return this._post('search')
        }
        save(data: ClassWechatUserGroup) {
            return this._post('update', data)
        }
        sync() {
            return this._post('sync')
        }
        del(data: ClassWechatUserGroup) {
            return this._post('del', data)
        }
        link(data: { WUID: number, GroupID: number }) {
            return this._post('link', data)
        }
        unlink(data: { WUID: number, GroupID: number }) {
            return this._post('unlink', data)
        }
    }
    class auth extends WechatController {
        user() {
            return this._post('user')
        }
    }
    class admin extends WechatController {
        users() {
            return this._post('users')
        }
        batch() {
            return this._post('batch')
        }

    }
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
                return this._post('send/' + WechatID, { TemplateID, Data });
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

    export const Users = new users('Users', prefix)
    export const Group = new group('Group', prefix)
    export const Auth = new auth('Auth', prefix);
    export const Admin = new admin('Admin', prefix);
    export const Js = new js('Js', prefix);
    export const Menu = new menu('Menu', prefix);
    export const MsgApi = new msg('Msg', prefix);
}
export default Wechat;