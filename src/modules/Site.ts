import { ApiController, ControllerApi } from "..";
namespace SiteApi {
    let prefix = '_site'
    /**
      * 展示区详情 DisplayItem
      * DIID DIID 自增(bigint(20))
      * 名称 Name char(50)(char(50))
      * 代码 Code char(50)(char(50))
      * 配置 Conf char255(char(255))
      * 对象类型 OType char(50)(char(50))
      * 对象值 OValue char255(char(255))
      * 展示图 Img char255(char(255))
      * 跳转链接 URL char255(char(255))
      * 开始时间 STime 时间(datetime)
      * 结束时间 ETime 时间(datetime)
      * 站点编号 SID 编号(bigint(20))
      * 展示编号 DID 编号(bigint(20))
      * GID GID 编号(bigint(20))
      * Key Key char(50)(char(50))
      * CUID CUID 编号(bigint(20))
      * CTime CTime 时间(datetime)
      * Status Status 状态(tinyint(1))
    */
    export class DisplayItem {

        /**
         * DIID
         * 
         */
        public DIID: number = 0;
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
         * 配置
         * 
         */
        public Conf: string = "";
        /**
         * 对象类型
         * 如文章:art
         */
        public OType: string = "";
        /**
         * 对象值
         * 
         */
        public OValue: string = "";
        /**
         * 展示图
         * 
         */
        public Img: string = "";
        /**
         * 跳转链接
         * 
         */
        public URL: string = "";
        /**
         * 开始时间
         * 
         */
        public STime: Date = new Date;
        /**
         * 结束时间
         * 
         */
        public ETime: Date = new Date;
        /**
         * 站点编号
         * 
         */
        public SID: number = 0;
        /**
         * 展示编号
         * 
         */
        public DID: number = 0;
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
         * 排序
         * 
         */
        public Sort: number = 0;
        /**
         * CTime
         * 
         */
        public CTime: Date = new Date;
        /**
         * Status
         * -1已删除0未启用1启用
         */
        public Status: number = 0;
    }

    /**
     * 展示区/栏目 Display
     * DID DID 自增(bigint(20))
     * 站点编号 SID 编号(bigint(20))
     * 名称 Name char(50)(char(50))
     * 代码 Code char(50)(char(50))
     * 开始时间 STime 时间(datetime)
     * 结束时间 ETime 时间(datetime)
     * 父级区域 PDID 编号(bigint(20))
     * GID GID 编号(bigint(20))
     * Key Key char(50)(char(50))
     * CUID CUID 编号(bigint(20))
     * CTime CTime 时间(datetime)
     * Status Status 状态(tinyint(1))
    */
    export class Display {

        /**
         * DID
         * 
         */
        public DID: number = 0;
        /**
         * 站点编号
         * 
         */
        public SID: number = 0;
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
         * 开始时间
         * 
         */
        public STime: Date = new Date;
        /**
         * 结束时间
         * 
         */
        public ETime: Date = new Date;
        /**
         * 父级区域
         * 
         */
        public PDID: number = 0;
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
         * Status
         * -1已删除0不生效1生效
         */
        public Status: number = 0;
    }
    /**
      * 站点表 Sites
      * 站点编号 SID (bigint(20))
      * 主页链接 Host char255(char(255))
      * 站点标题 Name char255(char(255))
      * 站点备注 Memo char255(char(255))
      * 站点图标 Icon char255(char(255))
      * 创建时间 CTime 时间(datetime)
      * 创建人 CUID 编号(bigint(20))
      * GID GID 编号(bigint(20))
      * Key Key char(50)(char(50))
    */
    export class Sites {

        /**
         * 站点编号
         * 
         */
        public SID: number = 0;
        /**
         * 主页链接
         * 
         */
        public Host: string = "";
        /**
         * 站点标题
         * 
         */
        public Name: string = "";
        /**
         * 站点备注
         * 
         */
        public Memo: string = "";
        /**
         * 站点图标
         * 
         */
        public Icon: string = "";
        /**
         * 创建时间
         * 
         */
        public CTime: Date = new Date;
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
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
     * 展示位管理接口
     * 不支持add，del，delw，replace，replacew，savew
     */
    class display extends ControllerApi<Display> {
        PK = "DID"

    }
    export const DisplayApi = new display('Display', prefix)
    /**
     * 展示位详情管理接口
     * 不支持add，del，delw，replace，replacew，savew
     */
    class displayItem extends ControllerApi<DisplayItem> {
        PK = "DIID"

    }
    export const DisplayItemApi = new displayItem('DisplayItem', prefix)
    /**
     * 站点管理接口
     * 不支持add，del，delw，replace，replacew，savew
     */
    class sites extends ControllerApi<Sites> {
        PK = "SID"

    }
    export const SitesApi = new sites('Sites', prefix)
}

export default SiteApi;