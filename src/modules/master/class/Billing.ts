/**
  * 周期账单 Billing
  * 账单编号 BID 序号(bigint)
  * 户号 FID 序号(bigint)
  * 账单类型 Type 状态(tinyint)
  * 周期值 When 序号(bigint)
  * 起始日期 STime 时间(datetime)
  * 结束日期 ETime 时间(datetime)
  * 账单金额 Money 金额(double(20,2))
  * 起读数 SValue 金额(double(20,2))
  * 止读数 EValue 金额(double(20,2))
  * 区间读数 Value 金额(double(20,2))
  * 计费单价 Price 金额(double(20,2))
  * 计费规则 BGRID 序号(bigint)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key char(50)(char(50))
*/
export default class MasterClassBilling {

  /**
   * 账单编号
   * 
   */
  public BID: number = 0;
  /**
   * 户号
   * 
   */
  public FID: number = 0;
  /**
   * 账单类型
   * 0-9,日，周，月，季度，年
   */
  public Type: number = 0;
  /**
   * 周期值
   * 月 202005，周：202052，日：20200201，季度：20201
   */
  public When: number = 0;
  /**
   * 起始日期
   * 
   */
  public STime: Date = new Date;
  /**
   * 结束日期
   * 
   */
  public ETime: Date = new Date;
  /**
   * 账单金额
   * 
   */
  public Money: number = 0;
  /**
   * 起读数
   * 
   */
  public SValue: number = 0;
  /**
   * 止读数
   * 
   */
  public EValue: number = 0;
  /**
   * 区间读数
   * 
   */
  public Value: number = 0;
  /**
   * 计费单价
   * 
   */
  public Price: number = 0;
  /**
   * 计费规则
   * 
   */
  public BGRID: number = 0;
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