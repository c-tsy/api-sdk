import { ApiController, ControllerApi } from '..';
import { SearchWhere, LinkType, CacheConf } from '../lib';
import { SearchResult } from '../lib';
import { ParamsError } from '../errors';
import Upload from './Upload';
import Wechat from './Wechat';
/**
 * 答题部分模块
 */
namespace Paper {
    export const prefix = "_paper"/**
    * 试卷答题结论 Answered
    * 结论编号 PAID 自增(bigint(20))
    * 试卷编号 PID 序号(bigint(20))
    * 答题人 CUID 序号(bigint(20))
    * 总分 Total 2位小数(double(20,2))
    * 得分 Score 2位小数(double(20,2))
    * 答题次数 Times 状态(tinyint(1))
    * 开始时间 STime datetime(datetime)
    * 结束时间 ETime datetime(datetime)
    * 总计耗时 Seconds 序号(bigint(20))
    * 有效答题 Accept 状态(tinyint(1))
    * 应用编号 AID 序号(bigint(20))
    * 分组编号 GID 序号(bigint(20))
    * 分组键 Key char(100)(char(100))
    * 创建时间 CTime datetime(datetime)
    * 创建人 CUID2 序号(bigint(20))
    * 更新时间 UTime datetime(datetime)
    * 更新人 UUID 序号(bigint(20))
    * 删除时间 DTime datetime(datetime)
    * 删除人 DUID 序号(bigint(20))
    * 答题IP IP char(50)(char(50))
    * 答题设备 Device char(50)(char(50))
    * 答题唯一键 Uniq char(50)(char(50))
  */
    export class ClassPaperAnswered {

        /**
         * 结论编号
         * 
         */
        public PAID: number = 0;
        /**
         * 试卷编号
         * 
         */
        public PID: number = 0;
        /**
         * 答题人
         * 
         */
        public CUID: number = 0;
        /**
         * 总分
         * 
         */
        public Total: number = 0;
        /**
         * 得分
         * 
         */
        public Score: number = 0;
        /**
         * 答题次数
         * 第一次为1，按次累计
         */
        public Times: number = 1;
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
         * 总计耗时
         * 
         */
        public Seconds: number = 0;
        /**
         * 有效答题
         * 1有效0无效，针对允许重复答题
         */
        public Accept: number = 1;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
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
         * 删除时间
         * 
         */
        public DTime: Date = new Date;
        /**
         * 删除人
         * 
         */
        public DUID: number = 0;
        /**
         * 答题IP
         * 
         */
        public IP: string = "";
        /**
         * 答题设备
         * 
         */
        public Device: string = "";
        /**
         * 答题唯一键
         * 
         */
        public Uniq: string = "";
        /**
         * 签名内容
         * 
         */
        public Sign: string = "";
        /**
         * 标题
         */
        public Title: string = "";
        /**
         * 备注
         */
        public Memo: string = "";
        /**
         * 类型
         */
        public Type: number = 0
        /**
         * 关联类型
         */
        public OType: string = "";
        public OID: number = 0;
        /**
         * 状态
         */
        public Status: number = 0;
        /**
         * 扩展信息，支持用字符串做额外的数据存储
         */
        public Extra: string = "";
        /**
         * GPS X-经度，Y-纬度
         */
        X = 0;
        Y = 0;
    }
    /**
  * 答题情况 PaperAnswer
  * 答题编号 PAID 自增(bigint(20))
  * 试卷编号 PID (bigint(20))
  * 应用编号 AID 序号(bigint(20))
  * 分组编号 GID 序号(bigint(20))
  * 分组键 Key char(100)(char(100))
  * 创建时间 CTime datetime(datetime)
  * 创建人 CUID 序号(bigint(20))
  * 题目编号 QID 序号(bigint(20))
  * 选项值 Select 序号(bigint(20))
  * 简答值 Desc char(255)(char(255))
  * 简答类型 DType 状态(tinyint(1))
  * 批注 Memo 序号(bigint(20))
  * 分值 Value 2位小数(double(20,2))
  * 得分 Score 2位小数(double(20,2))
  * 评审方式 JType 状态(tinyint(1))
  * 评审时间 JTime datetime(datetime)
  * 评审人 JUID 序号(bigint(20))
*/
    export class ClassPaperAnswer {

