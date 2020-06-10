/**
  * 里程碑 Milepost
  * MID MID 自增序号(bigint)
  * 标题 Title 字符250(char(250))
  * Code Code 字符20(char(20))
  * PMID PMID 序号(bigint)
  * Y Y 高精度金额(double(20,8))
  * X X 高精度金额(double(20,8))
  * 描述 Memo 字符250(char(250))
  * URL URL 字符250(char(250))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 删除人 DUID 序号(bigint)
  * 删除时间 DTime 时间日期(datetime)
  * 状态 Status 状态值(tinyint(1))
  * 开始时间 STime 时间日期(datetime)
  * 结束时间 ETime 时间日期(datetime)
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
  * 类型 Type 字符20(char(20))
  * 关联对象 OType 字符20(char(20))
  * 对象编号 OID 序号(bigint)
  * 图标 Icon 字符50(char(50))
  * 排序 Sort 序号(bigint)
*/
export default class ClassTaskMilepost {

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
   * Code
   * 
   */
  public Code: string = "";
  /**
   * PMID
   * 
   */
  public PMID: number = 0;
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
  /**
   * 描述
   * 
   */
  public Memo: string = "";
  /**
   * URL
   * 
   */
  public URL: string = "";
  /**
   * 创建人
   * 
   */
  public CUID: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date(0);
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
   * 状态
   * -1 已删除 0 未开始 1进行中 2已完成
   */
  public Status: number = 0;
  /**
   * 开始时间
   * 
   */
  public STime: Date = new Date(0);
  /**
   * 结束时间
   * 
   */
  public ETime: Date = new Date(0);
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
   * 类型
   * 
   */
  public Type: string = "";
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
   * 图标
   * 
   */
  public Icon: string = "";
  /**
   * 排序
   * 
   */
  public Sort: number = 0;
}