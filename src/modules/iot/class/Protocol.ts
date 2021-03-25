/**
  * 协议列表 Protocol
  * PID PID 自增(bigint)
  * Icon Icon char250(char(250))
  * Memo Memo char250(char(250))
  * Name Name char250(char(250))
  * CUID CUID 序号(bigint)
  * CTime CTime 时间(datetime)
  * 状态 Status 状态字(tinyint(1))
  * 驱动名称 Driver char250(char(250))
  * 驱动参数 Conf char250(char(250))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符串50(char(50))
*/
export default class Protocol {

  /**
   * PID
   * 
   */
  public PID: number = 0;
  /**
   * Icon
   * 
   */
  public Icon: string = "";
  /**
   * Memo
   * 
   */
  public Memo: string = "";
  /**
   * Name
   * 
   */
  public Name: string = "";
  /**
   * CUID
   * 
   */
  public CUID: number = 0;
  /**
   * CTime
   * 
   */
  public CTime: Date = new Date;
  /**
   * 状态
   * 
   */
  public Status: number = 0;
  /**
   * 驱动名称
   * 
   */
  public Driver: string = "";
  /**
   * 驱动参数
   * 
   */
  public Conf: string = "";
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