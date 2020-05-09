import ClassTaskMember from "./Member";

/**
  * 项目 Project
  * 项目编号 PID 自增序号(bigint)
  * 项目名称 Title 字符100(char(100))
  * 描述 Memo 字符250(char(250))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 删除人 DUID 序号(bigint)
  * 删除时间 DTime 时间日期(datetime)
  * 父级项目 PPID 序号(bigint)
  * 图标 Icon 字符50(char(50))
  * 排序 Sort 序号(bigint)
  * 重要等级 Level 整数(int)
  * 优先级 Priority 整数(int)
  * 负责人 DirectorUID 序号(bigint)
  * 团队编号 UnitID 序号(bigint)
  * 状态 Status 状态值(tinyint(1))
  * 权限 Rule 状态值(tinyint(1))
  * 类型 Type 字符20(char(20))
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
*/
export default class ClassTaskProject {

  /**
   * 项目编号
   * 
   */
  public PID: number = 0;
  /**
   * 项目名称
   * 
   */
  public Title: string = "";
  /**
   * 描述
   * 
   */
  public Memo: string = "";
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
   * 父级项目
   * 
   */
  public PPID: number = 0;
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
  /**
   * 重要等级
   * 
   */
  public Level: number = 0;
  /**
   * 优先级
   * 
   */
  public Priority: number = 0;
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
   * 状态
   * -1 已删除 0 未启用 1启用中
   */
  public Status: number = 0;
  /**
   * 权限
   * 0 公开 1团队可见 2项目可见 3个人可见
   */
  public Rule: number = 0;
  /**
   * 类型
   * 
   */
  public Type: string = "";
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
  public Member: ClassTaskMember[] = [];
}