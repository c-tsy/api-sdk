api-sdk

# 碳素云Api云服务 nodejs-sdk
```typescript
import create, { ApiConfig } from '@ctsy/api-sdk'
// 方式1
ApiConfig.AppID = 'tsy'
ApiConfig.Secret = 'dxzef23d2dxs1';
ApiConfig.Key = '3F3fw24F5e5'
//可以手动指定Api服务地址，默认为https://v1.api.tansuyun.cn
ApiConfig.Host = 'http://localhost:3000'
// 方式二
create('tsy','3F3fw24F5e5','dxzef23d2dxs1','rand内容(有rand情况下secret为rand与secret组合后字典序排序内容)')

// 此处的Secret和Key均为不正确的，请联系工作人员申请
```