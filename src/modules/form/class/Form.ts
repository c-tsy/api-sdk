import ClassFormValue from "./Value";

/**
  * 表单 Form
  * 清单编号 FID 自增序号(bigint)
  * 清单模板编号 FTID 序号(bigint)
  * 名称 Name 字符50(char(50))
  * 类型 Type 状态值(tinyint(1))
  * 描述 Memo 字符250(char(250))
  * 状态 Status 状态值(tinyint(1))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * 当前版本 Ver 整数(int)
  * 允许修改 Edit 状态值(tinyint(1))
*/
export default class ClassFormForm {

  /**
   * 清单编号
   * 
   */
  public FID: number = 0;
  /**
   * 清单模板编号
   * 
   */
  public FTID: number = 0;
  /**
   * 名称
   * 
   */
  public Name: string = "";
  /**
   * 类型
   * 
   */
  public Type: number = 0;
  /**
   * 描述
   * 
   */
  public Memo: string = "";
  /**
   * 状态
   * -1已删除0暂存1生效
   */
  public Status: number = 0;
  /**
   * 创建人
   * 
   */
  public CUID: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date;
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
   * OID
   * 
   */
  public OID: number = 0;
  /**
   * Key
   * 
   */
  public Key: string = "";
  /**
   * 当前版本
   * 
   */
  public Ver: number = 0;
  /**
   * 允许修改
   * 1允许0禁止
   */
  public Edit: number = 0;

  public Values?: ClassFormValue[] = [];
  public Data?: { [index: string]: any }
}