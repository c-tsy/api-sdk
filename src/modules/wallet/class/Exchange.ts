/**
  * 货币转换 Exchange
  * 编号 EID 自增序号(bigint)
  * 源货币 FCID 序号(bigint)
  * 目标货币 TCID 序号(bigint)
  * 汇率 Rate 金额(double(20,2))
  * 状态 Status 状态值(tinyint(1))
  * 生效时间 STime 时间日期(datetime)
  * 过期时间 ETime 时间日期(datetime)
*/
export default class WalletClassExchange {

  public EID: number = 0;
  public FCID: number = 0;
  public TCID: number = 0;
  public Rate: number = 0;
  public Status: number = 1;
  public STime: Date = new Date;
  public ETime: Date = new Date;
}