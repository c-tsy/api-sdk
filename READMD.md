api-sdk

# 碳素云Api云服务 nodejs-sdk
```typescript
ApiConfig.AppID = "你的AppID";
ApiConfig.Secret = "你的Secret经过MD5加密后的内容";
ApiConfig.UserToken = "当前操作人的用户Token，";
const a = new IM.One();
(async () => {
    try {
        let rs = await a.send("接收人的用户ID","内容" )
        let rs = await a.read(1, 10, '接收人的用户ID')
        console.log(JSON.stringify(rs))
        debugger
    } catch (error) {
        debugger
    }
})()
```