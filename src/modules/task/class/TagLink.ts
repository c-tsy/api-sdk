/**
  * 任务标签关联 TagLink
  * 关联主键 TLID 序号(bigint)
  * 任务标签 TagID 序号(bigint)
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 关联对象 OType 字符20(char(20))
  * 对象编号 OID 序号(bigint)
*/
export default class ClassTaskTagLink {

  /**
   * 关联主键
   * 
   */
  public TLID: number = 0;
  /**
   * 任务标签
   * 
   */
  public TagID: number = 0;
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