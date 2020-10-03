import ClassFormColumn from "./Column";

/**
  * 表单模板 Template
  * 清单编号 FTID 自增序号(bigint)
  * 名称 Name 字符50(char(50))
  * 类型 Type 整数(int)
  * 描述 Memo 字符250(char(250))
  * 状态 Status 状态值(tinyint(1))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * 允许修改 Edit 状态值(tinyint(1))
*/
export default class ClassFormTemplate {

  /**
   * 清单编号
   * 
   */
  public FTID: number = 0;
  /**
   * 名称
   * 
   */
  public Name: string = "";

  public Columns: ClassFormColumn[] = [];
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
   * 
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
   * Key
   * 
   */
  public Key: string = "";
  /**
   * 允许修改
   * 1允许修改、0不允许修改
   */
  public Edit: number = 1;
}