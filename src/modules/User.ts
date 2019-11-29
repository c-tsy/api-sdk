import { ApiController, ApiConfig } from '../utils';
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
            return this.post('all', { Type })
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
        link(UGID: number, UIDs: number) {
            return this.post('link', { UGID, UIDs });
        }
        /**
         * 移除用户分组关系
         * @param UGID 
         * @param UIDs 
         */
        unlink(UGID: number, UIDs: number) {
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
            let rs = await this.post('relogin', '')
            if (rs.UID) {
                hook.emit('login', HookWhen.After, '', rs);
                ApiConfig.UID = rs.UID
            }
            return rs;
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
}