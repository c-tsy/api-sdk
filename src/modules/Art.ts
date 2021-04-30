import { ApiController, ApiCommon, ControllerApi } from '../index';
import { ErrorType, SearchWhere, LinkType, SearchResult } from '../lib';
namespace ArtApi {
    const prefix = "_art"
    /**
     * 文章评论对象
     */
    export class ClassArtComment {

        /**
         * CID
         * 
         */
        public CID: number = 0;
        /**
         * ArtID
         * 
         */
        public ArtID: number = 0;
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
         * 评论人
         * 
         */
        public CUID: number = 0;
        /**
         * 评论内容
         * 
         */
        public Desc: string = "";
        /**
         * 图片
         * 
         */
        public Img: string = "";
        /**
         * 评论时间
         * 
         */
        public CTime: Date = new Date;
        /**
         * 引用评论
         * 
         */
        public PCID: number = 0;
        /**
         * 类型
         * 1评论2点赞3签名
         */
        public Type: number = 0;
        /**
         * 是否已点赞
         * 单数已点赞 双数为点赞
         */
        public IsLike: number = 0;
    }
    /**
     * 文章阅读统计对象
     */
    export class ClassArtRead {

        /**
         * RID
         * 
         */
        public RID: number = 0;
        /**
         * 阅读人
         * 
         */
        public UID: number = 0;
        /**
         * 累计时间
         * 
         */
        public Secend: number = 0;
        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 章节编号，默认为0
         * 
         */
        public CID: number = 0;
        /**
         * 阅读次数
         * 
         */
        public Times: number = 0;
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
     * 文章阅读详情对象
     */
    export class ClassArtReadLog {

        /**
         * RLID
         * 
         */
        public RLID: number = 0;
        /**
         * 阅读人
         * 
         */
        public UID: number = 0;
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
         * 更新时间
         * 
         */
        public UTime: Date = new Date;
        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 阅读次数
         * 
         */
        public Times: number = 0;
        /**
         * 阅读编号
         * 
         */
        public RID: number = 0;
        /**
         * GID
         * 
         */
        public GID: number = 0;
    }
    /**
     * 文章附件 ArtFiles
     * 附件编号 AFID 自增编号(bigint(20))
     * 文章编号 ArtID 编号(bigint(20))
     * 创建时间 CTime 时间(datetime)
     * 创建人 CUID 编号(bigint(20))
     * 状态 Status 状态值(tinyint(1))
     * 下载 Open 状态值(tinyint(1))
     * 消耗价值 Price 金额(double(20,2))
     * 价值类型 PType 状态值(tinyint(1))
     * 存储驱动 Driver char(50)(char(50))
     * 存储路径 Path char255(char(255))
     * 访问路径 URL char255(char(255))
     * 图片备注 Memo char255(char(255))
     * 下载次数 TDown 编号(bigint(20))
     * 文件大小 Size 金额(double(20,2))
    */
    export class CMSArtFiles {
        /**
         * 附件编号
         * 
         */
        public AFID: number = 0;
        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 附件名称
         * 
         */
        public Name: string = "";
        /**
         * 分组编号
         * 
         */
        public GID: number = 0;
        /**
         * 分组键
         * 
         */
        public Key: string = "";
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
         * 状态
         * 1正常0不发布-1删除
         */
        public Status: number = 0;
        /**
         * 下载
         * 0开放1不开放
         */
        public Open: number = 0;
        /**
         * 消耗价值
         * 
         */
        public Price: number = 0;
        /**
         * 价值类型
         * 关联钱包模块，提供扣除相应成本的能力
         */
        public PType: number = 0;
        /**
         * 存储驱动
         * 存储驱动对应签名等能力
         */
        public Driver: string = "";
        /**
         * 存储路径
         * 针对存储路径进行签名
         */
        public Path: string = "";
        /**
         * 访问路径
         * 外网访问路径
         */
        public URL: string = "";
        /**
         * 图片备注
         */
        public Memo: string = "";
        /**
         * 下载次数
         * 累计下载次数
         */
        public TDown: number = 0;
        /**
         * 文件大小
         * 
         */
        public Size: number = 0;
    }

