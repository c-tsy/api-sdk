/**
  * 设备数据记录 DataLog
  * 消息编号 DLID 自增(bigint)
  * 设备编号 DID 序号(bigint)
  * 型号编号 MID 序号(bigint)
  * PID PID 序号(bigint)
  * 发送编号 DDID 序号(bigint)
  * 设备地址 Addr 序号(bigint)
  * 网关编号 GateID 序号(bigint)
  * 数据方向 To 字符串50(char(50))
  * 状态 Status 字符串50(char(50))
  * 失败原因 FMemo char250(char(250))
  * 产生时间 CTime 时间(datetime)
  * 产生人 CUID 序号(bigint)
  * 指令码 Code 序号(bigint)
  * 原因 Memo char250(char(250))
  * 写入时间 WTime 时间(datetime)
  * 原始数据 Origin char250(char(250))
  * 处理时间 RTime 时间(datetime)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符串50(char(50))
*/
export default class DataLog {

  /**
   * 消息编号
   * 
   */
  public DLID: number = 0;
  /**
   * 设备编号
   * 
   */
  public DID: number = 0;
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
   * 发送编号
   * 每个设备每天的编号递增
   */
  public DDID: number = 0;
  /**
   * 设备地址
   * 移动设备的地址为IMEI
   */
  public Addr: number = 0;
  /**
   * 网关编号
   * 
   */
  public GateID: number = 0;
  /**
   * 数据方向
   * server/device
   */
  public To: string = "";
  /**
   * 状态
   * 0待处理1已下发平台2已送达3已确认4完成-1失败
   */
  public Status: string = "";
  /**
   * 失败原因
   * 
   */
  public FMemo: string = "";
  /**
   * 产生时间
   * 
   */
  public CTime: Date = new Date
  /**
   * 产生人
   * 
   */
  public CUID: number = 0;
  /**
   * 指令码
   * 指令码一般为数字
   */
  public Code: number = 0;
  /**
   * 原因
   * 
   */
  public Memo: string = "";
  /**
   * 写入时间
   * 
   */
  public WTime: Date = new Date
  /**
   * 原始数据
   * 
   */
  public Origin: string = "";
  /**
   * 处理时间
   * 
   */
  public RTime: Date = new Date
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