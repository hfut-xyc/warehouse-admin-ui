## 介绍
- 本项目是 2020 年 HFUT-CS 数据库课设的前端部分，后端部分代码位于 https://github.com/hfut-xyc/warehouse-admin-service
  
## 开发环境运行
先确保安装了 [Node.js](https://nodejs.org/en/) 最新版本
```
# npm 换源
npm config set registry https://registry.npmmirror.org

# 安装项目依赖
npm install

# 运行项目
npm run serve
```

## 部署运行
```
# 打包项目
npm run build
```

## 技术栈

| 技术       | 说明                         | 官网                              |
| ---------- | ---------------------------- | --------------------------------- |
| Vue        | 前端框架                     | https://cn.vuejs.org/             |
| Vue-Router | 路由框架                     | https://router.vuejs.org/zh/      |
| Element-ui | 前端UI组件框架               | https://element.eleme.cn          |
| Axios      | AJAX请求框架                 | https://github.com/axios/axios    |
| v-charts   | 基于Echarts的图表框架        | https://v-charts.js.org/          |
| Nginx      | 反向代理服务器，前端部署工具 | http://nginx.org/en/download.html |

## 项目运行界面

登录界面
![登录界面](/screenshot/login.png)

仓库信息
![仓库信息](/screenshot/warehouse.png)