    /**
     * 文章覆盖范围 Rule
     * RID RID 自增(bigint(20))
     * 名称 Name char(50)(char(50))
     * 文章编号 ArtID 序号(bigint(20))
     * 类型 Type 状态(tinyint(1))
     * 覆盖值 V 序号(bigint(20))
     * 值类型 VType 状态(tinyint(1))
     * 包含子组? Sub 状态(tinyint(1))
     * 应用编号 AID 编号(bigint(20))
     * 创建时间 CTime 时间(datetime)
     * 创建人 CUID 编号(bigint(20))
     * GID GID 编号(bigint(20))
     * Key Key char(50)(char(50))
    */
    export class CMSRule {

        /**
         * RID
         * 
         */
        public RID: number = 0;
        /**
         * 名称
         * 
         */
        public Name: string = "";
        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 类型
         * 1包含0排除-1禁用
         */
        public Type: number = 1;
        /**
         * 覆盖值
         * 
         */
        public V: number = 0;
        /**
         * 值类型
         * 1用户组0用户
         */
        public VType: number = 1;
        /**
         * 包含子组?
         * 0不包含1包含
         */
        public Sub: number = 1;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
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
      * 文章类型 ArtType
      * 类型编号 ATID 编号(bigint(20))
      * 类型名称 Name char(50)(char(50))
      * 类型代码 Code char(50)(char(50))
      * 控制类 class CMSchar(50)(char(50))
      * 站点编号 SID 编号(bigint(20))
    */
    export class CMSArtType {

        /**
         * 类型编号
         * 
         */
        public ATID: number = 0;
        /**
         * 类型名称
         * 
         */
        public Name: string = "";
        /**
         * 类型代码
         * 
         */
        public Code: string = "";
        /**
         * 控制类
         * 
         */
        public Class: string = "";
        /**
         * 站点编号
         * 
         */
        public SID: number = 0;
    }
    /**
     * 音视频直播扩展 ArtExtendLive 
     * 文章编号 {number} ArtID 编号(bigint(20)) 
     * 推流地址 PUSH char255(char(255)) 
     * 拉流RTMP RTMP char255(char(255)) 
     * 拉流FLV FLV char255(char(255)) 
     * 拉流M3U8 M3U8 char255(char(255)) 
     * 已播时长 PlayTime 时间(datetime) 
     * 总计时长 TotalTime 时间(datetime) 
    */
    export class CMSArtExtendLive {

        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 推流地址
         * 
         */
        public PUSH: string = "";
        /**
         * 拉流RTMP
         * 
         */
        public RTMP: string = "";
        /**
         * 拉流FLV
         * 
         */
        public FLV: string = "";
        /**
         * 拉流M3U8
         * 
         */
        public M3U8: string = "";
        /**
         * 已播时长
         * 
         */
        public PlayTime: Date = new Date;
        /**
         * 总计时长
         * 
         */
        public TotalTime: Date = new Date;
    }

