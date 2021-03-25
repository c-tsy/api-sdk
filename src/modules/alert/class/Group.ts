/**
  * 告警组 Group
  * AGID AGID 自增序号(bigint)
  * Name Name 字符50(char(50))
  * Code Code 字符50(char(50))
  * Memo Memo 字符50(char(50))
  * CTime CTime 时间日期(datetime)
  * CUID CUID 序号(bigint)
  * Status Status 状态值(tinyint(1))
  * STime STime 时间日期(datetime)
  * ETime ETime 时间日期(datetime)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * OType OType 字符20(char(20))
  * OID OID 序号(bigint)
*/
export default class ClassAlertGroup{
        
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
     * Status
     * 
     */
    public Status:number=0;    
    /**
     * STime
     * 
     */
    public STime:Date=new Date;    
    /**
     * ETime
     * 
     */
    public ETime:Date=new Date;    
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
}