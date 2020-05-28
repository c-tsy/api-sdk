import { ControllerApi } from "..";

namespace Dic {
    var prefix = "_dic";

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
    }
    export const DicsApi = new dics('Dics', prefix);
    /**
     * 字典类型管理接口
     */
    export class types extends ControllerApi<Types>{
        PK = 'TID';
    }
    export const TypesApi = new types('Types', prefix);
    /**
     * 关联关系管理接口
     */
    export class link extends ControllerApi<Link>{
        PK = 'LID';
    }
    export const LinkApi = new dics('Link', prefix);
}
export default Dic;