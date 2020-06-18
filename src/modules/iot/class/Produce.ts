/**
  * 生产信息 Produce
  * 设备编号 DID 序号(bigint)
  * 批号 BNo 字符串50(char(50))
  * 生产商 VID 序号(bigint)
  * 产线编号 PLID 序号(bigint)
  * 生产时间 CTime 时间(datetime)
  * 生产人 CUID 序号(bigint)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符串50(char(50))
*/
export default class Produce {

  /**
   * 设备编号
   * 
   */
  public DID: number = 0;
  /**
   * 批号
   * 
   */
  public BNo: string = "";
  /**
   * 生产商
   * vendor 生产厂商
   */
  public VID: number = 0;
  /**
   * 产线编号
   * 
   */
  public PLID: number = 0;
  /**
   * 生产时间
   * 
   */
  public CTime: Date = new Date;
  /**
   * 生产人
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
}