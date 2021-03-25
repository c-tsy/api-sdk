/**
  * 值存储 Value
  * AVID AVID 自增序号(bigint)
  * K K 字符20(char(20))
  * V V 金额(double(20,2))
  * OType OType 字符20(char(20))
  * OID OID 序号(bigint)
  * CTime CTime 时间日期(datetime)
  * CUID CUID 序号(bigint)
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * AGID AGID 序号(bigint)
*/
export default class ClassAlertValue{
        
    /**
     * AVID
     * 
     */
    public AVID:number=0;    
    /**
     * K
     * 
     */
    public K:string="";    
    /**
     * V
     * 
     */
    public V:number=0;    
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
     * AGID
     * 
     */
    public AGID:number=0;
}