        /**
         * 答题编号
         * 
         */
        public PAID: number = 0;
        /**
         * 试卷编号
         * 
         */
        public PID: number = 0;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
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
         * 题目编号
         * 
         */
        public QID: number = 0;
        /**
         * 选项值
         * 
         */
        public Select: number = 0;
        /**
         * 简答值
         * 简答内容
         */
        public Desc: string = "";
        /**
         * 简答类型
         * 0文本1图片2富文本，富文本模式下引用文章模块
         */
        public DType: number = 1;
        /**
         * 批注
         * 评分备注
         */
        public Memo: number = 0;
        /**
         * 分值
         * 
         */
        public Value: number = 0;
        /**
         * 得分
         * 
         */
        public Score: number = 0;
        /**
         * 评审方式
         * 0系统判定1人工判定
         */
        public JType: number = 1;
        /**
         * 评审时间
         * 
         */
        public JTime: Date = new Date(0);
        /**
         * 评审人
         * 
         */
        public JUID: number = 0;
        /**
         * 结论编号
         * 
         */
        public PADID: number = 0;
    }
    /**
     * 试卷生成规则 Config
     * 规则编号 CID 自增(bigint(20))
     * 试卷编号 PID 序号(bigint(20))
     * 题组编号 QGID 序号(bigint(20))
     * 题目源 Source JSON(json)
     * 抽取题数 Use 序号(bigint(20))
     * 题组分值 Score 2位小数(double(20,2))
     * 排序 Sort 序号(bigint(20))
     * 规则标题 Title char(255)(char(255))
     * 删除人 DUID 序号(bigint(20))
     * 删除时间 DTime datetime(datetime)
     * 更新人 UUID 序号(bigint(20))
     * 更新时间 UTime datetime(datetime)
     * 创建人 CUID 序号(bigint(20))
     * 创建时间 CTime datetime(datetime)
     * 分组键 Key char(100)(char(100))
     * 分组编号 GID 序号(bigint(20))
     * 应用编号 AID 序号(bigint(20))
    */
    export class ClassPaperConfig {

        /**
         * 规则编号
         * 
         */
        public CID: number = 0;
        /**
         * 试卷编号
         * 
         */
        public PID: number = 0;
        /**
         * 题组编号
         * 
         */
        public QGID: number = 0;
        /**
         * 题目源
         * 
         */
        public Source: any = [];
        /**
         * 抽取题数
         * 
         */
        public Use: number = 0;
        /**
         * 题组分值
         * 
         */
        public Score: number = 0;
        /**
         * 排序
         * 
         */
        public Sort: number = 0;
        /**
         * 规则标题
         * 
         */
        public Title: string = "";
        /**
         * 删除人
         * 
         */
        public DUID: number = 0;
        /**
         * 删除时间
         * 
         */
        public DTime: Date = new Date(0);
        /**
         * 更新人
         * 
         */
        public UUID: number = 0;
        /**
         * 更新时间
         * 
         */
        public UTime: Date = new Date(0)
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
        /**
         * 创建时间
         * 
         */
        public CTime: Date = new Date(0)
        /**
         * 分组键
         * 
         */
        public Key: string = "";
        /**
         * 分组编号
         * 
         */
        public GID: number = 0;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
        /**
         * 题组内随机抽题
         * 
         */
        public Rand: boolean = true;
        /**
         * 该配置所属题组中的题目数组
         */
        public Questions: ClassQuestion[] = [];
    }
    /**
    * 题项 QuestionItem
    * 题项编号 QIID 自增(bigint(20))
    * 题目编号 QID 序号(bigint(20))
    * 内容 Desc char(255)(char(255))
    * 内容类型 DType 状态(tinyint(1))
    * 正确选项 IsRight 状态(tinyint(1))
    * 应用编号 AID 序号(bigint(20))
    * 分组编号 GID 序号(bigint(20))
    * 分组键 Key char(100)(char(100))
    * 创建时间 CTime datetime(datetime)
    * 创建人 CUID 序号(bigint(20))
    * 更新时间 UTime datetime(datetime)
    * 更新人 UUID 序号(bigint(20))
    * 删除时间 DTime datetime(datetime)
    * 删除人 DUID 序号(bigint(20))
    */
    export class ClassQuestionItem {
        /**
         * 题项编号
         * 
         */
        public QIID: number = 0;
        /**
         * 题目编号
         * 
         */
        public QID: number = 0;
        /**
         * 内容
         * 
         */
        public Desc: string = "";
        /**
         * 内容类型
         * 0文本1图片2富文本，富文本模式下引用文章模块
         */
        public DType: number = 1;
        /**
         * 正确选项
         * 
         */
        public IsRight: number = 1;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
        Score = 0
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
        public CTime: Date = new Date(0)
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
        /**
         * 更新时间
         * 
         */
        public UTime: Date = new Date(0)
        /**
         * 更新人
         * 
         */
        public UUID: number = 0;
        /**
         * 删除时间
         * 
         */
        public DTime: Date = new Date(0)
        /**
         * 删除人
         * 
         */
        public DUID: number = 0;
        /**
         * 关联图片
         */
        Img = ""
        /**
         * 备注内容
         */
        Memo = ""
        /**
         * 特殊项
         */
        Special = 0
    }
    /**
      * 试卷 Paper
      * 试卷编号 PID 自增(bigint(20))
      * 试卷名称 Title char(255)(char(255))
      * 开始时间 STime datetime(datetime)
      * 截止时间 ETime datetime(datetime)
      * 备注 Memo char(255)(char(255))
      * 状态 Status 状态(tinyint(1))
      * 总分 Total 序号(bigint(20))
      * 及格分 Pass 序号(bigint(20))
      * 时间限制 TimeLimit 序号(bigint(20))
      * 允许复达次数 Times 状态(tinyint(1))
      * 应用编号 AID 序号(bigint(20))
      * 分组编号 GID 序号(bigint(20))
      * 分组键 Key char(100)(char(100))
      * 创建时间 CTime datetime(datetime)
      * 创建人 CUID 序号(bigint(20))
      * 更新时间 UTime datetime(datetime)
      * 更新人 UUID 序号(bigint(20))
      * 删除时间 DTime datetime(datetime)
      * 删除人 DUID 序号(bigint(20))
    */
    export class ClassPaper {

