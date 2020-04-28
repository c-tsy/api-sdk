/**
  * 任务组 TaskGroup
  * 组编号 TGID 自增序号(bigint)
  * 项目编号 PID 序号(bigint)
  * 组名 Title 字符100(char(100))
  * 组描述 Memo 字符250(char(250))
  * 父组编号 PTGID 序号(bigint)
  * 图标 Icon 字符50(char(50))
  * 排序 Sort 序号(bigint)
  * 优先级 Priority 整数(int)
  * 重要等级 Level 整数(int)
  * 负责人 DirectorUID 序号(bigint)
  * 团队编号 UnitID 序号(bigint)
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
*/
export default class ClassTaskGroup {

  /**
   * 组编号
   * 
   */
  public TGID: number = 0;
  /**
   * 项目编号
   * 
   */
  public PID: number = 0;
  /**
   * 组名
   * 
   */
  public Title: string = "";
  /**
   * 组描述
   * 
   */
  public Memo: string = "";
  /**
   * 父组编号
   * 
   */
  public PTGID: number = 0;
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