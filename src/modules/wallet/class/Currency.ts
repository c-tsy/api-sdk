/**
  * 货币 Currency
  * 编号 CID 自增序号(bigint)
  * 名称 Name 字符20(char(20))
  * 代码 Code 字符20(char(20))
  * 状态 Status 状态值(tinyint(1))
  * 单位 Unit 字符20(char(20))
  * 符号 Icon 字符20(char(20))
  * 备注 Memo 字符50(char(50))
*/
export default class WalletClassCurrency {

  public CID: number = 0;
  public Name: string = "";
  public Code: string = "";
  public Status: number = 0;
  public Unit: string = "";
  public Icon: string = "";
  public Memo: string = "";
}