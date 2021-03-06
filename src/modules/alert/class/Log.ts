/**
  * 告警记录 Log
  * ALID ALID 自增序号(bigint)
  * ARID ARID 自增序号(bigint)
  * AGID AGID 自增序号(bigint)
  * Name Name 字符50(char(50))
  * Code Code 字符50(char(50))
  * Memo Memo 字符50(char(50))
  * CTime CTime 时间日期(datetime)
  * CUID CUID 序号(bigint)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * OType OType 字符20(char(20))
  * OID OID 序号(bigint)
  * 告警状态 Status 时间日期(datetime)
*/
export default class ClassAlertLog{
        
    /**
     * ALID
     * 
     */
    public ALID:number=0;    
    /**
     * ARID
     * 
     */
    public ARID:number=0;    
    /**
     * AGID
     * 
     */
    public AGID:number=0;    
    /**
     * Name
     * 
     */
    public Name:string="";    
    /**
     * Code
     * 
     */
    public Code:string="";    
    /**
     * Memo
     * 
     */
    public Memo:string="";    
    /**
     * CTime
     * 
     */
    public CTime:Date=new Date;    
    /**
     * CUID
     * 
     */
    public CUID:number=0;    
    /**
     * AID
     * 
     */
    public AID:number=0;    
    /**
     * GID
     * 
     */
    public GID:number=0;    
    /**
     * Key
     * 
     */
    public Key:string="";    
    /**
     * OType
     * 
     */
    public OType:string="";    
    /**
     * OID
     * 
     */
    public OID:number=0;    
    /**
     * 告警状态
     * -1 取消告警 0待告警 1告警成功
     */
    public Status:Date=new Date;
}