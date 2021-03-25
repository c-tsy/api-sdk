/**
  * 评论 Comment
  * 评论编号 CID 自增序号(bigint)
  * 任务编号 TID 序号(bigint)
  * 标题 Title 字符100(char(100))
  * 描述 Memo 字符250(char(250))
  * 关联文章编号 AID 序号(bigint)
  * 引用评论 FCID 序号(bigint)
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 删除人 DUID 序号(bigint)
  * 删除时间 DTime 时间日期(datetime)
  * 状态 Status 状态值(tinyint(1))
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
*/
export default class ClassTaskComment {

  /**
   * 评论编号
   * 
   */
  public CID: number = 0;
  /**
   * 任务编号
   * 
   */
  public TID: number = 0;
  /**
   * 标题
   * 
   */
  public Title: string = "";
  /**
   * 描述
   * 
   */
  public Memo: string = "";
  /**
   * 关联文章编号
   * 
   */
  public AID: number = 0;
  /**
   * 引用评论
   * 
   */
  public FCID: number = 0;
  /**
   * 创建人
   * 
   */
  public CUID: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date("1970-01-01 00:00:00");
  /**
   * 删除人
   * 
   */
  public DUID: number = 0;
  /**
   * 删除时间
   * 
   */
  public DTime: Date = new Date("1970-01-01 00:00:00");
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
   * 关联Key
   * 
   */
  public Key: string = "";
}