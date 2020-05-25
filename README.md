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

## 站点管理模块【查询可以不登录，修改和添加必须登录后】
1. 每个应用下必须先存在至少一个站点，
2. 每个站点可以配置多个 展示点/橱窗柜 ，一般在开发阶段已经确定好有哪些展示点了，程序启动后通过search接口查询展示配置后显示相关内容并作出逻辑处理
3. 每个展示点支持多个展示内容，

[2.0.113]
新增 站点管理模块，具体文档请参看：https://www.yuque.com/fbfmru/qcllb6/iwn8ag

[2.0.109]
新增 Art.AuthorApi 用于讲师的部分信息的操作，支持adds/save接口
新增 Art.ArtExtendLive 用于描述音视频等信息类型，直播或录播或回放都依赖这个，其操作接口同Art.ArtApi.save

[2.0.108]

[2020-05-19] 用户账户模块 更新 注册接口增加Contacts参数，用于在注册时创建该用户的联系信息数据


# 签名方式

> 应用编号AppID:123456，应用Key：654321，密钥：xkf0i90f2i9fw，请求路径为：/_art/Art/rule

1. 获取 随机数 时间戳:1590131414213
2. 顺序拼接 随机数(1590131414213),请求路径(/_art/Art/rule),密钥(xkf0i90f2i9fw),请求内容({}) 生成签名主体: 
3. 1590131414213/_art/Art/rulexkf0i90f2i9fw{}
4. 用 应用编号AppID(123456),应用Key(654321),时间戳(1590131414213),签名主体md5(XXX)
5. 生成签名内容:123456_654321_1590131414213_c79e216462f1e08637ab833b3e4c0eac
6. 放置于请求头部auth中

