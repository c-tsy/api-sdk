/**
  * 告警动作 Cmd
  * ACID ACID 自增序号(bigint)
  * AGID AGID 序号(bigint)
  * Type Type 状态值(tinyint(1))
  * Rule Rule 字符250(char(250))
  * Name Name 字符50(char(50))
  * Code Code 字符50(char(50))
  * CTime CTime 时间日期(datetime)
  * CUID CUID 序号(bigint)
  * Status Status 状态值(tinyint(1))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * 上次告警 UTime 时间日期(datetime)
*/
export default class ClassAlertCmd{
        
    /**
     * ACID
     * 
     */
    public ACID:number=0;    
    /**
     * AGID
     * 
     */
    public AGID:number=0;    
    /**
     * Type
     * 0无动作 1 微信 2 短信 3CURL 4执行函数
     */
    public Type:number=0;    
    /**
     * Rule
     * 对应配置规则 如微信：微信ID+TemplateID+OpenID，CURL：GET、POST、数据
     */
    public Rule:string="";    
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
     * 上次告警
     * 
     */
    public UTime:Date=new Date;
}