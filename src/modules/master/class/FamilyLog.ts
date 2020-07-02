/**
  * 户操作记录 FamilyLog
  * FLID FLID 自增(bigint)
  * 户号 FID 序号(bigint)
  * 创建时间 CTime 时间(datetime)
  * 创建人 CUser char(20)(char(20))
  * 名称 Name char(255)(char(255))
  * 描述 Memo char(255)(char(255))
  * 类型 Type char(20)(char(20))
  * 值 Value char(255)(char(255))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key char(50)(char(50))
*/
export default class MasterClassFamilyLog {

  /**
   * FLID
   * 
   */
  public FLID: number = 0;
  /**
   * 户号
   * 
   */
  public FID: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date;
  /**
   * 创建人
   * 
   */
  public CUser: string = "";
  /**
   * 名称
   * 
   */
  public Name: string = "";
  /**
   * 描述
   * 
   */
  public Memo: string = "";
  /**
   * 类型
   * 
   */
  public Type: string = "";
  /**
   * 值
   * 
   */
  public Value: string = "";
  /**
   * AID
   * 
   */
  public AID: number = 0;
  /**
   * GID
   * 
   */
  public GID: number = 0;
  /**
   * Key
   * 
   */
  public Key: string = "";
}