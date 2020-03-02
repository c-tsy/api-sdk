import { ApiController, ControllerApi } from '..';
import { SearchWhere, LinkType } from '../lib';
/**
 * 答题部分模块
 */
namespace Paper {
    const prefix = "_paper"
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

        public Items?: ClassQuestionItem[] = [];
    }

    class question extends ApiController {
        /**
         * 添加题目，支持题项的自动处理并要求题项内容不能为空
         * @param Questions 
         */
        adds(Questions: ClassQuestion[]) {
            return this._post('adds', Questions)
        }
        /**
         * 修改后保存题干信息，不支持题项的自动处理
         * @param QID 
         * @param Params 
         */
        save(QID: number, Params: ClassQuestion) {
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
        search(w: SearchWhere) {
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
         * 批量添加
         * @param Groups 
         */
        adds(Groups: ClassQuestionGroup[]) {
            return this._post('adds', Groups)
        }
        /**
         * 保存
         * @param QGID 
         * @param Params 
         */
        save(QGID: number, Params?: ClassQuestionGroup) {
            return this._post('save', { QGID, Params })
        }
        /**
         * 分组
         * @param QGID 
         * @param QIDs 
         * @param Type 
         */
        link(QGID: number, QIDs: number[], Type: LinkType) {
            return this._post('link', { QGID, QIDs, Type })
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
