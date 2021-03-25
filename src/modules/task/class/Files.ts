/**
  * 附件 Files
  * 文件编号 FID 自增序号(bigint)
  * 关联对象 OType 字符20(char(20))
  * 对象编号 OID 序号(bigint)
  * 关联路径 Path 字符250(char(250))
  * 文件类型 Type 字符20(char(20))
  * 文件大小 Size 序号(bigint)
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 状态 Status 状态值(tinyint(1))
  * 可见性 Vis 状态值(tinyint(1))
*/
export default class ClassTaskFiles {

  /**
   * 文件编号
   * 
   */
  public FID: number = 0;
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
   * 关联路径
   * 
   */
  public Path: string = "";
  /**
   * 文件类型
   * 
   */
  public Type: string = "";
  /**
   * 文件大小
   * 
   */
  public Size: number = 0;
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
   * 状态
   * 
   */
  public Status: number = 0;
  /**
   * 可见性
   * 0 公开 1团队可见 2项目可见 3个人可见
   */
  public Vis: number = 0;
}