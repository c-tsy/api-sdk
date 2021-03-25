import { ApiController, ApiConfig, Token } from '../index';
import { SearchWhere } from '../lib';
import axios from 'axios'
import { config } from 'process';
declare const window: any;
declare const wx: any;
declare const setTimeout: any;
// export var WechatID: string = '';
// export var BaiduMapAK = '';
export var jsConfiged = false;
export var UserInfo: any = false;
export const Api = {
    onMenuShareTimeline: 'onMenuShareTimeline',
    onMenuShareAppMessage: 'onMenuShareAppMessage',
    onMenuShareQQ: 'onMenuShareQQ',
    onMenuShareWeibo: 'onMenuShareWeibo',
    onMenuShareQZone: 'onMenuShareQZone',
    startRecord: 'startRecord',
    stopRecord: 'stopRecord',
    onVoiceRecordEnd: 'onVoiceRecordEnd',
    playVoice: 'playVoice',
    pauseVoice: 'pauseVoice',
    stopVoice: 'stopVoice',
    onVoicePlayEnd: 'onVoicePlayEnd',
    uploadVoice: 'uploadVoice',
    downloadVoice: 'downloadVoice',
    chooseImage: 'chooseImage',
    previewImage: 'previewImage',
    uploadImage: 'uploadImage',
    downloadImage: 'downloadImage',
    translateVoice: 'translateVoice',
    getNetworkType: 'getNetworkType',
    openLocation: 'openLocation',
    getLocation: 'getLocation',
    hideOptionMenu: 'hideOptionMenu',
    showOptionMenu: 'showOptionMenu',
    hideMenuItems: 'hideMenuItems',
    showMenuItems: 'showMenuItems',
    hideAllNonBaseMenuItem: 'hideAllNonBaseMenuItem',
    showAllNonBaseMenuItem: 'showAllNonBaseMenuItem',
    closeWindow: 'closeWindow',
    scanQRCode: 'scanQRCode',
    chooseWXPay: 'chooseWXPay',
    openProductSpecificView: 'openProductSpecificView',
    addCard: 'addCard',
    chooseCard: 'chooseCard',
    openCard: 'openCard'
}

export const defaultApis = Object.keys(Api)

export const request = axios.create({
    withCredentials: true,
})
request.interceptors.response.use((response) => {
    return response.data;
})
/**
 * 发起post请求
 * @param Where 
 * @param What 
 * @param data 
 */
async function post(Where: string, What: string, data?: any): Promise<any> {
    if (!Wechat.WechatID) {
        throw new Error('错误的微信ID，请配置微信ID')
    }
    return await request.post([ApiConfig.Host, '_wechat', Where, What, Wechat.WechatID, Token].join('/').replace('//_wechat', '/_wechat'), data).then((d: any) => {
        if (d.d && !d.e) {
            return d.d;
        } else {
            throw new Error(d.e.m || d.e)
        }
    });
}
/**
 * 微信操作
 */
namespace Wechat {

