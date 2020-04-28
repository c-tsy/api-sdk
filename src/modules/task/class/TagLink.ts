/**
  * 任务标签关联 TagLink
  * 关联主键 TLID 序号(bigint)
  * 任务编号 TID 序号(bigint)
  * 任务标签 TagID 序号(bigint)
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
*/
export default class ClassTaskTagLink {

  /**
   * 关联主键
   * 
   */
  public TLID: number = 0;
  /**
   * 任务编号
   * 
   */
  public TID: number = 0;
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
  public CTime: Date = new Date("1970-01-01 00:00:00");
}