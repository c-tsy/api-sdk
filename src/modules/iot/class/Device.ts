/**
  * 设备 Device
  * 设备编号 DID 自增(bigint)
  * PID PID 序号(bigint)
  * 型号编号 MID 序号(bigint)
  * 设备名称 Name char250(char(250))
  * 设备代码 Code 字符串50(char(50))
  * 设备编码 ID char250(char(250))
  * IMEI IMEI 字符串50(char(50))
  * 安装区域 Area 序号(bigint)
  * 安装地址 Addr char250(char(250))
  * 健康状态 Status 状态字(tinyint(1))
  * 生产状态 PStatus 状态字(tinyint(1))
  * 心跳时间 HTime 时间(datetime)
  * 电池电压 Vol 电池电压(double(3,1))
  * 当前指令数 Length 序号(bigint)
  * 经度 Y 经纬度(double(16,3))
  * 纬度 X 经纬度(double(16,3))
  * 创建时间 CTime 时间(datetime)
  * CUID CUID 序号(bigint)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符串50(char(50))
*/
export default class Device {

  /**
   * 设备编号
   * 
   */
  public DID: number = 0;
  /**
   * PID
   * 
   */
  public PID: number = 0;
  /**
   * 型号编号
   * 
   */
  public MID: number = 0;
  /**
   * 设备名称
   * 
   */
  public Name: string = "";
  /**
   * 设备代码
   * 
   */
  public Code: string = "";
  /**
   * 设备编码
   * 印刷到设备上的
   */
  public ID: string = "";
  /**
   * IMEI
   * 移动设备的地址为IMEI
   */
  public IMEI: string = "";
  /**
   * 安装区域
   * 省市区-代码
   */
  public Area: number = 0;
  /**
   * 安装地址
   * 详细描述的地址
   */
  public Addr: string = "";
  /**
   * 健康状态
   * -3已删除-2异常-1待加载表库0离线1在线
   */
  public Status: number = 0;
  /**
   * 生产状态
   * 
   */
  public PStatus: number = 0;
  /**
   * 心跳时间
   * NB设备为最后一次活动时间
   */
  public HTime: Date = new Date
  /**
   * 电池电压
   * -1表示常供电
   */
  public Vol: number = 0;
  /**
   * 当前指令数
   * 
   */
  public Length: number = 0;
  /**
   * 经度
   * 
   */
  public Y: number = 0;
  /**
   * 纬度
   * 
   */
  public X: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date
  /**
   * CUID
   * 
   */
  public CUID: number = 0;
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
   * Path
   * 
   */
  public Path: string = "";
  /**
   * 设备分组关系
   */
  DIDs?: number[] = [];
}