/**
  * 任务 Task
  * 任务编号 TID 自增序号(bigint)
  * 标题 Title 字符250(char(250))
  * Code Code 字符250(char(250))
  * 描述 Memo 字符250(char(250))
  * 优先级 Priority 整数(int)
  * 重要等级 Level 整数(int)
  * 所属任务组 TGID 序号(bigint)
  * URL URL 字符250(char(250))
  * 项目编号 PID 序号(bigint)
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 删除人 DUID 序号(bigint)
  * 删除时间 DTime 时间日期(datetime)
  * 状态 Status 状态值(tinyint(1))
  * 开始时间 STime 时间日期(datetime)
  * 结束时间 ETime 时间日期(datetime)
  * 完成时间 FTime 时间日期(datetime)
  * 父任务 PTID 序号(bigint)
  * Content编号 ArtID 序号(bigint)
  * 负责人 MUID 序号(bigint)
  * 权限 Vis 状态值(tinyint(1))
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
  * 类型 Type 字符20(char(20))
  * 关联对象 OType 字符20(char(20))
  * 对象编号 OID 序号(bigint)
  * 来源 From 字符250(char(250))
*/
export default class ClassTaskTask {

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
   * Code
   * 
   */
  public Code: string = "";
  /**
   * 描述
   * 
   */
  public Memo: string = "";
  /**
   * 优先级
   * 
   */
  public Priority: number = 0;
  /**
   * 重要等级
   * 
   */
  public Level: number = 0;
  /**
   * 所属任务组
   * 
   */
  public TGID: number = 0;
  /**
   * URL
   * 
   */
  public URL: string = "";
  /**
   * 项目编号
   * 
   */
  public PID: number = 0;
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
   * 完成时间
   * 
   */
  public FTime: Date = new Date(0);
  /**
   * 父任务
   * 
   */
  public PTID: number = 0;
  /**
   * Content编号
   * 
   */
  public ArtID: number = 0;
  /**
   * 负责人
   * 
   */
  public MUID: number = 0;
  /**
   * 权限
   * 0 公开 1团队可见 2项目可见 3个人可见
   */
  public Vis: number = 0;
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
   * 来源
   * 标识任务来源，用户定义
   */
  public From: string = "";
}