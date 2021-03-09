#### myServer

为个人博客、groupup 等应用提供服务支持。

#### 技术栈

express + mongoose + mongodb

#### 可用服务

-   基于 JWT 的、通用的用户注册与登录模块
-   图片上传与压缩服务
-   静态资源管理模块
-   服务于 groupup 的业务模块

#### 部署

本地开发

```bash
node app.js
#或
npm run start
```

线上部署

```bash
# 使用线程守护
npm run forever
```
