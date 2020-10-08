import { ApiController, ApiConfig, ControllerApi } from '../';
import hook, { HookWhen } from '@ctsy/hook';
import { ErrorType, SearchResult, LinkType, SearchWhere } from '../lib';
import { array_columns } from 'castle-function';
import * as _ from 'lodash'
const get: Function = _.get;
const md5: any = require('md5')


export namespace User {
    const prefix = "_user"
    /**
     * 登陆成功的返回对象
     */
    export class LoginResult {
        UID: number = 0;
        Name: string = "";
        Birthday: string = "";
        Avatar: string = "";
        Nick: string = "";
        Sex: number = 0;
        Status: number = 0;
        Channel: string = '';
        PUID: number = 0;
        TNum: number = 0;
        UGIDs: number[] = [];
        Groups: LoginGroup[] = [];
        Account: string = '';
        RIDs: number[] = [];
    }

    export class LoginGroup {
        UGID: number = 0;
        Title: string = '';
        Sort: number = 0;
        PUGID: number = 0;
        Memo: string = "";
        EUGID: number = 0;
    }
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
    class admin extends ApiController {
        constructor() {
            super('Admin', prefix);
        }
        tokenLogin(Token: string, UID: string, Referer: string, IP: string) {
            //  添加登陆的referer用做校验信息
            return this._post('tokenLogin', { Token, UID, Referer, IP })
        }
    }
    /**
     * 用户组 UserGroup
     * UGID UGID 自增序号(bigint)
     * 组名 Title 字符50(char(50))
     * 组序 Sort 序号(bigint)
     * 父组号 PUGID 序号(bigint)
     * 备注 Memo 字符50(char(50))
     * 继承组 EUGID 序号(bigint)
    */
    export class ClassUserGroup {

        public UGID: number = 0;
        public Title: string = "";
        public Sort: number = 0;
        public PUGID: number = 0;
        public Memo: string = "";
        public EUGID: number = 0;
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
            if (!['list', 'tree', 'all'].includes(Type)) {
                throw new Error(ErrorType.User.TYPE_PARAMS_IS_ERROR)
            }
            return this._post('all', { Type })
        }
        /**
         * 按数据返回用户组数据结构
         */
        list(W: { PUGID?: number } = {}, P: number = 1, N: number = 999): Promise<SearchResult<ClassUserGroup>> {
            return this._post('list', { P, N, W })
        }
        /**
         * 更新分组信息
         * @param UGID 
         * @param Data 
         */
        save(UGID: number, Data: any) {
            return this._post('save', { UGID, Data });
        }
        /**
         * 查询企业需要审核的用户
         * @param EID 
         */
        linksearch(EID: number) {
            return this._post('linksearch', { EID })
        }
        /**
         * 获取分组用户
         * @param UGID 
         * @param P 
         * @param N 
         */
        members(UGID: number, P: number = 1, N: number = 10) {
            return this._post('members', { UGID, P, N });
        }
        /**
         * 添加分组
         * @param Title 
         * @param Memo 
         * @param Sort 
         * @param PUGID 
         */
        add(Title: string, Memo: string, Sort: number = 0, PUGID: number = 0) {
            return this._post('add', { Title, Memo, Sort, PUGID })
        }
        /**
         * 用户分组
         * @param UGID 
         * @param UIDs 
         */
        link(rule: { UGID: number, UIDs: number[] } | { UGIDs: number[], UID: number }, Type: LinkType = LinkType.append, Status?: number, DID?: number) {
            return this._post('link', Object.assign(rule, { Type, Status, DID }));
        }
        /**
         * 移除用户分组关系
         * @param UGID 
         * @param UIDs 
         */
        unlink(UGID: number, UIDs: number[]) {
            return this._post('unlink', { UGID, UIDs });
        }
        /**
         * 查询指定用户组的权限信息
         * @param UGIDs 
         */
        rules(UGIDs: number[]) {
            return this._post('rules', { UGIDs })
        }
        /**
         * 重新更新session信息
         */
        renewSession(): Promise<LoginResult> {
            return this._post('rsession')
        }
        /**
         * 权限分配
         * @param UGID 用户组 
         * @param RIDs 权限ID值
         */
        rlink(UGID: number, RIDs: number[]) {
            return this._post('rlink', { UGID, RIDs })
        }
        /**
         * 移除权限分配
         * @param UGID 用户组 
         * @param RIDs 权限ID值
         */
        runlink(UGID: number, RIDs: number[]) {
            return this._post('runlink', { UGID, RIDs })
        }
        /**
         * 删除用户组接口
         * @param UGID 
         */
        del(UGID: number): Promise<boolean> {
            return this._post('del', { UGID });
        }

