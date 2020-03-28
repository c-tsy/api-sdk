import { ApiController, ControllerApi } from '..';
import { SearchWhere, LinkType } from '../lib';
import { SearchResult } from '../lib';
/**
 * 答题部分模块
 */
namespace Paper {
    const prefix = "_paper"/**
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
         * 选项内容
         */
        public Items: ClassQuestionItem[] = [];
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
    /**
     * 试卷处理类
     */
    class paper extends ApiController {
        constructor() {
            super('Paper', prefix);
        }
        /**
         * 统计分析
         * @param GID 
         * @param PID 
         * @param Conf 
         * @param Fields 
         */
        analyze(GID: number, PID: number, Conf: {
            UIDs?: number[],
            UGIDs?: number[],
            GIDs?: number[]
        } = {}, Fields: ('L' | 'UIDs' | 'UGIDMap')[] = []): Promise<ClassPaperAnalyze> {
            return this._post('analyze', { GID, PID, GIDs: Conf.GIDs, UIDs: Conf.UIDs, UGIDs: Conf.UGIDs, Fields: Fields });
        }
        /**
         * 读取试卷内容测试
         * @param PID 试卷编号
         */
        get(PID: number) {
            return this._post('get', { PID });
        }
        /**
         * 添加题目，支持题项的自动处理并要求题项内容不能为空
         * @param Papers 试题
         */
        adds(Papers: ClassPaper[]): Promise<ClassPaper[]> {
            return this._post('adds', Papers)
        }
        /**
         * 修改后保存题干信息，不支持题项的自动处理
         * @param QID 
         * @param Params 
         */
        save(PID: number, Params: ClassPaper): Promise<ClassPaper | boolean> {
            return this._post('save', { PID, Params })
        }
        /**
         * 搜索查询试卷
         * @param w 
         */
        search(w: SearchWhere): Promise<SearchResult<ClassPaper>> {
            return this._post('search', w);
        }
        /**
         * 答题结果提交
         * @param PID 试卷编号
         * @param UID 用户编号
         * @param STime 开始时间
         * @param ETime 结束时间
         * @param GID 分组编号
         * @param Key 分组键
         * @param Answers 答案选项内容
         */
        answer(PID: number, UID: number, STime: Date, ETime: Date, GID: number = 0, Key: string = "", Answers: { QID: number, SlectedQIDs: number[] }[]): Promise<{
            /**正确答案 {QID:[QIID]} QID为键，QIID为数组，正确选项的数组*/
            Right: { [index: string]: number[] },
            //当前答题得分
            Score: number,
            //当前答题次数
            Times: number,
            //消耗时间
            Seconds: number
        }> {
            let answers: any = {};
            for (let x of Answers) {
                answers[x.QID] = x.SelectedQIIDs;
            }
            return this._post('answer', {
                UID, PID, STime, ETime, Key, GID, Answers: answers
            })
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
    class question extends ApiController {
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
            return this._post('search', w);
        }
    }
    export const QuestionApi = new question('Question', prefix)

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
    class QuestionGroup extends ApiController {
        constructor() {
            super('QGroup', prefix)
        }
        /**
         * 查询条件
         * @param w 
         */
        search(w: SearchWhere): Promise<SearchResult<ClassQuestionGroup>> {
            return this._post('search', w);
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
