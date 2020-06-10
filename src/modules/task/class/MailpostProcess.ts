/**
  * 里程碑进度 MailpostProcess
  * MPID MPID 自增序号(bigint)
  * OType OType 字符20(char(20))
  * OID OID 序号(bigint)
  * 里程碑 MID 序号(bigint)
  * 里程碑项 MLID 序号(bigint)
  * CUID CUID 序号(bigint)
  * CTime CTime 时间戳(timestamp)
  * Status Status 状态值(tinyint(1))
  * 备注 Memo 字符250(char(250))
  * GID GID 序号(bigint)
  * 关联Key Key 字符20(char(20))
  * 来源 From 字符50(char(50))
*/
export default class ClassTaskMailpostProcess {

  /**
   * MPID
   * 
   */
  public MPID: number = 0;
  /**
   * OType
   * User/Task/TaskGroup/Project
用户/任务/任务组/项目
   */
  public OType: string = "";
  /**
   * OID
   * 
   */
  public OID: number = 0;
  /**
   * 里程碑
   * 
   */
  public MID: number = 0;
  /**
   * 里程碑项
   * 
   */
  public MLID: number = 0;
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
   * Status
   * 
   */
  public Status: number = 0;
  /**
   * 备注
   * 
   */
  public Memo: string = "";
  /**
   * GID
   * 
   */
  public GID: number = 0;
  /**
   * 关联Key
   * 
   */
  public Key: string = "";
  /**
   * 来源
   * 
   */
  public From: string = "";
}