        /**
         * 提供基于树形的级联查询
         * @param W.PUGID 根据PUGID向下查询 
         * @param W.UGID 根据UGID向上查询 
         * @param Deep 树形深度
         */
        tree(W: { PUGIDs?: number[], UGIDs?: number[] }, Deep: number = 3): Promise<ClassUserGroup[]> {
            return this._post('tree', Object.assign(W, { Deep }))
        }
    }
    export const Group = new group();
    export const GroupApi = Group;
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
            return this._post('my', { UID, Force })
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
    /**
     * 登陆对象
     */
    export class Login {
        /**
         * 账号
         */
        Account: string = "";
        /**
         * 密码
         */
        PWD: string = "";
        /**
         * MD5加密后的密码，用于导入或二次登陆使用
         */
        MD5PWD: string = "";
    }
    /**
     * 联系人信息
     */
    export class ClassContact {
        /**
         * 用户编号
         */
        public UID: number = 0;
        /**
         * 联系名称
         */
        public T: string = "";
        /**
         * 联系值
         */
        public V: string = "";
        /**
         * 配置信息，支持不超过250个字节的字符串
         */
        public C: string = "";
    }

    /**
     * 认证
     */
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
            return this._post('vcheck', { data, remove })
        }
        /**
         * 发送验证码内容
         * @param data 
         * @param expire 
         */
        vcode(data: any, expire: number | any = 0) {
            if (expire.appid) {
                return ''
            }
            return this._post('vcode', { data, expire })
        }
        /**
         * 账号密码登陆
         * @param Account 
         * @param PWD 
         */
        async login(Account: Login | string, PWD?: string, MD5PWD: string = ''): Promise<LoginResult> {
            if ('string' != typeof Account) {
                if ('string' == typeof Account.Account) {
                    PWD = Account.PWD;
                    MD5PWD = Account.MD5PWD;
                    Account = Account.Account;
                } else
                    throw new Error(ErrorType.User.ACCOUNT_SHOULD_BE_STRING)
            }
            if ('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            let rs = await this._post('login', { Account, PWD: MD5PWD || md5(PWD) })
            if (rs.UID) {
                hook.emit('logined', HookWhen.After, '', rs);
                ApiConfig.UID = rs.UID
            }
            if (!rs.RIDs) { rs.RIDs = [] }
            if (!rs.UGIDs) { rs.UGIDs = [] }
            return rs;
        }
        /**
         * 三方登陆
         * @param Type 
         * @param Account 
         */
        async thirdLogin(Type: string, Account: string) {
            return await this._post('alogin', { Type, Account });
        }
        /**
         * 
         * @param Type 三方登陆绑定
         * @param Account 
         */
        async thirdBind(Type: string, Account: string) {
            return await this._post('abind', { Type, Account });
        }/**
         * 
         * @param Type 三方登陆解绑
         * @param Account 
         */
        async thirdUnBind(Type: string, Account: string) {
            return await this._post('aunbind', { Type, Account });
        }
        /**
         * 获取我的权限
         */
        async getPermissions() {
            return await this._post('getPermissions', '');
        }
        /**
         * 获取当前登录用户信息
         */
        async info() {
            return await this._post('info', {});
        }
        /**
         * 退出登录
         */
        async logout() {
            let rs = await this._post('logout', {});
            hook.emit('logout', HookWhen.After, '', rs);
            ApiConfig.UID = ''
            return rs;
        }
        /**
         * 检查并获取当前登录状态，返回内容同登录操作
         */
        async relogin(): Promise<LoginResult> {
            let rs = await this._get('relogin')
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
            if ('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            if (!/.{6,}/.test(PWD)) {
                throw new Error(ErrorType.User.PWD_PARAMS_IS_ERROR)
            }
            if ('string' != typeof OldPWD) {
                throw new Error(ErrorType.User.OLDPWD_SHOULD_BE_STRING)
            }
            if (!/.{6,}/.test(OldPWD)) {
                throw new Error(ErrorType.User.OLDPWD_PARAMS_IS_ERROR)
            }
            return this._post('reset', { OldPWD: md5(OldPWD), PWD: md5(PWD) })
        }
        /**
         * 管理员重置密码
         * @param {number} UID 用户编号
         * @param {string} PWD 要设置的密码，
         */
        areset(UID: number, PWD: string) {
            if ('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            if (!/.{6,}/.test(PWD)) {
                throw new Error(ErrorType.User.PWD_PARAMS_IS_ERROR)
            }
            return this._post('areset', { UID, PWD: md5(PWD) })
        }
        /**
         * 信息注册
         * @param {string} Name 姓名
         * @param {string} Nick 昵称
         * @param {string} Account 账号
         * @param {string} PWD 密码
         * @param Sex 性别
         * @param {string} PUID 推介人的UID
         * @param {string} MD5PWD 加密后的密码
         * @param Contacts 联系信息列表
         * @param {string} Avatar 头像URL地址
         */
        async regist(Name: string, Nick: string, Account: string, PWD: string, Sex: number = 1, PUID: number = 0, MD5PWD: string = "", Contacts: ClassContact[], Avatar: string = '', Other: { [index: string]: any }) {
            if (Name == '' || Nick == '') {
                throw new Error(ErrorType.User.NAME_OR_NICK_CANNOT_BE_EMPTY)
            }
            if ('string' != typeof Account) {
                throw new Error(ErrorType.User.ACCOUNT_SHOULD_BE_STRING)
            }
            if ('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            if (!/.{6,}/.test(PWD)) {
                throw new Error(ErrorType.User.PWD_PARAMS_IS_ERROR)
            }
            if (Avatar && Avatar.startsWith('data:')) {
                throw new Error('头像地址错误')
            }
            return await this._post('regist', Object.assign(Other || {}, { Name, Nick, Sex, Account, PWD: MD5PWD || md5(PWD), PUID, Contacts, Avatar }))
        }
        /**
         * 忘记密码重设
         * @param Account 
         * @param PWD 
         * @param VCode 
         */
        forget(Account: string, PWD: string, VCode: string, MD5PWD: string = "") {
            if ('string' != typeof PWD) {
                throw new Error(ErrorType.User.PWD_SHOULD_BE_STRING)
            }
            if (!/.{6,}/.test(PWD)) {
                throw new Error(ErrorType.User.PWD_PARAMS_IS_ERROR)
            }
            if ('string' != typeof Account) {
                throw new Error(ErrorType.User.ACCOUNT_SHOULD_BE_STRING)
            }
            if (!/^[\w\b_-]{5,}$/.test(Account)) {
                throw new Error(ErrorType.User.ACCOUNT_PARAMS_IS_ERROR)
            }
            return this._post('forget', { Account, PWD: MD5PWD || md5(PWD), VCode });
        }
        /**
         * 重写session
         * @param UID 
         */
        rsession(UID: any) {
            return this._post('rsession', { UID })
        }
    }
    export const Auth = new auth();
    export const AuthApi = Auth;

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
        async search(W: { [index: string]: any } | SearchWhere, conf?: { With?: ['Contact'], Keyword?: string, N?: number, P?: number, Sort?: string }): Promise<SearchResult<any>> {
            if (W.W && W.P > 0 && W.N > 0) {
                let rs = await this._post('search', W);
                if (conf?.With) {
                    if (conf.With instanceof Array) {

                    } else if ('string' == typeof conf.With) {
                        conf.With = (<any>conf.With).split(',')
                    }

                    let UIDs: any[] = array_columns(rs.L, 'UID');
                    if (UIDs.length == 0) {
                        return rs;
                    }
                    let Ps = []

                    if (conf.With?.includes('Contact')) {
                        Ps.push(ContactApi.read(UIDs))
                    } else {
                        Ps.push([])
                    }

                    let Prs = await Promise.all(Ps);

                    for (let p of Prs) {
                        for (let x of rs.L) {

                        }
                    }

                }
                return rs;
            } else {
                if (W === void 0) { W = {}; }
                if (undefined === conf) { conf = { N: 10, P: 1, Keyword: '' }; }
                if (W.P != void 0 && W.N != void 0 && W.Keyword != void 0) {
                    conf = W;
                    W = W.W;
                }
                return this._post('search', {
                    W: W,
                    Keyword: conf.Keyword || "",
                    N: conf.N || 10,
                    P: conf.P || 1,
                    Sort: conf.Sort || ''
                });
            }
        }
    }
    export const Users = new users();
    export const UsersApi = Users;
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
        save(UID: number, data: { Nick?: string, Sex?: number, Status?: number, Avatar?: number, Head?: string, Contacts?: ClassContact[] }) {
            if (!UID && typeof UID == 'number') {
                throw new Error('UID')
            }
            let d: { [index: string]: string | number } = {}
            if ('string' == typeof data.Nick && data.Nick.length > 0) {
                d.Nick = data.Nick
            }
            if (undefined !== data.Sex && [0, 1, 2].includes(data.Sex)) {
                d.Sex = data.Sex
            }
            if (undefined !== data.Status && [-1, 0, 1].includes(data.Status)) {
                d.Status = data.Status
            }
            if (Object.keys(d).length == 0) {
                throw new Error('缺少修改参数')
            }
            return this._post('save', Object.assign({ UID }, data))
        }

        myteam(UID: number, P: number, N: number) {
            return this._post('myteam', { UID, P, N })
        }
    }
    export const User = new user();
    export const UserApi = User;
    /**
  * 权限 Rule
  * RID RID 自增序号(bigint)
  * RGID RGID 序号(bigint)
  * 权限名称 Title 字符50(char(50))
  * 类型 Type 字符20(char(20))
  * 规则 Rule 字符250(char(250))
  * 备注 Memo 字符250(char(250))
  * 排序 Sort 序号(bigint)
*/
    export class RuleClass {

        public RID: number = 0;
        public RGID: number = 0;
        public Title: string = "";
        public Type: string = "";
        public Rule: string = "";
        public Memo: string = "";
        public Sort: number = 0;
    }/**
  * 权限组 RuleGroup
  * RGID RGID 自增序号(bigint)
  * 组名 Title 字符50(char(50))
  * 描述 Memo 字符250(char(250))
  * PRGID PRGID 序号(bigint)
  * 组序 Sort 序号(bigint)
*/
    export class RuleGroupClass {

        public RGID: number = 0;
        public Title: string = "";
        public Memo: string = "";
        public PRGID: number = 0;
        public Sort: number = 0;
        public Rules: RuleClass[] = [];
        public Subs: RuleGroupClass[] = [];
    }
    /**
     * 
     */
    class rule extends ControllerApi<RuleClass> {
        /**
         * 获取我的权限列表
         */
        mine(): Promise<number[]> {
            return this._post('mine');
        }
        /**
         * 获取所有的权限信息
         */
        all(): Promise<RuleClass[]> {
            return this._get('all');
        }
        /**
         * 获取所有的权限及权限组信息
         */
        async group(): Promise<{ [index: string]: RuleGroupClass }> {
            let rs: { [index: string]: RuleGroupClass } = {}, map: { [index: string]: number[] } = {};
            let { Rules, Groups } = await this._get('group');
            let tGroups: { [index: string]: RuleGroupClass } = {};
            for (let x of Groups) {
                x.Subs = [];
                x.Rules = [];
                tGroups[x.RGID] = x;
            }
            for (let x of Rules) {
                tGroups[x.RGID].Rules.push(x);
            }
            for (let i in tGroups) {
                let x = tGroups[i];
                if (x.PRGID == 0) {
                    rs[x.RGID] = x;
                    delete tGroups[i];
                }
            }
            while (true) {
                for (let i in tGroups) {
                    if (tGroups[i].PRGID == 0) {
                        continue;
                    }
                    let key = ""
                    if (rs[tGroups[i].PRGID]) {
                        key = tGroups[i].PRGID + '.Subs'
                    } else if (map[tGroups[i].PRGID]) {
                        key = [...map[tGroups[i].PRGID], tGroups[i].PRGID + '.Subs'].join('.')
                    }
                    get(rs, key).push(tGroups[i]);
                    delete tGroups[i];
                }
                if (Object.keys(tGroups).length == 0) {
                    break;
                }
            }
            return rs;
        }
    }
    /**
     * 权限组
     */
    class ruleGroup extends ControllerApi<RuleGroupClass>{

    }
    export const RuleGroup = new ruleGroup('RuleGroup', prefix);
    export const Rule = new rule('Rule', prefix);
    export const RuleApi = Rule;
    class contact extends ApiController {
        /**
         * 保存联系信息
         * @param UID 
         * @param Contact 
         */
        save(UID: number, Contact: { T: string, V: string, C: string }[]) {
            return this._post('save', { UID, Contact })
        }
        /**
         * 批量读取联系信息
         * @param UIDs 
         */
        read(UIDs: number[]) {
            return this._post('read', { UIDs });
        }
    }
    /**
     * 联系信息的处理
     */
    export const Contact = new contact('Contact', prefix);
    export const ContactApi = Contact;
    export const AdminApi = new admin()
}
export default User;