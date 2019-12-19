import { ApiController, ApiConfig } from '../';
import hook, { HookWhen } from '@ctsy/hook';
import { ErrorType } from '../lib';
const md5: any = require('md5')
export namespace User {
    const prefix = "_user"
    export class AuthObject {
        /**
         * 密码Hash盐
         */
        Salt: string = ""
    
        /**
         * 字段定义
         */
        Fields = {
            /**
             * 账号
             */
            Account: 'Account',
            /**
             * 密码
             */
            PWD: 'PWD',
            /**
             * 原始密码字段
             */
            OldPWD: 'OldPWD',
            /**
             * 验证码
             */
            VCode: 'VCode',
            /**
             * 验证字段
             */
            VAccount: 'VAccount',
            /**
             * 权限字段名称
             */
            Permission: 'Permission',
            /**
             * 用户编号
             */
            UID: 'UID',
            /**
             * 推介人
             */
            PUID: 'PUID',
            /**
             * 第二种验证模式的验证字段
             */
            Verify: 'Verify'
        }
    
        Limit = {
            /**
             * 注册时必须有推介人？
             */
            RegistMustPUID: false,
    
            RegistMustVCode: false,
    
            VerifyVAccount: false,
        }
    
        /**
         * 错误提示信息
         */
        Errors = {
            E_NO_PUID: '无推介人',
            E_PARAMS: '参数错误',
            E_ACCOUNT_NOT_EXIST: '账号不存在',
            E_PWD_EMPTY: '密码不存在',
            E_PWD_ERROR: '密码错误',
            E_NOT_LOGIN: '未登录',
            E_PARAMS_FAILD: '参数验证失败',
            E_VCODE: '验证码错误或已过期',
            E_REG_ERROR: '注册失败',
            E_ACCOUNT_USED: '账号已被使用',
            E_CERTIFICATED: '账户已认证',
            E_CERTIFICATING: '请等待认证结果后再申请',
            E_PUID_NOT_EXIST: '推介人不存在',
            E_NO_CERTIFICATION: '无该认证信息',
            E_JUDGED: '该认证已被处理',
            E_ACCOUNT_FORBIDDEN: '账户已被禁用',
            E_ACCOUNT_ERROR: '账号不符合规则',
            E_ACCOUNT_EXISTED: '账号已存在',
            E_ACCOUNT_BINDDED: "该账号已绑定"
        }
        Verify = {
            Account: /^[\w\b_-]{5,}$/,
            PWD: /.{6,}/
        }
    
