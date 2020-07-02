/**
  * 用户钱包 Wallet
  * 编号 WID 自增序号(bigint)
  * 用户编号 UID 序号(bigint)
  * 货币编号 CID 序号(bigint)
  * 货币余额 Balance 高精度金额(double(20,8))
  * 变动时间 UTime 时间日期(datetime)
  * 账户类型 Type 状态值(tinyint(1))
*/
export default class WalletClassWallet {

  public WID: number = 0;
  public UID: number = 0;
  public CID: number = 0;
  public Balance: number = 0;
  public UTime: Date = new Date;
  public Type: number = 0;
}