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
  * 负责人 MUID 序号(bigint)
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
  * 类型 Type 字符20(char(20))
  * 关联对象 OType 字符20(char(20))
  * 对象编号 OID 序号(bigint)
*/
export default class ClassTaskTaskGroup {

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
  public MUID: number = 0;
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
}