        /**
         * 试卷编号
         * 
         */
        public PID: number = 0;
        /**
         * 文章编号
         * 
         */
        public ArtID: number = 0;
        /**
         * 试卷名称
         * 
         */
        public Title: string = "";

        public Rate: number = 0;
        public RUnit: number = 0;
        /**
         * 试卷类型 bigint 0默认1问卷2考评
         */
        public Type: number = 0;
        /**
         * 开始时间
         * 
         */
        public STime: Date = new Date(0)
        /**
         * 截止时间
         * 
         */
        public ETime: Date = new Date(0)
        /**
         * 备注
         * 
         */
        public Memo: string = "";
        /**
         * 状态
         * 1启用0禁用-1已删除
         */
        public Status: number = 1;
        /**
         * 总分
         * 
         */
        public Total: number = 100;
        /**
         * 及格分
         * 
         */
        public Pass: number = 60;
        /**
         * 时间限制
         * 以秒计时，时间限制
         */
        public TimeLimit: number = 0;
        /**
         * 允许复达次数
         * 1次表示只能答一次
         */
        public Times: number = 1;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
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
        public CTime: Date = new Date(0)
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
        /**
         * 更新时间
         * 
         */
        public UTime: Date = new Date(0)
        /**
         * 更新人
         * 
         */
        public UUID: number = 0;
        /**
         * 删除时间
         * 
         */
        public DTime: Date = new Date(0)
        /**
         * 删除人
         * 
         */
        public DUID: number = 0;

        /**
         * 是否已使用，使用过的试卷不得再修改
         * 
         */
        public InUse: boolean = false;
        /**
         * 多个题组的配置
         */
        public Configs: ClassPaperConfig[] = [];

        public Art?: { ArtID: number, Title: string, Memo: string, Head: string } = { ArtID: 0, Title: '', Memo: '', Head: '' }
    }
    /**
     * 题目附件类型
     */
    export enum QuestionFType {
        /**
         * 附件
         */
        Image,
        /**
         * 视频
         */
        Video,
        /**
         * 音频
         */
        Audio,
    }
    /**
     * 题目类型
     */
    export enum QuestionType {
        // 单选
        Single,
        // 多选
        Duplex,
        // 判断
        Judge,
        // 简答
        Answer,
        // 填空
        Input,
    }
    /**
      * 题目 Question
      * 题目编号 QID 自增(bigint(20))
      * 题型 QType 状态(tinyint(1))
      * 题干 Title char(255)(char(255))
      * 解析 Memo char(255)(char(255))
      * 分值 Score 2位小数(double(20,2))
      * 应用编号 AID 序号(bigint(20))
      * 分组编号 GID 序号(bigint(20))
      * 分组键 Key char(100)(char(100))
      * 创建时间 CTime datetime(datetime)
      * 创建人 CUID 序号(bigint(20))
      * 更新时间 UTime datetime(datetime)
      * 更新人 UUID 序号(bigint(20))
      * 删除时间 DTime datetime(datetime)
      * 删除人 DUID 序号(bigint(20))
    */
    export class ClassQuestion {

