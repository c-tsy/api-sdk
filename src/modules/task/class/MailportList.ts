/**
  * 里程碑列表 MailportList
  * MLID MLID 自增序号(bigint)
  * MID MID 序号(bigint)
  * 标题 Title 字符250(char(250))
  * 图标 Icon 字符50(char(50))
  * 描述 Memo 字符250(char(250))
  * 排序 Sort 序号(bigint)
  * 类型 Type 字符20(char(20))
  * 状态 Status 状态值(tinyint(1))
  * 父列表号 PMLID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 创建人 CUID 序号(bigint)
  * 删除时间 DTime 时间日期(datetime)
  * 删除人 DUID 序号(bigint)
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
  * 关联对象 OType 字符20(char(20))
  * 对象编号 OID 序号(bigint)
  * 列表规则 Rule 字符250(char(250))
  * Y Y 高精度金额(double(20,8))
  * X X 高精度金额(double(20,8))
*/
export default class ClassTaskMailportList {

  /**
   * MLID
   * 
   */
  public MLID: number = 0;
  /**
   * MID
   * 
   */
  public MID: number = 0;
  /**
   * 标题
   * 
   */
  public Title: string = "";
  /**
   * 图标
   * 
   */
  public Icon: string = "";
  /**
   * 描述
   * 
   */
  public Memo: string = "";
  /**
   * 排序
   * 
   */
  public Sort: number = 0;
  /**
   * 类型
   * 
   */
  public Type: string = "";
  /**
   * 状态
   * -1 已删除 0 未开始 1进行中 2已完成
   */
  public Status: number = 0;
  /**
   * 父列表号
   * 
   */
  public PMLID: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date(0);
  /**
   * 创建人
   * 
   */
  public CUID: number = 0;
  /**
   * 删除时间
   * 
   */
  public DTime: Date = new Date(0);
  /**
   * 删除人
   * 
   */
  public DUID: number = 0;
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
  /**
   * 关联对象
   * Task，指向某个任务，Comment，指向评论，Project：指向项目
   */
  public OType: string = "";
  /**
   * 对象编号
   * 指向对应类型的编号
   */
  public OID: number = 0;
  /**
   * 列表规则
   * 列表规则
   */
  public Rule: string = "";
  /**
   * Y
   * 
   */
  public Y: number = 0;
  /**
   * X
   * 
   */
  public X: number = 0;
}