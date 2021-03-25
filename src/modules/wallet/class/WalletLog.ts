/**
  * 钱包记录 WalletLog
  * WLID WLID 自增序号(bigint)
  * 货币号 CID 序号(bigint)
  * 用户编号 UID 序号(bigint)
  * 变更前 Before 高精度金额(double(20,8))
  * 变更后 After 高精度金额(double(20,8))
  * 变更量 Money 高精度金额(double(20,8))
  * 变更原因 Reason 字符20(char(20))
  * 变更人 CUID 序号(bigint)
  * 变更时间 CTime 时间日期(datetime)
  * 账户类型 Type 状态值(tinyint(1))
  * 订单号 OID 字符20(char(20))
*/
export default class WalletClassWalletLog {

  public WLID: number = 0;
  public CID: number = 0;
  public UID: number = 0;
  public Before: number = 0;
  public After: number = 0;
  public Money: number = 0;
  public Reason: string = "";
  public CUID: number = 0;
  public CTime: Date = new Date;
  public Type: number = 0;
  public OID: string = "";
}