    /**
     * 文章 Art
     * 文章编号 ArtID 自增编号(bigint(20))
     * 应用编号 AID 编号(bigint(20))
     * 标题 Title char255(char(255))
     * 摘要 Memo char255(char(255))
     * 创建时间 CTime 时间(datetime)
     * 创建人 CUID 编号(bigint(20))
     * 状态 Status 状态值(tinyint(1))
     * 版本号 V 编号(bigint(20))
     * 更新时间 UTime 时间(datetime)
     * 更新人 UUID 编号(bigint(20))
     * 首图 Head char255(char(255))
     * 文章类型 Type 编号(bigint(20))
     * 内容类型 CType 状态值(tinyint(1))
     * 置顶 Top 状态值(tinyint(1))
     * 评论 Comment 状态值(tinyint(1))
     * 发布时间 PTime 时间(datetime)
     * 阅读次数 RTimes 编号(bigint(20))
     * 可见性 Vis 状态值(tinyint(1))
     * GID GID 编号(bigint(20))
     * Key Key char(50)(char(50))
     * 开始时间 STime 时间(datetime)
     * 结束时间 ETime 时间(datetime)
     * 点赞数 TStar 编号(bigint(20))
     * 观看量 TView 编号(bigint(20))
     * 评论数 TComment 编号(bigint(20))
     * 预计阅读时长 ReadMin 编号(bigint(20))
     * 学时 StudyMin 编号(bigint(20))
     * 章节编号 CID 编号(bigint(20))
     * 作者编号 AUID 编号(bigint(20))
     * Secend Secend 编号(bigint(20))
     * MD5 MD5 char(50)(char(50))
    */
    export class ClassArt {

        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
        /**
         * 标题
         * 
         */
        public Title: string = "";
        /**
         * 摘要
         * 
         */
        public Memo: string = "";
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
         * 状态
         * 1已发布0暂存-1删除
         */
        public Status: number = 0;
        /**
         * 版本号
         * 
         */
        public V: number = 1;
        /**
         * 更新时间
         * 
         */
        public UTime: Date = new Date;
        /**
         * 更新人
         * 
         */
        public UUID: number = 0;
        /**
         * 首图
         * 
         */
        public Head: string = "";
        /**
         * 文章类型
         * 1 普通文章 2文献类 3录播音频 4 录播视频 5直播视频 6直播音频
         */
        public Type: number = 0;
        /**
         * 内容类型
         * 0html,1md
         */
        public CType: number = 0;
        /**
         * 二级类型
         * 根据应用定义
         */
        public AType: number = 0;
        /**
         * 置顶
         * 
         */
        public Top: number = 0;
        /**
         * 评论
         * 1开启0关闭
         */
        public Comment: number = 1;
        /**
         * 发布时间
         * 定时发布用
         */
        public PTime: Date = new Date;
        /**
         * 阅读次数
         * 
         */
        public RTimes: number = 0;
        /**
         * 可见性
         * 0不可见1全网可见2好友可见3回复可见4仅自己可见5密码
         */
        public Vis: number = 0;
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
         * 开始时间
         * 
         */
        public STime: Date = new Date("1970-01-01 00:00:00");
        /**
         * 结束时间
         * 
         */
        public ETime: Date = new Date("1970-01-01 00:00:00");
        /**
         * 点赞数
         * 累计点赞
         */
        public TStar: number = 0;
        /**
         * 观看量
         * 累计观看
         */
        public TView: number = 0;
        /**
         * 评论数
         * 累计评论
         */
        public TComment: number = 0;
        /**
         * 预计阅读时长
         * 以分钟计算的预计阅读时长，用于提醒用户
         */
        public ReadMin: number = 0;
        /**
         * 学时
         * 以分钟计算的学时计算，每60为一个学时
         */
        public StudyMin: number = 0;
        /**
         * 章节编号
         * 绑定到文章分类的章节编号上
         */
        public CID: number = 0;
        /**
         * 作者编号
         * 发布人!=作者
         */
        public AUID: number = 0;
        /**
         * Secend
         * 
         */
        public Secend: number = 0;
        /**
         * 原创标识
         * 
         */
        public Own: number = 0;
        /**
         * MD5
         * 
         */
        public MD5: string = "";
        /**
         * URL
         * 
         */
        public URL: string = "";
    }

