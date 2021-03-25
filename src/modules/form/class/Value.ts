/**
  * 表单属性值 Value
  * 属性值编号 VID 自增序号(bigint)
  * 表单编号 FID 序号(bigint)
  * 字段编号 KID 序号(bigint)
  * 清单编号 FTID 序号(bigint)
  * 配置编号 CID 序号(bigint)
  * 属性值字符串 S 字符250(char(250))
  * 属性值 V 金额(double(20,2))
  * Status Status 状态值(tinyint(1))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
*/
export default class ClassFormValue {

  /**
   * 属性值编号
   * 
   */
  public VID: number = 0;
  /**
   * 表单编号
   * 
   */
  public FID: number = 0;
  /**
   * 字段编号
   * 
   */
  public KID: number = 0;
  /**
   * 清单编号
   * 
   */
  public FTID: number = 0;
  /**
   * 配置编号
   * 
   */
  public CID: number = 0;
  /**
   * 属性值字符串
   * 存储字符串类型的不需要统计的数据
   */
  public S: string = "";
  /**
   * 键名称
   * 存储字符串类型的不需要统计的数据
   */
  public K: string = "";
  /**
   * 属性值
   * 存储数字型需要涉及到统计运算的数据
   */
  public V: number = 0;
  /**
   * Status
   * -1已删除0不生效1生效
   */
  public Status: number = 0;
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