        /**
         * 题目编号
         * 
         */
        public QID: number = 0;
        /**
         * 题型
         * 0单选1多选2判断3简答
         */
        public QType: number = 1;
        /**
         * 题干
         * 
         */
        public Title: string = "";
        /**
         * 解析
         * 
         */
        public Memo: string = "";
        /**
         * 分值
         * 
         */
        public Score: number = 0;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
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
         * 删除时间
         * 
         */
        public DTime: Date = new Date;
        /**
         * 删除人
         * 
         */
        public DUID: number = 0;
        /**
         * 组号
         */
        public QGID: number = 0;
        /**
         * 难易成都
         */
        public Diffcult: number = 0;
        /**
         * 附件类型
         */
        public FType: QuestionFType = QuestionFType.Image;
        /**
         * 链接地址
         */
        public URL: string = '';
        /**
         * 选项内容
         */
        public Items: ClassQuestionItem[] = [];
        Img = ""
    }
    /**
     * 统计分析结论
     */
    export class ClassPaperAnalyzeR {
        /**
         * 用户数组，以用户组编号为键
         */
        UGIDMap: { [index: string]: number[] } = {};
        // 按用户号分组的统计数据
        UIDMap: {
            [index: string]: {
                //总计耗时
                Secends: number,
                //应得总分
                Total: number,
                //实得总分
                Score: number,
                //答题次数
                Times: number
            }
        } = {}
        Log: {
            [index: string]: {
                Score: number,
                Times: number,
                CTime: Date,
                Secends: number,
            }
        } = {};
        Question: {
            //所有题目
            Times: number,
            //唯一性题目数
            Num: number
        } = {
                Times: 0,
                Num: 0
            }
        /**
         * 人次
         */
        Times: number = 0;
        /**
         * 人数
         */
        Num: number = 0;
        /**
         * 平均清空
         */
        Avg: {
            /**
             * 平均消耗时间，单位为s
             */
            Secend: number
        } = {
                Secend: 0
            }
        /**
         * 累计数据
         */
        Total: {
            /**
             * 累计消耗时间，单位为s
             */
            Secend: number
        } = {
                Secend: 0
            };
        /**
         * 成绩分布情况
         */
        ScoreMap: {
            //人次
            Times: { [index: string]: number },
            //人数
            Num: { [index: string]: number },
        } = {
                //人次
                Times: {},
                //人数
                Num: {},
            };
        /**
         * 日期分布情况
         */
        DateMap: {
            //人次
            Times: { [index: string]: number },
            //人数
            Num: { [index: string]: number },
        } = {
                //人次
                Times: {},
                //人数
                Num: {},
            };
    }
    /**
     * 统计分析大对象
     */
    export class ClassPaperAnalyze {
        L: ClassPaperAnswered[] = []
        UIDs: number[] = []
        GIDMap: {
            [index: string]: {
                UIDs: number[],
                Score: { [index: string]: number },
                Times: number
            }
        } = {}
        R: ClassPaperAnalyzeR = new ClassPaperAnalyzeR
    }

    export class AnswerJudge {
        PID: number = 0
        PAID: number = 0
        PADID: number = 0
        QID: number = 0
        Score: number = 0
        Memo: string = ""
        JType: number = 1
        JUID: number = 0
        Status: number = 1
        Extra: string = ""
    }

    /**
     * 答题情况的接口类
     */
    export class answer extends ApiController {
        constructor(token: string = '') {
            super('Answer', prefix, token)
        }
        /**
         * 创建一个答题结论，表示开始答题或用于分享处理
         * @param d 
         */
        create(d: ClassPaperAnswered): Promise<ClassPaperAnswered> {
            return this._post('create', d);
        }
        /**
         * 读取答题试卷明细
         * @param UIDs 
         * @param GIDs 
         * @param PIDs 
         * @param PAIDs 某次答题的记录编号
         * @param P 分页页码
         * @param N 分页每页数量
         */
        detail(UIDs?: number[], GIDs?: number[], PIDs?: number[], PAIDs?: number[], Keys?: string[], Times?: number, P?: number, N?: number, STime: string = '', ETime: string = ''): Promise<{ L: ClassPaperAnswer }> {
            return this._post('detail', { UIDs, GIDs, PIDs, PAIDs, Keys, Times, P, N, STime, ETime }, CacheConf);
        }
        /**
         * 主观题阅卷提交
         * @param judge.PID 试卷编号
         * @param judge.PAID 答题编号
         * @param judge.PADID 答题编号
         * @param judge.QID 试题编号
         * @param judge.Score 得分
         * @param judge.Memo 评分备注
         * @param judge.JType 评分方式，默认为1，手工评分
         * @param judge.JUID 评分人
         */
        judge(judge: AnswerJudge[]): Promise<boolean> {
            return this._post('judge', judge);
        }