    export class ClassArtOpParams {

        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 标题
         * 
         */
        public Title: string = "";
        /**
         * 摘要
         * 
         */
        public Memo: string = "";
        /**
         * 状态
         * 1发布0暂存-1删除
         */
        public Status: number = 0;
        /**
         * 价格类型，当前默认为1
         * 
         */
        public PType: number = 1;
        /**
         * 价格，默认为0表示无需价格
         * 
         */
        public Price: number = 0;
        /**
         * 首图
         * 
         */
        public Head: string = "";
        /**
         * 文章类型
         * 
         */
        public Type: number = 0;
        /**
         * 置顶
         * 
         */
        public Top: number = 0;
        /**
         * 评论
         * 
         */
        public Comment: number = 0;
        /**
         * 发布时间
         * 定时发布用
         */
        public PTime: Date = new Date;
        /**
         * 内容类型
         * 0html,1md,2ejs
         */
        public CType: number = 0;
        /**
         * 内容
         */
        public Content: string | string[] = "";
        /**
         * 音视频或直播的扩展信息
         */
        public Live: ArtExtendLive | boolean = false
    }

    /**
     * 音视频直播扩展 ArtExtendLive
     * 文章编号 ArtID 编号(bigint(20))
     * 推流地址 PUSH char255(char(255))
     * 拉流RTMP RTMP char255(char(255))
     * 拉流FLV FLV char255(char(255))
     * 拉流M3U8 M3U8 char255(char(255))
     * 已播时长 PlayTime 时间(datetime)
     * 总计时长 TotalTime 时间(datetime)
    */
    export class ArtExtendLive {

        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 推流地址
         * 
         */
        public PUSH: string = "";
        /**
         * 拉流RTMP
         * 
         */
        public RTMP: string = "";
        /**
         * 拉流FLV
         * 
         */
        public FLV: string = "";
        /**
         * 拉流M3U8
         * 
         */
        public M3U8: string = "";
        /**
         * 已播时长
         * 
         */
        public PlayTime: Date = new Date;
        /**
         * 总计时长
         * 
         */
        public TotalTime: Date = new Date;
    }
    /**
     * 文章管理类
     */
    class art extends ApiController {
        /**
         * 删除文章处理
         * @param ArtID 
         */
        del(ArtID: number | number[]) {
            let d: any = {}
            if ('number' == typeof ArtID) {
                d.ArtID = ArtID;
            } else if (ArtID instanceof Array) {
                d.ArtIDs = ArtID
            }
            return this._post('del', d);
        }
        /**
         * 读取文章列表
         * @param {number} W.CID 文章章节号，支持数组或数字，不支持in
         * @param {number} W.CIDs 文章分类号，支持数组或数字，不支持in
         * @param {number} W.Status 文章状态 支持in操作
         * @param {number} W.Type 文章类型 支持in操作
         * @param {number} P 分页页码，从1开始
         * @param {number} N 分页页内条数，默认为10
         * @param {number} Keyword 关键词查询
         */
        async list(sw: SearchWhere): Promise<SearchResult<ClassArt>> {
            let rs = await this._post('list', sw);
            if (rs.L instanceof Array) {

            } else {
                rs.L = [];
            }
            return rs;
        }
        /**
         * 读取文章列表
         * @param {number} W.CID 文章章节号，支持数组或数字，不支持in
         * @param {number} W.CIDs 文章分类号，支持数组或数字，不支持in
         * @param {number} W.Status 文章状态 支持in操作
         * @param {number} W.Type 文章类型 支持in操作
         * @param {number} P 分页页码，从1开始
         * @param {number} N 分页页内条数，默认为10
         * @param {number} Keyword 关键词查询
         */
        async search(sw: SearchWhere) {
            return this.list(sw)
        }
        /**
         * 读取文章的扩展信息
         * @param {number[]} ArtIDs 要读取的文章编号的数组
         * @param {string} Type 读取的扩展字段的类型
         */
        read_extend(ArtIDs: number, Type: 'Live' = 'Live'): Promise<{
            Live: ArtExtendLive[]
        }> {
            return this._post('read_extend', { ArtIDs, Type })
        }
        /**
         * 批量文章类型修改
         * @param {number[]} ArtIDs 文章编号列表
         * @param {'Status'|'Top'} Op 操作标识
         * @param {boolean} Val 操作值
         */
        batch(ArtIDs: number[], Op: 'Status' | 'Top' | 'Comment', Val: boolean) {
            for (let x of ArtIDs) {
                if (!(Number(x) > 0)) {
                    throw new Error('ArtIDs: ' + x)
                }
            }
            if (!['status', 'top', 'comment'].includes(Op.toLowerCase())) {
                throw new Error('Op Error')
            }
            return this._post('batch', { ArtIDs, Op, Val: !!Val ? 1 : 0 })
        }

