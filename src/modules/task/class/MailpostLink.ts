/**
  * 里程碑关联 MailpostLink
  * MLID MLID 自增序号(bigint)
  * MID MID 序号(bigint)
  * OType OType 字符20(char(20))
  * OID OID 序号(bigint)
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
*/
export default class ClassTaskMailpostLink {

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
   * OType
   * 
   */
  public OType: string = "";
  /**
   * OID
   * 
   */
  public OID: number = 0;
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
   * 创建人
   * 
   */
  public CUID: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date(0)
}