        /**
         * 重新计算得分
         * @param d 
         */
        recalc(PAIDs: number[]) {
            return this._post('recalc', { PAIDs })
        }
        /**
         * 读取已答题的结论概况
         * @param UIDs 用户编号列表
         * @param GID 分组键
         * @param PIDs 可选 试卷编号列表，
         */
        answered(UIDs: number[], GID: number, PIDs: number[] = []) {
            return this._post('answered', { UIDs, PIDs, GID }, CacheConf)
        }
        /**
         * 读取隐患台账统计数据
         * @param Status 要查询的状态范围 有隐患0 ，无1，已整改 2
         * @param STime 记录查询范围开始时间 必填
         * @param ETime 记录查询范围截止时间 必填
         * @param w.GIDs 企业编号列表 可选
         * @param w.PIDs 试卷编号列表 可选
         * @param Keys 如果需要获取对应的试卷数据和答题数据请根据情况传入键 PIDs,PAIDs,QIDs组成的数组
         * @param GroupBy 分组键
         * @returns 
         */
        status(
            Status: number[],
            STime: Date | string,
            ETime: Date | string,
            Keys: ("PIDs" | "PAIDs" | "QIDs")[] = [],
            w: { GIDs?: number[]; PIDs?: number[] } = {},
            GroupBy: string[] = []): Promise<{
                T: number;
                L: {
                    GID: number;
                    Amount: number;
                    Status: number;
                    PIDs: number[];
                    PAIDs: number[];
                    QIDs: number[];
                }[];
            }> {
            let status = this._post("status", {
                GIDs: w.GIDs,
                PIDs: w.PIDs,
                STime,
                ETime,
                Status,
                Keys,
                GroupBy
            }, CacheConf);
            return status;
        }
        /**
         * 读取答题统计数据，支持分组统计
         * @param GIDs 参与统计的所有GID数组
         * @param STime 统计时间开始
         * @param ETime 统计时间结束
         * @param Conf.UIDs 参与统计的人员清单
         * @param Conf.PIDs 参与统计的试卷编号列表
         * @param Conf.OType 限定参与统计的OType，只能是一个，且OType与OIDs必须同时出现且有值才会生效
         * @param Conf.OIDs 限定参与统计的OIDs范围，OType与OIDs必须同时出现且有值才会生效
         * @param Conf.PAIDs 参与统计的答题记录编号列表
         * @param Conf.GroupBy 分组查询条件，默认为CUID,GID,PID，可选范围: CUID,GID,PID,PAID
         * @returns {AnswerCountResult} 返回结果 数组
         */
        count(GIDs: number[], STime: string, ETime: string, Conf: {
            UIDs?: number[],
            PIDs?: number[],
            PAIDs?: number[],
            OType?: string,
            OIDs?: number[],
            GroupBy?: string[]
            , Cycle?: 'week' | 'day' | 'month' | 'year'
        } = {}): Promise<AnswerCountResult[]> {
            return this._post('count', Object.assign({
                GIDs, STime, ETime
            }, Conf), CacheConf)
        }
    }

    /**
    *  答题统计的数据接口对象
    */
    export class AnswerCountResult {
        /**
        * 答题人
        */
        CUID: number = 0;
        /**
        * GID
        */
        GID: number = 0;
        /**
        * 用户总得分
        */
        Total: number = 0;
        /**
        * 用户累计得分
        */
        Score: number = 0;
        /**
        * STime
        */
        STime: string = `2021-05-07 10:13:15`;
        /**
        * ETime
        */
        ETime: string = `2021-05-07 11:41:22`;
        /**
        * 用户完成所有答题所消耗的时间
        */
        Secends: number = 0;
        /**
        * 用户在时间段范围内符合条件的累计答题次数
        */
        Count: number = 8;
    }

    /**
     * 答题情况接口
     */
    export const AnswerApi = new answer();
    /**
     * 试卷处理类
     */
    export class paper extends ApiController {
        constructor(token: string = '') {
            super('Paper', prefix, token);
        }
        /**
         * 统计分析
         * @param {number} GID 
         * @param {number} PID 
         * @param Conf 
         * @param {string[]} Fields 
         */
        analyze(GID: number, PID: number, Conf: {
            UIDs?: number[],
            UGIDs?: number[],
            GIDs?: number[]
        } = {}, Fields: ('L' | 'UIDs' | 'UGIDMap')[] = []): Promise<ClassPaperAnalyze> {
            return this._post('analyze', { GID, PID, GIDs: Conf.GIDs, UIDs: Conf.UIDs, UGIDs: Conf.UGIDs, Fields: Fields }, CacheConf);
        }
        /**
         * 读取试卷内容
         * @param {number} PID 试卷编号
         * @param {boolean} _Ext.AllQuestion 是否读取该试卷的所有题目，用于判卷使用，可能会因为权限问题而被拒绝
         */
        get(PID: number, _Ext?: {
            AllQuestion: boolean
        }) {
            return this._post('get', { PID, _Ext }, CacheConf);
        }

