import ClassFormField from "./Field";

/**
  * 模板配置 Column
  * 配置编号 CID 自增序号(bigint)
  * 字段编号 FID 序号(bigint)
  * 模板编号 FTID 序号(bigint)
  * 排序 Sort 整数(int)
  * 必填 Must 状态值(tinyint(1))
  * 验证规则 Rule 字符250(char(250))
  * 值来源 From 字符250(char(250))
  * 可添加 Add 布尔(tinyint(1))
  * 可编辑 Edit 布尔(tinyint(1))
  * 显示类型 Show 字符20(char(20))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 默认值 Default 字符250(char(250))
*/
export default class ClassFormColumn {

  /**
   * 配置编号
   * 
   */
  public CID: number = 0;
  /**
   * 字段编号
   * 
   */
  public FID: number = 0;
  /**
   * 模板编号
   * 
   */
  public FTID: number = 0;
  /**
   * 排序
   * 
   */
  public Sort: number = 0;
  /**
   * 必填
   * 
   */
  public Must: number = 0;
  /**
   * 验证规则
   * 如：
RegExp://,
Function://
...
   */
  public Rule: string = "";
  /**
   * 值来源
   * 分为：Enum，直接写好，Table：某个表，Object：某个对象等。。
   */
  public From: string = "";
  /**
   * 可添加
   * 
   */
  public Add: number = 1;
  /**
   * 可编辑
   * 
   */
  public Edit: number = 1;
  /**
   * 显示类型
   * 
   */
  public Show: string = "";
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
   * 默认值
   * 
   */
  public Default: string = "";

  public Field?: ClassFormField = new ClassFormField
}