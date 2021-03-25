/**
  * 产品型号 Model
  * 型号编号 MID 自增(bigint)
  * PID PID 序号(bigint)
  * 产品名称 Name 字符串50(char(50))
  * 型号代码 Code 字符串50(char(50))
  * 厂家 VID 字符串50(char(50))
  * 产品状态 Status 状态字(tinyint(1))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间(datetime)
  * 产品类型 Type 字符串50(char(50))
  * 网络类型 Net 字符串50(char(50))
  * 产品备注 Memo char250(char(250))
  * 数据接入驱动 Driver 字符串50(char(50))
  * 产品配置 Conf char250(char(250))
  * 设备供电方式 Power 状态字(tinyint(1))
  * 产品分类 Class 字符串50(char(50))
  * 需要网关 Gateway 状态字(tinyint(1))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符串50(char(50))
*/
export default class Model {

  /**
   * 型号编号
   * 
   */
  public MID: number = 0;
  /**
   * PID
   * 
   */
  public PID: number = 0;
  /**
   * PMID
   * 
   */
  public PMID: number = 0;
  /**
   * 产品名称
   * 
   */
  public Name: string = "";
  /**
   * 型号代码
   * 
   */
  public Code: string = "";
  /**
   * 厂家
   * vendor 生产厂商
   */
  public VID: string = "";
  /**
   * 产品状态
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
  public CTime: Date = new Date
  /**
   * 产品类型
   * device,gateway
   */
  public Type: string = "";
  /**
   * 网络类型
   * none,4g,nb,wifi,lan,lora
   */
  public Net: string = "";
  /**
   * 产品备注
   * 
   */
  public Memo: string = "";
  /**
   * 数据接入驱动
   * 
   */
  public Driver: string = "";
  /**
   * 产品配置
   * 
   */
  public Conf: string = "";
  /**
   * 设备供电方式
   * 0电池1市电2双供电
   */
  public Power: number = 0;
  /**
   * 产品分类
   * 
   */
  public Class: string = "";
  /**
   * 需要网关
   * 0不需要，1需要
   */
  public Gateway: number = 0;
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