        /**
         * 从xlsx中加载Paper数据，
         * @param readAsJSON @ctsy/xlsx 中的 readASJSON方法，
         * @returns 
         */
        async loadFile(readAsJSON: (file: File) => Promise<{ [index: string]: { [index: string]: string | number } }>) {
            let Rs: any = { Questions: [], Paper: {} }
            let file: FileList | any = await Upload.select_file("*.xlsx,*.xls,*.csv")
            if (file.length > 0) {
                let d = await readAsJSON(file[0])
                let pa = new Paper.ClassPaper
                pa.Title = file[0].name
                let Questions = []
                for (let k in d) {
                    //@ts-ignore
                    for (let x of d[k]) {
                        if (x['$Name'] == '类别' || x['$Title'] == '题目') { continue; }
                        let Question = new Paper.ClassQuestion
                        Question.Title = x.$Title;
                        Question.QType = x.$QType;
                        //@ts-ignore
                        Question.AType = x.$AType;
                        Question.Score = x.$Score || 1;
                        Question.Memo = x.$Memo;
                        //@ts-ignore
                        Question.Addit = x.$Addit;
                        for (let i of 'ABCDEFGHIJK') {
                            let Item = new Paper.ClassQuestionItem
                            if (x[i + 'Desc'] && x[i + 'Desc'].length > 1) {
                                Item.Desc = x[i + 'Desc']
                                //@ts-ignore
                                Item.Memo = x[i + 'Memo'] || ''
                                //@ts-ignore
                                Item.Score = x[i + 'Score'] || 0
                                //@ts-ignore                            
                                Item.IsRight = Item.Score > 0 ? 1 : 0
                                Question.Items.push(Item)
                            }
                        }
                        if (Question.Items.length > 0) {
                            Questions.push(Question)
                        }
                    }
                }
                Rs = {
                    Paper: pa,
                    Questions
                }
            } else {
                throw new Error('未选择文件')
            }
            // return;
            let QGroup = new Paper.ClassQuestionGroup();
            QGroup.Title = "默认";
            let g: any = await Paper.QuestionGroupApi.adds([QGroup]);
            for (let x of Rs.Questions) {
                x.QGID = g[0].QGID;
            }
            let Questions = await Paper.QuestionApi.adds(Rs.Questions);
            let Config = new Paper.ClassPaperConfig();
            Config.QGID = g[0].QGID;
            Config.Questions = Questions;
            Config.Score = 60;
            Config.Use = Questions.length;
            Config.Title = "默认";
            Rs.Paper.Configs.push(Config);
            return Rs;
        }
        /**
         * 添加题目，支持题项的自动处理并要求题项内容不能为空
         * @param  {ClassPaper[]} Papers 试题
         */
        adds(Papers: ClassPaper[]): Promise<ClassPaper[]> {
            if (Papers instanceof Array && Papers.length > 0) {
                for (let x of Papers) {
                    if ('string' != typeof x.Title || x.Title.length < 1) {
                        throw new ParamsError('标题错误')
                    }
                    if (x.Total <= 0) {
                        for (let c of x.Configs) {
                            if (c.Score <= 0) {
                                for (let q of c.Questions) {
                                    if (q.Score <= 0)
                                        for (let i of q.Items) {
                                            q.Score = Math.max(q.Score, i.Score)
                                        }
                                    c.Score += q.Score
                                }
                            }
                        }
                    }
                }
            }
            return this._post('adds', Papers)
        }
        /**
         * 修改后保存题干信息，不支持题项的自动处理
         * @param {number} QID 题目编号 
         * @param {ClassPaper} Params 修改的题目参数
         */
        save(PID: number, Params: ClassPaper): Promise<ClassPaper | boolean> {
            return this._post('save', { PID, Params })
        }
        /**
         * 搜索查询试卷
         * @param w 查询条件
         */
        search(w: SearchWhere, Ext: { [index: string]: any } = {}): Promise<SearchResult<ClassPaper>> {
            return this._post('search', Object.assign(w, Ext), CacheConf);
        }
        /**
         * 答题结果提交
         * @param {number} PID 试卷编号
         * @param {number} UID 用户编号
         * @param {Date} STime 开始时间
         * @param {Date} ETime 结束时间
         * @param {number} GID 分组编号
         * @param {string} Key 分组键
         * @param Answers 答案选项内容
         * @param {boolean} Cheat 作弊与否 false 表示不作弊
         * @param {string} Addr 答题地址，用于标识用户位置等信息
         * @param {{OType,OID}} Conf 用于标识OType和OID字段，关联处理
         */
        async answer(PID: number, UID: number, STime: Date, ETime: Date, GID: number = 0, Key: string = "", Answers: {
            QID: number,
            SelectedQIIDs?: number[],
            QType?: QuestionType,
            //填空或简答的内容
            Desc?: string,
            //Paper.Type != 0 时可以直接制定分数
            Score?: string,
            //答题备注
            Memo?: string,
            //答题所涉及到的图片内容，目前仅易安鸟用
            Imgs?: ({
                Name: string,
                Memo: string,
                URL: string,
            } | string)[],
        }[],
            // 是否作弊
            Cheat: boolean = false,
            // 答题位置
            Addr: string = "", Conf?: {
                OType?: string, OID?: number,
                X?: number,
                Y?: number
            }): Promise<{
                /**正确答案 {QID:[QIID]} QID为键，QIID为数组，正确选项的数组*/
                Right: { [index: string]: number[] },
                //当前答题得分
                Score: number,
                //当前答题次数
                Times: number,
                //消耗时间
                Seconds: number
            }> {
            if (!Conf) {
                Conf = {}
            }
            if (Wechat.IsWechatBrower) {
                if (!Conf || (Conf.X == 0 && Conf.Y == 0)) {
                    try {
                        let local = await Wechat.location()
                        Conf.X = local.longitude
                        Conf.Y = local.latitude
                    } catch (error: any) {
                        throw new Error("定位失败")
                    }
                }
            }
            let answers: any = {};
            for (let x of Answers) {
                // answers[x.QID] = x.SelectedQIIDs;
                if (x.Imgs && x.Imgs.length > 0) {
                    for (let i of x.Imgs) {
                        if ('string' == typeof i && i.includes('base64')) {
                            throw new Error('禁止提交Base64编码的图片')
                        }
                    }
                }
                answers[x.QID] = Object.assign(x, {
                    QType: undefined == x.QType ? QuestionType.Single : x.QType,
                    QIIDs: x.SelectedQIIDs || [],
                    Desc: x.Desc || '',
                    Imgs: x.Imgs || [],
                    Memo: x.Memo || ''
                })
                // 允许为空的提交，所以不用判断
                // if([QuestionType.Single,QuestionType.Duplex].includes(answers[x.QID].QType))
            }
            return this._post('answer', Object.assign({
                Addr,
                UID,
                PID,
                STime,
                ETime,
                Key,
                GID,
                Answers: answers,
                Cheat
            }, Conf || {}))
        }
        /**
         * 读取试卷信息
         * @param PID 
         */
        read(PID: number) {

        }
        /**
         * 统计分析试卷信息
         * @param PID 
         */
        static(PID: number) {

        }
    }
    export const PaperApi = new paper()
    /**
     * 题目
     */
    export class question extends ApiController {
        constructor(token = "") {
            super('Question', prefix, token)
        }
        /**
         * 添加题目，支持题项的自动处理并要求题项内容不能为空
         * @param Questions 
         */
        adds(Questions: ClassQuestion[]): Promise<ClassQuestion[]> {
            return this._post('adds', Questions)
        }
        /**
         * 修改后保存题干信息，不支持题项的自动处理
         * @param QID 
         * @param Params 
         */
        save(QID: number, Params: ClassQuestion): Promise<ClassQuestion | boolean> {
            return this._post('save', { QID, Params })
        }
        /**
         * 给题目添加题项
         * @param Item 
         */
        addItem(Item: ClassQuestionItem) {
            return this._post('addItem', Item)
        }
        /**
         * 修改后保存题项
         * @param QIID 
         * @param Params 
         */
        saveItem(QIID: number, Params: ClassQuestionItem) {
            return this._post('saveItem', { QIID, Params });
        }
        /**
         * 删除题项
         * @param QIID 
         * @param QID 
         */
        delItem(QIID: number, QID: number) {
            if (QIID > 0 && QID > 0)
                return this._post('delItem', { QIID, QID });
            throw new Error('QIID Or QID Error')
        }
        search(w: SearchWhere): Promise<SearchResult<ClassQuestion>> {
            return this._post('search', w, CacheConf);
        }
    }
    export const QuestionApi = new question()

