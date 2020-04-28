/**
  * 标签 Tags
  * 任务标签 TagID 自增序号(bigint)
  * 名称 Title 字符50(char(50))
  * 拼音 PY 字符100(char(100))
  * 颜色 Color 字符20(char(20))
  * 图标 Icon 字符50(char(50))
  * 团队编号 UnitID 序号(bigint)
*/
export default class ClassTaskTags {

  /**
   * 任务标签
   * 
   */
  public TagID: number = 0;
  /**
   * 名称
   * 
   */
  public Title: string = "";
  /**
   * 拼音
   * 
   */
  public PY: string = "";
  /**
   * 颜色
   * 
   */
  public Color: string = "";
  /**
   * 图标
   * 
   */
  public Icon: string = "";
  /**
   * 团队编号
   * 
   */
  public UnitID: number = 0;
}