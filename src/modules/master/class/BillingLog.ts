/**
  * 计费记录 BillingLog
  * BLID BLID 自增(bigint)
  * 户号 FID 序号(bigint)
  * 设备编号 DID 序号(bigint)
  * BGID BGID 序号(bigint)
  * BGRID BGRID 序号(bigint)
  * 计费周期起 STime 时间(datetime)
  * 计费周期止 ETime 时间(datetime)
  * 创建时间 CTime 时间(datetime)
  * 创建人 CUID 序号(bigint)
  * 计费起读数 SValue 金额(double(20,2))
  * 计费止读数 EValue 金额(double(20,2))
  * 计费金额 Money 金额(double(20,2))
  * 备注 Memo char(255)(char(255))
  * 设备类型 Type char(20)(char(20))
  * 数据源 DSID 序号(bigint)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key char(50)(char(50))
*/
export default class MasterClassBillingLog {

  /**
   * BLID
   * 
   */
  public BLID: number = 0;
  /**
   * 户号
   * 
   */
  public FID: number = 0;
  /**
   * 设备编号
   * 
   */
  public DID: number = 0;
  /**
   * BGID
   * 
   */
  public BGID: number = 0;
  /**
   * BGRID
   * 
   */
  public BGRID: number = 0;
  /**
   * 计费周期起
   * 
   */
  public STime: Date = new Date;
  /**
   * 计费周期止
   * 
   */
  public ETime: Date = new Date;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date;
  /**
   * 创建人
   * 
   */
  public CUID: number = 0;
  /**
   * 计费起读数
   * 
   */
  public SValue: number = 0;
  /**
   * 计费止读数
   * 
   */
  public EValue: number = 0;
  /**
   * 计费金额
   * 
   */
  public Money: number = 0;
  /**
   * 备注
   * 
   */
  public Memo: string = "";
  /**
   * 设备类型
   * Hot/Air/Water/Elec
   */
  public Type: string = "";
  /**
   * 数据源
   * 
   */
  public DSID: number = 0;
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