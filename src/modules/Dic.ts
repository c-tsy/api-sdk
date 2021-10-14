import { ControllerApi } from "..";
import { LinkType } from "../lib";

namespace Dic {
    export const prefix = "_dic";
    /**
      * User关联记录 UserLink
      * LID LID 自增(bigint(20))
      * UID UID 序号(bigint(20))
      * CTime CTime 时间(datetime)
      * CUID CUID 序号(bigint(20))
      * Status Status 状态(tinyint(1))
      * OType OType char(50)(char(50))
      * OID OID 序号(bigint(20))
      * Memo Memo char255(char(255))
      * URL URL char255(char(255))
      * Icon Icon char255(char(255))
      * Type Type 序号(bigint(20))
      * Sort Sort 序号(bigint(20))
      * AID AID 编号(bigint(20))
      * GID GID 编号(bigint(20))
      * Key Key char(50)(char(50))
    */
    export class UserLink {

        /**
         * LID
         * 
         */
        public LID: number = 0;
        /**
         * UID
         * 
         */
        public UID: number = 0;
        /**
         * CTime
         * 
         */
        public CTime: Date = new Date;
        /**
         * CUID
         * 
         */
        public CUID: number = 0;
        /**
         * Status
         * 
         */
        public Status: number = 0;
        /**
         * OType
         * 
         */
        public OType: string = "";
        /**
         * OID
         * 
         */
        public OID: number = 0;
        /**
         * Memo
         * 
         */
        public Memo: string = "";
        /**
         * URL
         * 
         */
        public URL: string = "";
        /**
         * Icon
         * 
         */
        public Icon: string = "";
        /**
         * Type
         * 
         */
        public Type: number = 0;
        /**
         * Sort
         * 
         */
        public Sort: number = 0;
        /**
         * AID
         * 
         */
        public AID: number = 0;
        /**
         * GID
         * 
         */
        public GID: number = 0;
        /**
         * Key
         * 
         */
        public Key: string = "";
    }
    /**
     * 字典结构表 Dics
     * 字典编号 DID 自增(bigint(20))
     * TID TID 编号(bigint(20))
     * 父级编号 PDID 编号(bigint(20))
     * 名称 Name char(50)(char(50))
     * 代码 Code char(50)(char(50))
     * 状态 Status 状态(tinyint(1))
     * GID GID 编号(bigint(20))
     * Key Key char(50)(char(50))
     * CUID CUID 编号(bigint(20))
     * CTime CTime 时间(datetime)
    */
    export class Dics {

        /**
         * 字典编号
         * 
         */
        public DID: number = 0;
        /**
         * TID
         * 
         */
        public TID: number = 0;
        /**
         * 父级编号
         * 
         */
        public PDID: number = 0;
        /**
         * 名称
         * 
         */
        public Name: string = "";
        /**
         * 代码
         * 
         */
        public Code: string = "";
        /**
         * 规则，最长255字符
         * 
         */
        public Rule: string = "";
        /**
         * 状态
         * 
         */
        public Status: number = 0;
        /**
         * GID
         * 
         */
        public GID: number = 0;
        /**
         * Key
         * 
         */
        public Key: string = "";
        /**
         * CUID
         * 
         */
        public CUID: number = 0;
        /**
         * CTime
         * 
         */
        public CTime: Date = new Date;
        /**
         * 备注
         * 
         */
        public Memo: string = "";
        /**
         * 图标
         * 
         */
        public Icon: string = "";

        /**
         * 类型，自定义填写
         */
        Type: string = "";
        /**
         * 层级，服务器生成
         */
        Level: number = 0;
        /**
         * 绑定参数类型
         */
        OType: string = ""
        /**
         * 绑定参数值
         */
        OID: number = 0
        /**
         * 批量创建过程中的子集
         */
        Subs?: Dics[] = [];
    }
    /**
     * 字典关联 Link
     * LID LID 自增(bigint(20))
     * 字典编号 DID 编号(bigint(20))
     * TID TID 编号(bigint(20))
     * 关联对象 OType char(50)(char(50))
     * 对象编号 OValue 编号(bigint(20))
     * 关联配置 Conf char255(char(255))
     * 关联方式 LType 状态(tinyint(1))
     * GID GID 编号(bigint(20))
     * Key Key char(50)(char(50))
     * CUID CUID 编号(bigint(20))
     * CTime CTime 时间(datetime)
     * 排序 Sort 编号(bigint(20))
     * 状态 Status 状态(tinyint(1))
    */
    export class Link {

