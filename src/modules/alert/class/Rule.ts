/**
  * 告警配置 Rule
  * ARID ARID 自增序号(bigint)
  * AGID AGID 序号(bigint)
  * 键 K 字符20(char(20))
  * 值 V 金额(double(20,2))
  * 时间 T 整数(int)
  * 聚合方式 P 状态值(tinyint(1))
  * 判断条件 R 状态值(tinyint(1))
  * Name Name 字符50(char(50))
  * Code Code 字符50(char(50))
  * CTime CTime 时间日期(datetime)
  * CUID CUID 序号(bigint)
  * Status Status 状态值(tinyint(1))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
*/
export default class ClassAlertRule{
        
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
     * 键
     * 
     */
    public K:string="";    
    /**
     * 值
     * 仅支持数值型
     */
    public V:number=0;    
    /**
     * 时间
     * 分钟，0表示每次
     */
    public T:number=0;    
    /**
     * 聚合方式
     * 0 AVG 1MAX 2MIN
     */
    public P:number=0;    
    /**
     * 判断条件
     * 0 = -1< -2<= 1> 2>=
     */
    public R:number=0;    
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
}