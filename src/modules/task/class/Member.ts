/**
  * 成员关系 Member
  * 编号 MID 自增序号(bigint)
  * 关联对象 OType 字符20(char(20))
  * 对象值 OID 序号(bigint)
  * 关联用户 UID 序号(bigint)
  * 状态 Status 状态值(tinyint(1))
  * 创建人 CUID 序号(bigint)
  * 创建时间 CTime 时间日期(datetime)
  * 删除人 DUID 序号(bigint)
  * 删除时间 DTime 时间日期(datetime)
  * 备注 Memo 字符50(char(50))
  * 关系 Type 序号(bigint)
  * 团队编号 UnitID 序号(bigint)
*/
export default class ClassTaskMember {

  /**
   * 编号
   * 
   */
  public MID: number = 0;
  /**
   * 关联对象
   * 
   */
  public OType: string = "";
  /**
   * 对象值
   * 
   */
  public OID: number = 0;
  /**
   * 关联用户
   * 
   */
  public UID: number = 0;
  /**
   * 状态
   * -1 屏蔽 0 待审核 1是正常
   */
  public Status: number = 0;
  /**
   * 创建人
   * 
   */
  public CUID: number = 0;
  /**
   * 创建时间
   * 
   */
  public CTime: Date = new Date("1970-01-01 00:00:00");
  /**
   * 删除人
   * 
   */
  public DUID: number = 0;
  /**
   * 删除时间
   * 
   */
  public DTime: Date = new Date("1970-01-01 00:00:00");
  /**
   * 备注
   * 
   */
  public Memo: string = "";
  /**
   * 关系
   * 不同对象来定义，1000以下是保留的，
   */
  public Type: number = 0;
  /**
   * 团队编号
   * 
   */
  public UnitID: number = 0;
}