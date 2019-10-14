api-sdk

# 碳素云Api云服务 nodejs-sdk
```typescript
import CreateApi from '@ctsy/api-sdk';
import hook, { HookWhen } from '@ctsy/hook';

const api = CreateApi('appid','secret',usertoken)
hook.regist('im/recv/'+usertoken,HookWhen.After,'recvmsg',(rpc,data)=>{
    //rcp为推送对象
    //data为数据对象
    console.log(data)
})
```