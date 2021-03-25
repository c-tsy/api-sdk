/**
  * 汇率变化记录 RateLog
  * RLID RLID 自增序号(bigint)
  * 货币对编号 EID 序号(bigint)
  * 变更前 Before 高精度金额(double(20,8))
  * 变更后 After 高精度金额(double(20,8))
  * 变更人 CUID 序号(bigint)
  * 变更时间 CTime 时间日期(datetime)
*/
export default class WalletClassRateLog {

  public RLID: number = 0;
  public EID: number = 0;
  public Before: number = 0;
  public After: number = 0;
  public CUID: number = 0;
  public CTime: Date = new Date;
}