        /**
         * 读取文章内容
         * @param ArtID 文章编号
         * @param V 版本号
         */
        async read(ArtID: number, V?: number, raw: boolean = false): Promise<ClassArt> {
            if (!ArtID) {
                throw new Error('ArtID')
            }
            let p = ['read', ArtID]
            if (V) {
                p.push(V);
            }
            let rs = await this._post(p.join('/') + '.json', { ArtID, V })
            if (rs.Content && rs.Content.Type == 1 && false === raw) {
                rs.Content.Content = rs.Content.Content.split(',').map((v: string) => `<img src="${v}"/>`).join('<br/>')
            }
            return rs;
        }

        /**
         * 保存文章
         * @param data ClassArtOpParams
         */
        save(data: ClassArtOpParams): Promise<ClassArt> {
            // if (data.Title.length == 0) {
            //     throw new Error('Title.length>0')
            // }
            // if (data.Content.length == 0) {
            //     throw new Error('Content.length>0')
            // }
            if (data.CType == 1) {
                if (data.Content instanceof Array) {
                    for (let x of data.Content) {
                        if ('string' != typeof x) {
                            throw new Error('内容数据错误')
                        }
                    }
                    data.Content = data.Content.join(',')
                }
            }
            return this._post('save', data);
        }

        /**
         * 文章分类管理：注意该操作会清除该文章的分类后再添加，请确保传入了所有该文章的分类设定
         * @param ArtID 要操作的文章的ID
         * @param CIDs 文章分类的ID组成的数组，支持将一个文章绑定到多个分类上
         */
        classify(ArtID: number, CIDs: number[]): Promise<boolean> {
            if (ArtID <= 0) {
                throw new Error(ErrorType.Art.PARAMS_IS_ERROR);
            }
            for (let x in CIDs) {
                if (isNaN(CIDs[x] = Number(CIDs[x]))) {
                    throw new Error('CIDs');
                }
                if (CIDs[x] <= 0) {
                    throw new Error('CIDs');
                }
            }
            return this._post('classify', { ArtID, CIDs });
        }
        /**
         * 规则配置
         * @param {LinkType} Type 关联方式
         * @param {ArtRuleOp[]} Rules 关联规则
         */
        rule(Type: LinkType, Rules: ArtRuleOp[]) {
            return this._post('rule', { Type, Rules });
        }
        /**
         * 附件管理
         * @param {LinkType} Type 关联方式
         * @param {ArtRuleOp[]} Rules 关联规则
         */
        file(Type: LinkType, Files: CMSArtFiles[]) {
            return this._post('file', { Type, Files });
        }
        /**
         * 读取文件列表
         * @param ArtIDs 
         * @param P 
         * @param N 
         * @param W
         */
        files(ArtIDs: number[], P: number = 1, N: number = 10, W: { [index: string]: string | number | { [index: string]: any } }) {
            return this._post('files', { ArtIDs, P, N, W })
        }
    }
    /**
     * 文章规则操作对象
     */
    export class ArtRuleOp {
        /**
         * RID
         * 
         */
        public RID: number = 0;
        /**
         * 名称
         * 
         */
        public Name: string = "";
        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 类型
         * 1包含0排除-1禁用
         */
        public Type: number = 1;
        /**
         * 值
         * 如果
         */
        public V: number = 0;
        /**
         * 值类型
         * 1用户组0用户  当前仅支持用户组方式
         */
        public VType: number = 1;
        /**
         * 包含子组?
         * 0不包含1包含
         */
        public Sub: number = 1;
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
      * 作者 Author
      * 作者编号 AUID 编号(bigint(20))
      * 学历 Degree char255(char(255))
      * 学历类型 DType char255(char(255))
      * 职称 Title char255(char(255))
      * 履历 Resume char255(char(255))
      * 特长专业 Major char255(char(255))
      * 应用编号 AID 编号(bigint(20))
      * GID GID 编号(bigint(20))
      * Key Key char(50)(char(50))
    */
    export class Author {

