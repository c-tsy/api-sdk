/**
  * 计费组 BillingGroup
  * BGID BGID 自增(bigint)
  * 计费组名 Title char(50)(char(50))
  * 计费组描述 Memo char(50)(char(50))
  * 启用时间 STime 时间(datetime)
  * 停用时间 ETime 时间(datetime)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key char(50)(char(50))
*/
export default class MasterClassBillingGroup {

  /**
   * BGID
   * 
   */
  public BGID: number = 0;
  /**
   * 计费组名
   * 
   */
  public Title: string = "";
  /**
   * 计费组描述
   * 
   */
  public Memo: string = "";
  /**
   * 启用时间
   * 
   */
  public STime: Date = new Date;
  /**
   * 停用时间
   * 
   */
  public ETime: Date = new Date;
  /**
   * AID
   * 
   */
  public AID: number = 0;
  /**
   * 单价
   * 
   */
  public Price: number = 0;
  /**
   * 计价方案类型 0 直接计价，1规则计价
   * 
   */
  public Type: number = 0;
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