        Hook: { [index: string]: any } = {
        }
    }
    class group extends ApiController {
        constructor() {
            super('Group', prefix);
        }
        /**
         * 获取分组数据
         * @param Type 
         */
        all(Type: string = 'all') {
            if(!['list','tree','all'].includes(Type)) {
                throw new Error(ErrorType.User.TYPE_PARAMS_IS_ERROR)
            }
            return this.get('all', { Type })
        }
        /**
         * 更新分组信息
         * @param UGID 
         * @param Data 
         */
        save(UGID: number, Data: any) {
            return this.post('save', { UGID, Data });
        }
        /**
         * 获取分组用户
         * @param UGID 
         * @param P 
         * @param N 
         */
        members(UGID: number, P: number = 1, N: number = 10) {
            return this.post('members', { UGID, P, N });
        }
        /**
         * 添加分组
         * @param Title 
         * @param Memo 
         * @param Sort 
         * @param PUGID 
         */
        add(Title: string, Memo: string, Sort: number = 0, PUGID: number = 0) {
            return this.post('add', { Title, Memo, Sort, PUGID })
        }
        /**
         * 用户分组
         * @param UGID 
         * @param UIDs 
         */
        link(UGID: number, UIDs: number[]) {
            return this.post('link', { UGID, UIDs });
        }
        /**
         * 移除用户分组关系
         * @param UGID 
         * @param UIDs 
         */
        unlink(UGID: number, UIDs: number[]) {
            return this.post('unlink', { UGID, UIDs });
        }
    }
    export const Group = new group();
    /**
     * 菜单管理
     */
    export class Menu extends ApiController {
        constructor() {
            super('Menu', prefix);
        }
        /**
         * 获取指定人或某人的菜单
         * @param UID 
         * @param Force 
         */
        my(UID: number = 0, Force: boolean = false) {
            return this.post('my', { UID, Force })
        }
        getGMenus() {

        }
    }
    /**
     * 菜单组
     */
    export class MenuGroup extends ApiController {
        prefix = '_user';
        constructor() {
            super('MenuGroup', prefix);
        }
    }
    class auth extends ApiController {
        constructor() {
            super('Auth', prefix);
        }
        /**
         * 验证账号验证码
         * @param data 
         * @param remove 
         */
        vcheck(data: any, remove: boolean = true) {
            return this.post('vcheck',{data, remove})
        }
        vcode(data: any, expire: number | any = 0) {
            if(expire.appid) {
                return ''
            }
            return this.post('vcode', {data, expire})
        }
        /**
         * 账号密码登陆
         * @param Account 
         * @param PWD 
         */
        async login(Account: string, PWD: string) {
            if('string' != typeof Account) {
                throw new Error(ErrorType.User.ACCOUNT_SHOULD_BE_STRING)
            }
            if('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            let rs = await this.post('login', { Account, PWD: md5(PWD) })
            if (rs.UID) {
                hook.emit('logined', HookWhen.After, '', rs);
                ApiConfig.UID = rs.UID
            }
            return rs;
        }
        /**
         * 三方登陆
         * @param Type 
         * @param Account 
         */
        async thirdLogin(Type: string, Account: string) {
            return await this.post('alogin', { Type, Account });
        }
        /**
         * 
         * @param Type 三方登陆绑定
         * @param Account 
         */
        async thirdBind(Type: string, Account: string) {
            return await this.post('abind', { Type, Account });
        }/**
         * 
         * @param Type 三方登陆解绑
         * @param Account 
         */
        async thirdUnBind(Type: string, Account: string) {
            return await this.post('aunbind', { Type, Account });
        }
        /**
         * 获取我的权限
         */
        async getPermissions() {
            return await this.post('getPermissions', '');
        }
        /**
         * 获取当前登录用户信息
         */
        async info() {
            return await this.post('info', {});
        }
        /**
         * 退出登录
         */
        async logout() {
            let rs = await this.post('logout', {});
            hook.emit('logout', HookWhen.After, '', rs);
            ApiConfig.UID = ''
            return rs;
        }
        /**
         * 检查并获取当前登录状态，返回内容同登录操作
         */
        async relogin() {
            let rs = await this.get('relogin')
            if (rs.UID) {
                hook.emit('login', HookWhen.After, '', rs);
                ApiConfig.UID = rs.UID
            }
            return rs;
        }
        /**
         * 重设密码
         * @param OldPWD 
         * @param PWD 
         */
        reset(OldPWD: string, PWD: string) {
            if('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            if(/.{6,}/.test(PWD)) {
                throw new Error(ErrorType.User.PWD_PARAMS_IS_ERROR)
            }
            if('string' != typeof OldPWD) {
                throw new Error(ErrorType.User.OLDPWD_SHOULD_BE_STRING)
            }
            if(/.{6,}/.test(OldPWD)) {
                throw new Error(ErrorType.User.OLDPWD_PARAMS_IS_ERROR)
            }
            return this.post('reset', { OldPWD: md5(OldPWD), PWD: md5(PWD) })
        }
        /**
         * 账号注册
         * @param Account 
         * @param PWD 
         * @param PUID 
         */
        async regist(Name: string, Nick: string, Account: string, PWD: string, Sex: number = 1, PUID: number = 0) {
            if(Name == '' || Nick == '') {
                throw new Error(ErrorType.User.NAME_OR_NICK_CANNOT_BE_EMPTY)
            }
            if('string' != typeof Account) {
                throw new Error(ErrorType.User.ACCOUNT_SHOULD_BE_STRING)
            }
            if('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            if(/.{6,}/.test(PWD)) {
                throw new Error(ErrorType.User.PWD_PARAMS_IS_ERROR)
            }
            return await this.post('regist', { Name, Nick, Sex, Account, PWD: md5(PWD), PUID })
        }
        /**
         * 忘记密码重设
         * @param Account 
         * @param PWD 
         * @param VCode 
         */
        forget(Account: string, PWD: string, VCode: string) {
            if('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            if(/.{6,}/.test(PWD)) {
                throw new Error(ErrorType.User.PWD_PARAMS_IS_ERROR)
            }
            if('string' != typeof Account) {
                throw new Error(ErrorType.User.ACCOUNT_SHOULD_BE_STRING)
            }
            if(/^[\w\b_-]{5,}$/.test(Account)) {
                throw new Error(ErrorType.User.ACCOUNT_PARAMS_IS_ERROR)
            }
            return this.post('forget', { Account, PWD, VCode });
        }
        /**
         * 重写session
         * @param UID 
         */
        rsession(UID: any) {
            return this.post('rsession',{ UID })
        }
    }
    export const Auth = new auth();


    /**
     * 用户管理
     */
    class users extends ApiController {
        // prefix = '_user';
        constructor() {
            super('Users', prefix);
        }
        /**
         * 用户搜索
         * @param W 
         * @param conf 
         */
        search(W: any, conf: { Keyword?: string, N?: number, P?: number, Sort?: string }) {
            if (W === void 0) { W = {}; }
            if (undefined === conf) { conf = { N: 10, P: 1, Keyword: '' }; }
            if (W.P != void 0 && W.N != void 0 && W.Keyword != void 0) {
                conf = W;
                W = W.W;
            }
            return this.post('search', {
                W: W,
                Keyword: conf.Keyword || "",
                N: conf.N || 10,
                P: conf.P || 1,
                Sort: conf.Sort || ''
            });
        }
    }
    export const Users = new users();

    class user extends ApiController {
        constructor() {
            super('User', prefix)
        }
        /**
         * 修改用户昵称和性别
         * @param UID 
         * @param Nick 
         * @param Sex 
         * @param Status
         */
        save(UID: number, data: {Nick?: string, Sex?: number, Status?: number}) {
            if(!UID && typeof UID == 'number') {
                throw new Error('UID')
            }
            let d: { [index: string]: string | number} = {}
            if('string' == typeof data.Nick && data.Nick.length > 0) {
                d.Nick = data.Nick
            }
            if(data.Sex && [0,1,2].includes(data.Sex)) {
                d.Sex = data.Sex
            }
            if(data.Status && [-1,0,1].includes(data.Status)) {
                d.Status = data.Status
            }
            if(Object.keys(d).length == 0) {
                throw new Error('Nick/Sex/Status')
            }
            return this.post('save',Object.assign({UID},data))
        }

        myteam(UID: number, P: number, N: number) {
            return this.post('myteam',{UID, P, N})
        }
    }
    export const User = new user();
}