    /**
     * 题组 QuestionGroup
     * 题组编号 QGID 自增(bigint(20))
     * 名称 Title char(100)(char(100))
     * 备注 Memo char(255)(char(255))
     * 应用编号 AID 序号(bigint(20))
     * 分组编号 GID 序号(bigint(20))
     * 分组键 Key char(100)(char(100))
     * 创建时间 CTime datetime(datetime)
     * 创建人 CUID 序号(bigint(20))
     * 更新时间 UTime datetime(datetime)
     * 更新人 UUID 序号(bigint(20))
     * 删除时间 DTime datetime(datetime)
     * 删除人 DUID 序号(bigint(20))
    */
    export class ClassQuestionGroup {

        /**
         * 题组编号
         * 
         */
        public QGID: number = 0;
        /**
         * 名称
         * 
         */
        public Title: string = "";
        /**
         * 备注
         * 
         */
        public Memo: string = "";
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
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
         * 删除时间
         * 
         */
        public DTime: Date = new Date;
        /**
         * 删除人
         * 
         */
        public DUID: number = 0;
        public PQGID: number = 0;
        public TQGID: number = 0;
        public Level: number = 0;
    }
    /**
  * 题目分组 QuestionGroupLink
  * 题目分组编号 QGLID 自增(bigint(20))
  * 题目编号 QID 序号(bigint(20))
  * 分组编号 QGID 序号(bigint(20))
  * 分组时间 CTime datetime(datetime)
  * 分组人 CUID 序号(bigint(20))
  * 题组类型 Type 状态(tinyint(1))
  * 删除人 DUID 序号(bigint(20))
  * 删除时间 DTime datetime(datetime)
  * 更新人 UUID 序号(bigint(20))
  * 更新时间 UTime datetime(datetime)
  * 创建人 CUID2 序号(bigint(20))
  * 创建时间 CTime2 datetime(datetime)
  * 分组键 Key char(100)(char(100))
  * 应用编号 AID 序号(bigint(20))
*/
    export class ClassQuestionGroupLink {

