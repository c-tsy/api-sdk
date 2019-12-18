import { ApiController, ApiConfig } from '../';
import hook, { HookWhen } from '@ctsy/hook';
const md5: any = require('md5')
export namespace User {
    const prefix = "_user"
    class group extends ApiController {
        constructor() {
            super('Group', prefix);
        }
        /**
         * 获取分组数据
         * @param Type 
         */
        all(Type: string = 'all') {
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
         * 账号密码登陆
         * @param Account 
         * @param PWD 
         */
        async login(Account: string, PWD: string) {
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
            return await this.post('abind', { Type, Account });
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
            return this.post('reset', { OldPWD: md5(OldPWD), PWD: md5(PWD) })
        }
        /**
         * 账号注册
         * @param Account 
         * @param PWD 
         * @param PUID 
         */
        async regist(Name: string, Nick: string, Account: string, PWD: string, Sex: number = 1, PUID: number = 0) {
            return await this.post('regist', { Name, Nick, Sex, Account, PWD: md5(PWD), PUID })
        }
        /**
         * 忘记密码重设
         * @param Account 
         * @param PWD 
         * @param VCode 
         */
        forget(Account: string, PWD: string, VCode: string) {
            return this.post('forget', { Account, PWD, VCode });
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