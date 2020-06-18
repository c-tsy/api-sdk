/**
  * 设备当前信息 DeviceData
  * DID DID 自增(bigint)
  * 当前数据 Current JSON(JSON)
  * UTime UTime 序号(bigint)
  * 期望数据 Expect JSON(JSON)
*/
export default class DeviceData{
        
    /**
     * DID
     * 
     */
    public DID:number=0;    
    /**
     * 当前数据
     * 
     */
    public Current:any=0;    
    /**
     * UTime
     * 
     */
    public UTime:number=0;    
    /**
     * 期望数据
     * 
     */
    public Expect:any=0;
}