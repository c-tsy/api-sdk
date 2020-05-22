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

# 一些注意事项
## 文章模块
1. 若需要针对文章进行多级的结构划分，请使用文章的Classify对象进行树形管理，其分类类型为1，文章中允许通过设定CID来关联到该分类上

[2.0.109]
新增 Art.AuthorApi 用于讲师的部分信息的操作，支持adds/save接口
新增 Art.ArtExtendLive 用于描述音视频等信息类型，直播或录播或回放都依赖这个，其操作接口同Art.ArtApi.save

[2.0.108]

[2020-05-19] 用户账户模块 更新 注册接口增加Contacts参数，用于在注册时创建该用户的联系信息数据