        /**
         * 作者编号=用户编号
         * 
         */
        public AUID: number = 0;
        /**
         * 学历
         * 
         */
        public Degree: string = "";
        /**
         * 学历类型
         * 
         */
        public DType: string = "";
        /**
         * 职称
         * 
         */
        public Title: string = "";
        /**
         * 履历
         * 
         */
        public Resume: string = "";
        /**
         * 特长专业
         * 
         */
        public Major: string = "";
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
         * JSON 扩展
         * 
         */
        public Extend: Object = {};
    }

    /**
     * 讲师、作者信息
     * 提供adds,save ,del 接口
     */
    export class author extends ControllerApi<Author> {
        PK = "AUID";
    }
    /**
     * 讲师、作者信息
     */
    export const AutherApi = new author('Author', prefix)
    /**
     * 添加文章分类对象
     */
    export class ClassifyAddParams {
        Name: string = "";
        PCID: number = 0;
        Status: number = 1;
        Memo: string = "";
        Icon: string = "";
        Type: number = 1;
        Sort: number = 0;
        Key?: string = '';
        GID?: number = 0;
    }

    /**
     * 修改文章分类对象
     */
    export class ClassifySaveParams extends ClassifyAddParams {
        CID: number = 0;
        Name: string = "";
        PCID: number = 0;
        Status: number = 1;
        Memo: string = "";
        Icon: string = "";
        Sort: number = 0;
        Key?: string = '';
        GID?: number = 0;
    }

    /**
     * 文章分类 Classify
     * 分类编号 CID 自增编号(bigint(20))
     * 分类名称 Name char255(char(255))
     * 创建时间 CTime 时间(datetime)
     * 创建人 CUID 编号(bigint(20))
     * 父分类 PCID 编号(bigint(20))
     * 状态 Status 状态(tinyint(1))
     * 备注 Memo char255(char(255))
     * 图标 Icon char(50)(char(50))
     * 分类类型 Type 编号(bigint(20))
    */
    export class ClassClassify {

        /**
         * 分类编号
         * 
         */
        public CID: number = 0;
        /**
         * 分类名称
         * 
         */
        public Name: string = "";
        /**
         * 对象编号，用于分组或其他用途
         * 
         */
        public GID: number = 0;
        /**
         * 区分建
         * 
         */
        public Key: string = "";
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
         * 父分类
         * 
         */
        public PCID: number = 0;
        /**
         * 状态
         * 1启用0禁用
         */
        public Status: number = 1;
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
         * 分类类型 1默认分类，2
         * 
         */
        public Type: number = 0;
        /**
         * 排序
         */
        public Sort: number = 0;
    }