        /**
         * LID
         * 
         */
        public LID: number = 0;
        /**
         * 字典编号
         * 
         */
        public DID: number = 0;
        /**
         * TID
         * 
         */
        public TID: number = 0;
        /**
         * 关联对象
         * 
         */
        public OType: string = "";
        /**
         * 对象编号
         * 
         */
        public OValue: number = 0;
        /**
         * 关联配置
         * 
         */
        public Conf: string = "";
        /**
         * 关联方式
         * 0排除 1包含
         */
        public LType: number = 0;
        /**
         * GID
         * 
         */
        public GID: number = 0;
        /**
         * Key
         * 
         */
        public Key: string = "";
        /**
         * CUID
         * 
         */
        public CUID: number = 0;
        /**
         * CTime
         * 
         */
        public CTime: Date = new Date;
        /**
         * 排序
         * 
         */
        public Sort: number = 0;
        /**
         * 状态
         * 
         */
        public Status: number = 0;
    }
    /**
     * 字典类型 Types
     * TID TID 自增(bigint(20))
     * 名称 Name char(50)(char(50))
     * 代码 Code char(50)(char(50))
     * 状态 Status 状态(tinyint(1))
     * GID GID 编号(bigint(20))
     * Key Key char(50)(char(50))
     * CUID CUID 编号(bigint(20))
     * CTime CTime 时间(datetime)
     * 排序 Sort 编号(bigint(20))
    */
    export class Types {

        /**
         * TID
         * 
         */
        public TID: number = 0;
        /**
         * 名称
         * 
         */
        public Name: string = "";
        /**
         * 代码
         * 
         */
        public Code: string = "";
        /**
         * 状态
         * 
         */
        public Status: number = 0;
        /**
         * GID
         * 
         */
        public GID: number = 0;
        /**
         * Key
         * 
         */
        public Key: string = "";
        /**
         * CUID
         * 
         */
        public CUID: number = 0;
        /**
         * CTime
         * 
         */
        public CTime: Date = new Date;
        /**
         * 排序
         * 
         */
        public Sort: number = 0;
    }
    /**
     * 字典数据管理接口
     */
    export class dics extends ControllerApi<Dics>{
        PK = 'DID';
        constructor(token = "") {
            super('Dics', prefix, token)
        }

        // adds() { }
        /**
         * 树形结构查询
         * @param W.PDIDs 以PDID为准，向下查询
         * @param W.DIDs 以DID为准，向上查询
         * @param W.TID 以DID为准，向上查询
         * @param Deep 
         */
        tree(W: { PDIDs: number[], DIDs: number[], TID: number }, Deep: number = 3): Promise<Dics[]> {
            return this._post('tree', Object.assign(W, { Deep }))
        }
    }
    export const DicsApi = new dics();
    /**
     * 字典类型管理接口
     */
    export class types extends ControllerApi<Types>{
        PK = 'TID';
        constructor(token = "") {
            super('Types', prefix, token)
        }
    }
    export const TypesApi = new types();
    /**
     * 关联关系管理接口
     */
    export class link extends ControllerApi<Link>{
        constructor(token = "") {
            super('Link', prefix, token)
        }
        PK = 'LID';
        /**
         * 关联关系管理
         * @param Type 支持添加和移除，暂不支持替换
         * @param TID TID具体值
         * @param Data 用于操作的数据
         * @param Other 其它绑定参数
         * @returns 
         */
        link(Type: LinkType, TID: number, Data: { DID: number, OValues: number[] } | { OValue: number, OIDs: number[] }, Other: { OType?: string, LType?: number, Sort?: number, Conf?: string } = {}) {
            return this._post('link', Object.assign({ Type, TID }, Data, Other))
        }
    }
    export const LinkApi = new link();
    /**
     * 用户信息关联对象操作接口
     */
    export class userLink extends ControllerApi<Link>{
        PK = 'LID';
        constructor(token = "") {
            super('UserLink', prefix, token)
        }
    }
    export const UserLinkApi = new userLink();
}
export default Dic;
