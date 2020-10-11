/**
  * 户 Family
  * 户编号 FID 序号(bigint)
  * 户号 No char(20)(char(20))
  * 户名 Name char(255)(char(255))
  * 性别 Sex 状态(tinyint)
  * 关联用户 UID 序号(bigint)
  * 联系人 CName char(50)(char(50))
  * 电话 Phone char(50)(char(50))
  * 身份证号 IDCard char(50)(char(50))
  * 开户日期 CTime 时间(datetime)
  * 开户人 CUID 序号(bigint)
  * 行政区域 Area 序号(bigint)
  * 区域路径 Path char(255)(char(255))
  * 地址 Addr char(255)(char(255))
  * 账户余额 Balance 金额(double(20,2))
  * 允许欠费金额 Arrears 金额(double(20,2))
  * 房号 Number char(20)(char(20))
  * 合同号 Contract char(20)(char(20))
  * 缴费模式 Mode 状态(tinyint)
  * 状态 Status 状态(tinyint)
  * 性质 Type 状态(tinyint)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key char(50)(char(50))
  * 标记 Tag 状态(tinyint)
  * 设备号 DID 序号(bigint)
  * GPS_X X gps(double(20,13))
  * GPS_Y Y gps(double(20,13))
  * 计费组 BGID 序号(bigint)
*/
export default class ClassMasterFamily {

  /**
   * 户编号
   * 
   */
  public FID: number = 0;
  /**
   * 户号
   * 
   */
  public No: string = "";
  /**
   * 户名
   * 
   */
  public Name: string = "";
  /**
   * 性别
   * -1未知，0男1女
   */
  public Sex: number = 0;
  /**
   * 关联用户
   * 
   */
  public UID: number = 0;
  /**
   * 联系人
   * 
   */
  public CName: string = "";
  /**
   * 电话
   * 
   */
  public Phone: string = "";
  /**
   * 身份证号
   * 
   */
  public IDCard: string = "";
  /**
   * 开户日期
   * 
   */
  public CTime: Date = new Date;
  /**
   * 开户人
   * 
   */
  public CUID: number = 0;
  /**
   * 行政区域
   * 行政区域编号：511124，
   */
  public Area: number = 0;
  /**
   * 区域路径
   * DID/DID/DID
   */
  public Path: string = "";
  /**
   * 地址
   * 实际的精确地址
   */
  public Addr: string = "";
  /**
   * 账户余额
   * 
   */
  public Balance: number = 0;
  /**
   * 允许欠费金额
   * 
   */
  public Arrears: number = 0;
  /**
   * 房号
   * 
   */
  public Number: string = "";
  /**
   * 合同号
   * 
   */
  public Contract: string = "";
  /**
   * 缴费模式
   * 
   */
  public Mode: number = 0;
  /**
   * 状态
   * 未开户/正常/报停/欠费/欠停/销户
   */
  public Status: number = 0;
  /**
   * 性质
   * 居民,商业,政府,军事
   */
  public Type: number = 0;
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
   * 标记
   * 0普通用户1重点用户
   */
  public Tag: number = 0;
  /**
   * 设备号
   * 关联到设备中的设备ID
   */
  public DID: number = 0;
  /**
   * GPS_X
   * 
   */
  public X: number = 0;
  /**
   * GPS_Y
   * 
   */
  public Y: number = 0;
  /**
   * 计费组
   * 每一户有个计费组配置
   */
  public BGID: number = 0;

  IsCard: boolean = false;
  IsNet: boolean = false;
  DNo: string = "";
  OTime: Date = new Date(0);
  DTime: Date = new Date(0);
  STime: Date = new Date(0);
  ETime: Date = new Date(0);
  UTime: Date = new Date(0);
  DType: number = 0;
  Amount: number = 0;
  DFID: number = 0;
  Times: number = 0;
  TMoney: number = 0;
  UMoney: number = 0;

  IMEI?: string = '';
  PIMEI?: string = '';
  /**
   * 楼层
   */
  Floor: number = 0;
  /**
   * 房号
   */
  FNo: number = 0;
  /**
   * 小区
   */
  Community: string = "";
  /**
   * 楼栋
   */
  Building: string = "";
  /**
   * 几单元
   */
  Unit: string = "";

  /**
   * 设备中的产品
   */
  PID: number = 0;
  PName?: string = "";
  /**
   * 设备中中的型号
   */
  MID: number = 0;
  MName?: string = "";
}