    /**
     * 文章分类管理类
     */
    class classify extends ControllerApi<ClassClassify> {
        PK = 'CID';
        /**
         * 获取我的所有分类
         * 按Sort和CID排序后返回
         */
        all(w: { [index: string]: string | number | Object }): Promise<ClassClassify[]> {
            return this._post('all', w);
        }
        /**
         * 搜索
         * @param w 
         */
        search(w: SearchWhere) {
            return this._post('search', w);
        }
        /**
         * 获取分类树
         * @param {number[]} CIDs 要取得的树的CID列表
         * @param {number} Deep 循环深度，最大为10，默认为3
         * @description 返回的内容为数组，请使用array_tree方法生成想要的树
         */
        tree(CIDs: number[] | any, Deep: number = 3): Promise<ClassClassify[]> {
            return this._post('tree', { CIDs, Deep });
        }
        /**
         * 批量添加文章分类
         * @param data 
         */
        adds(data: ClassifyAddParams[]): Promise<ClassClassify[]> {
            if (data.length == 0) {
                throw new Error(ErrorType.Art.DATA_LENGTH_IS_ZERO);
            }
            return this._post('adds', data);
        }
        /**
         * 保存文章分类
         * @param data 
         */
        saves(data: ClassifySaveParams[]): Promise<ClassClassify[]> {
            if (data.length == 0) {
                throw new Error(ErrorType.Art.DATA_LENGTH_IS_ZERO);
            }
            if (data.length > 50) {
                throw new Error(ErrorType.Art.DATA_LENGTH_TOO_LONG)
            }
            if (data instanceof Array && data.length > 0) {
                for (let x of data) {
                    if (x.CID == 0) {
                        throw new Error('Classifies.CID')
                    }
                }
            } else {
                throw new Error(ErrorType.Art.DATA_LENGTH_IS_ERROR)
            }
            return this._post('saves', data);
        }
    }

    /**
     * 文章类型管理类
     */
    class type extends ApiController {
        /**
         * 获取所有支持的文章类型
         */
        all() {
            return this._post('all');
        }
    }
    export class ClassArtReadDetail extends ClassArtRead {
        /**
         * 明细记录
         */
        Logs: ClassArtReadLog[] = [];
    }
    /**
     * 阅读记录
     */
    class read extends ApiController {
        /**
         * 读取分析数据记录，若涉及到统计分析请前端处理
         * @param GID 
         */
        analyze(GID?: number, ArtID?: number): Promise<ClassArtRead> {
            return this._post('analyze', { GID, ArtID })
        }
        /**
         * 添加阅读记录
         * @param GID 分组编号，如 按企业切分则是企业编号
         * @param ArtID 文章编号
         * @param UID 阅读人
         * @param Key 字符串切分键
         */
        alog(GID: number, ArtID: number, UID: number, Key: string): Promise<true> {
            return this._post('alog', { GID, ArtID, UID, Key })
        }
        /**
         * 读取阅读记录
         * @param GID 分组编号，如 按企业切分则是企业编号
         * @param ArtID 文章编号
         * @param UID 阅读人
         * @param Key 字符串切分键
         */
        rlog(GID: number, ArtID: number, UID: number, Key: string): Promise<ClassArtReadDetail> {
            return this._post('rlog', { GID, ArtID, UID, Key })
        }
    }
    class comment extends ApiController {
        /**
         * 添加评论
         * 支持引用评论，请传入PCID参数作为引用的评论编号
         * @param Comments 
         */
        adds(Comments: ClassArtComment[]) {
            return this._post('adds', Comments);
        }
        /**
         * 文章点赞
         * @param d 
         */
        like(d: ClassArtComment) {
            return this._post('like', d)
        }

        /**
         * 评论审核
         * @param CIDs 审核的评论编号
         * @param Status 审核状态 0待审核，-1 未通过 1通过
         * @returns 
         */
        judge(CIDs: number[], Status: 0 | 1 | -1): Promise<number> {
            return this._post('judge', { CIDs, Status })
        }
        /**
         * 读取评论内容
         * @param ArtID 
         * @param GID 
         */
        read(ArtID: number, GID?: number, Tree: boolean = true, P: number = 1, N: number = 10) {
            return this._post('read', { ArtID, GID, P, N, Tree });
        }
    }
    export const CommentApi = new comment('Comment', prefix)
    /**
     * 文章管理
     */
    export const Art = new art('Art', prefix);
    export const ArtApi = Art;

    /**
     * 文章类型
     */
    export const Type = new type('Type', prefix);
    export const TypeApi = Type

    /**
     * 文章分类管理
     */
    export const Classify = new classify('Classify', prefix);
    export const ClassifyApi = Classify

    export const ReadApi = new read('Read', prefix)

}
export default ArtApi;