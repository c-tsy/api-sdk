/**
  * 字段表 Field
  * 字段编号 FID 自增序号(bigint)
  * 字段名 Name 字符50(char(50))
  * 代码 K 字符100(char(100))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 状态 Status 状态值(tinyint(1))
  * 单位 Unit 字符50(char(50))
  * 数据类型 Type 整数(int)
  * 验证规则 Rule 字符250(char(250))
  * AID AID 序号(bigint)
  * GID GID 序号(bigint)
  * Key Key 字符50(char(50))
  * 值来源 From 字符250(char(250))
  * 可添加 Add 布尔(tinyint(1))
  * 可编辑 Edit 布尔(tinyint(1))
  * 显示类型 Show 字符20(char(20))
  * 默认值 Default 字符250(char(250))
*/
export default class ClassFormField{
        
    /**
     * 字段编号
     * 
     */
    public FID:number=0;    
    /**
     * 字段名
     * 
     */
    public Name:string="";    
    /**
     * 代码
     * 
     */
    public K:string="";    
    /**
     * 创建人
     * 
     */
    public CUID:number=0;    
    /**
     * 创建时间
     * 
     */
    public CTime:Date=new Date;    
    /**
     * 状态
     * 
     */
    public Status:number=0;    
    /**
     * 单位
     * 
     */
    public Unit:string="";    
    /**
     * 数据类型
     * char20,char50,char255,int,bigint,tinyint,double,gps
     */
    public Type:number=1;    
    /**
     * 验证规则
     * 如：
RegExp://,
Function://
...
     */
    public Rule:string="";    
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
     * 值来源
     * 分为：Enum，直接写好，Table：某个表，Object：某个对象等。。
     */
    public From:string="";    
    /**
     * 可添加
     * 
     */
    public Add:number=1;    
    /**
     * 可编辑
     * 
     */
    public Edit:number=1;    
    /**
     * 显示类型
     * 
     */
    public Show:string="";    
    /**
     * 默认值
     * 
     */
    public Default:string="";
}