        /**
         * 题目分组编号
         * 
         */
        public QGLID: number = 0;
        /**
         * 题目编号
         * 
         */
        public QID: number = 0;
        /**
         * 分组编号
         * 
         */
        public QGID: number = 0;
        /**
         * 分组时间
         * 
         */
        public CTime: Date = new Date;
        /**
         * 分组人
         * 
         */
        public CUID: number = 0;
        /**
         * 题组类型
         * 0用户创建1系统创建
         */
        public Type: number = 0;
        /**
         * 删除人
         * 
         */
        public DUID: number = 0;
        /**
         * 删除时间
         * 
         */
        public DTime: Date = new Date;
        /**
         * 更新人
         * 
         */
        public UUID: number = 0;
        /**
         * 更新时间
         * 
         */
        public UTime: Date = new Date;
        /**
         * 分组键
         * 
         */
        public Key: string = "";
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
    }
    /**
     * 题组管理
     */
    export class QuestionGroup extends ApiController {
        constructor(token = "") {
            super('QGroup', prefix, token)
        }
        /**
         * 查询条件
         * @param w 
         */
        search(w: SearchWhere): Promise<SearchResult<ClassQuestionGroup>> {
            return this._post('search', w, CacheConf);
        }
        /**
         * 批量添加
         * @param Groups 
         */
        adds(Groups: ClassQuestionGroup[]): Promise<ClassQuestionGroup[]> {
            return this._post('adds', Groups)
        }
        /**
         * 保存
         * @param QGID 
         * @param Params 
         */
        save(QGID: number, Params?: ClassQuestionGroup): Promise<ClassQuestionGroup> {
            return this._post('save', { QGID, Params })
        }
        /**
         * 题目分组
         * @param {{ QGID: number, QIDs: number[] } | { QGIDs: number[], QID: number }} Data 分组数据
         * @param Type 分组方式，支持replace替换和append追加
         */
        link(Data: { QGID: number, QIDs: number[] } | { QGIDs: number[], QID: number }, Type: LinkType) {
            return this._post('link', Object.assign({ Type }, Data))
        }
        /**
         * 删除分组关联
         * @param QGID 
         * @param QIDs 
         */
        unlink(QGID: number, QIDs: number[]) {
            return this._post('unlink', { QGID, QIDs })
        }
    }
    export const QuestionGroupApi = new QuestionGroup();

}
export default Paper;
