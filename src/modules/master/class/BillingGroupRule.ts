/**
  * 计费规则 BillingGroupRule
  * BGRID BGRID 自增(bigint)
  * BGID BGID 序号(bigint)
  * 名称 Title char(50)(char(50))
  * 状态 Status char(50)(char(50))
  * 描述 Memo char(50)(char(50))
  * 启用时间 STime 时间(datetime)
  * 停用时间 ETime 时间(datetime)
  * 计费周期 Cycle 状态(tinyint)
  * 计费周期单位 CycleUnit 状态(tinyint)
  * 计费单位 Unit 状态(tinyint)
  * 计费单价 Price 金额(double(20,2))
  * 计费模型 Model 状态(tinyint)
  * 阶梯开始值 Start 金额(double(20,2))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key char(50)(char(50))
*/
export default class MasterClassBillingGroupRule {

  /**
   * BGRID
   * 
   */
  public BGRID: number = 0;
  /**
   * BGID
   * 
   */
  public BGID: number = 0;
  /**
   * 名称
   * 
   */
  public Title: string = "";
  /**
   * 状态
   * 
   */
  public Status: string = "";
  /**
   * 描述
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
   * 计费周期
   * 
   */
  public Cycle: number = 0;
  /**
   * 计费周期单位
   * 
   */
  public CycleUnit: number = 0;
  /**
   * 计费单位
   * 
   */
  public Unit: number = 0;
  /**
   * 计费单价
   * 
   */
  public Price: number = 0;
  /**
   * 计费模型
   * 阶梯计费
   */
  public Model: number = 0;
  /**
   * 阶梯开始值
   * 
   */
  public Start: number = 0;
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