    // const AuthApi = new ApiController('Auth', '_wechat');
    // const JsApi = new ApiController('Js', '_wechat');
    export const IsWechatBrower = isWeixinBrowser();
    /**
     * 判断是否是微信浏览器
     */
    export function isWeixinBrowser() {
        return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != null;
    }
    /**
     * 设置微信ID
     * @param WID 
     */
    export function config(config: {
        WechatID: string,
        Server?: string,
        UUID?: string,
        BaiduMapAK?: string
    }) {
        WechatID = config.WechatID;
        // BaiduMapAK = config.BaiduMapAK
    }
    /**
     * 获取用户认证信息
     */
    export async function user() {
        if (!IsWechatBrower) {
            throw new Error('NOT_WECHAT_BROWER');
        }
        let url = [ApiConfig.Host, '_wechat', 'Auth', 'user', WechatID, Token].join('/').replace('//_wechat', '/_wechat') + `?r=${encodeURIComponent(window.location.href)}`
        try {
            let UserInfo: any = await post('Auth', 'getLogined', {})
            if (UserInfo.openid) {
                return UserInfo;
            } else {
                window.location.href = url;
            }
        } catch (error) {
            window.location.href = url;
        }
    }
    /**
     * jsConfig
     */
    export async function jsConfig() {
        if (!IsWechatBrower) {
            throw new Error('NOT_WECHAT_BROWER');
        }
        if (jsConfiged) { return true; }
        let config = await post('Js', 'jsConfig', { URL: window.location.href })
        if (config) {
            wx.config(config)
            return jsConfiged = true;
        }
    }
    if (IsWechatBrower) {
        wx.ready(() => {
            jsConfig()
        })
    }
    /**
     * 定位
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
     * @param s 
     * @param e 
     */
    export function location(): Promise<{ latitude: number, longitude: number, speed: number, accuracy: number }> {
        if (!IsWechatBrower) {
            throw new Error('NOT_WECHAT_BROWER');
        }
        let finish = false;
        return new Promise((s, j) => {
            setTimeout(() => {
                if (!finish) {
                    finish = true;
                    j('定位超时')
                }
            }, 1500)
            wx.getLocation({
                type: 'wgs84',
                success: (res: any) => {
                    if (!finish) {
                        finish = true;
                        if (res.errMsg.indexOf("ok")) {
                            s(res);
                        } else {
                            j(res);
                        }
                    }
                }
            })
        })
    }
    /**
     * 调用扫码
     * @param NeedResult 
     */
    export function scan(NeedResult: boolean = false): Promise<string> {
        if (!IsWechatBrower) {
            throw new Error('NOT_WECHAT_BROWER');
        }
        return new Promise((s, j) => {
            wx.scanQRCode({
                needResult: NeedResult ? 1 : 0,
                success: (d: any) => {
                    s(d.resultStr)
                }
            })
        })
    }
    /**
     * 分享接口
     * @param title 分享标题
     * @param desc 分享描述
     * @param link 跳转链接，必须是授权的域名
     * @param imgUrl 图标
     */
    export function share(title: string, desc: string, link: string, imgUrl: string) {
        return new Promise((s, j) => {
            let i = 0;
            function success() {
                if (++i > 1) {
                    s();
                }
            }
            wx.updateAppMessageShareData({
                title, // 分享标题
                desc, // 分享描述
                link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl, // 分享图标
                success
            })
            wx.updateTimelineShareData({
                title, // 分享标题
                link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl, // 分享图标
                success
            })
        })
    }
    /**
     * 关闭窗口
     */
    export function close() {
        if (!IsWechatBrower) {
            throw new Error('NOT_WECHAT_BROWER');
        }
        wx.closeWindow()
        if (wx && wx.closeWindow) { wx.closeWindow() }
    }
    /**
     * 隐藏菜单项
     */
    export function hideMenuItems() {
        if (!IsWechatBrower) {
            throw new Error('NOT_WECHAT_BROWER');
        }
        wx.hideMenuItems()
    }
    /**
     * 获取网络接口类型
     * @param {Function} s
     */
    export function networkType() {
        return new Promise((s, j) => {
            if (wx && wx.getNetworkType) {
                wx.getNetworkType({
                    success: (d: any) => { s(d) }
                })
            }
        })
    }
    /**
     * 选择图片，弹出微信图片选择框
     * @param success 
     * @param count 
     */
    export function chooseImage(count: number = 9): Promise<string[]> {
        return new Promise((s, j) => {
            wx.chooseImage({
                count: count || 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res: any) => {
                    s(res.localIds)
                }
            })
        })
    }

    /**
     * 上传图片
     * @param localIds  需要上传的图片的本地ID，由chooseImage接口获得
     * @param success 
     */
    export function uploadImage(localIds: string[]): Promise<string[]> {
        return Promise.all(localIds.map((o) => {
            return <any>new Promise((s, j) => {
                wx.uploadImage({
                    localId: o, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: (res: { serverId: string }) => {
                        s(res.serverId)
                        // success(res.serverId)
                    }
                });
            })
        }))
    }

    /**
     * 预览图片
     * @param current 当前显示图片的http链接
     * @param urls 需要预览的图片http链接列表
     */
    export function previewImage(current: string, urls: string[]) {
        wx.previewImage({
            current: current,
            urls: urls
        })
    }

    export function install(Vue: any, options?: { WechatID: string, Server?: string }) {
        // Vue.component('WxUploader', WxUploader)
        Vue.$wx = wx;
        if (options && options.WechatID) {
            config(options)
        }
    }

    // Generated by https://quicktype.io
    /**
     * 微信认证后的返回对象
     */
    export interface WechatUser {
        openid: string;
        nickname: string;
        sex: number;
        language: string;
        city: string;
        province: string;
        country: string;
        headimgurl: string;
        privilege: any[];
    }



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
            return ['', this.prefix, this.name, method, WechatID, Token].join('/');
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
    /**
     * 推送消息模板
     */
    export class MsgOption {
        /**
         * 用户OpenID
         */
        OpenID?: string = '';
        /**
         * 用户编号，支持绑定用户微信的信息下通过UID来推送
         */
        UID?: number = 0;
        /**
         * 用户组
         */
        UGID?: number = 0;
        /**
         * 暂未生效的PID，
         */
        PID?: number = 0;
        /**
         * 跳转链接
         */
        URL?: string = "";
        /**
         * 小程序链接
         */
        MiniURL?: string = "";
        /**
         * 推送数据
         */
        Data: {
            [index: string]: string | {
                /**
                 * 内容
                 */
                value: string,
                /**
                 * 颜色
                 */
                color: string
            }
        } = {}
    }
    /**
     * 微信消息处理
     */
    class msg extends WechatController {
        /**
         * 发送模板推送消息
         * @param TemplateID 
         * @param Data 
         */
        send(TemplateID: string, Data: MsgOption[]) {
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

    export const UsersApi = new users('Users', prefix)
    export const GroupApi = new group('Group', prefix)
    export const AuthApi = new auth('Auth', prefix);
    export const AdminApi = new admin('Admin', prefix);
    export const JsApi = new js('Js', prefix);
    export const MenuApi = new menu('Menu', prefix);
    export const MsgApi = new msg('Msg', prefix);
}
export default Wechat;


// if (window && !window.ctsywechat) {
//     window.ctsywechat = {
//         install: Wechat.install,
//         WechatID: Wechat.WechatID
//     }
// }