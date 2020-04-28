/**
  * 任务 Task
  * 任务编号 TID 自增序号(bigint)
  * 标题 Title 字符250(char(250))
  * 描述 Memo 字符250(char(250))
  * 优先级 Priority 整数(int)
  * 重要等级 Level 整数(int)
  * 所属任务组 TGID 序号(bigint)
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
  * 关联文章编号 AID 序号(bigint)
  * 负责人 DirectorUID 序号(bigint)
  * 团队编号 UnitID 序号(bigint)
  * 权限 Rule 状态值(tinyint(1))
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
*/
export default class ClassTask {

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
   * -1 已删除 0 未开始 1进行中 2已完成
   */
  public Status: number = 0;
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
   * 完成时间
   * 
   */
  public FTime: Date = new Date("1970-01-01 00:00:00");
  /**
   * 父任务
   * 
   */
  public PTID: number = 0;
  /**
   * 关联文章编号
   * 
   */
  public AID: number = 0;
  /**
   * 负责人
   * 
   */
  public DirectorUID: number = 0;
  /**
   * 团队编号
   * 
   */
  public UnitID: number = 0;
  /**
   * 权限
   * 0 公开 1团队可见 2项目可见 3个人可见
   */
  public Rule: number = 0;
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