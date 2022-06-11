## Booji.js 开放平台

### 技术
- React Hooks
- Antd/Echarts
- Vite
- Tailwind CSS

### 核心功能
- 新建项目(appKey)
- Issue列表及详情

### Dockerfile说明
```dockerfile
# 使用lts-alpine版本的Node镜像，并设置构建过程为【build】供后面流程使用
FROM node:lts-alpine as build

# 拷贝宿主机当前目录至虚拟机/admin目录（不存在则会自动创建）
COPY . /admin

# 设置虚拟机工作目录（相当于`cd /admin`）
WORKDIR /admin

# 安装依赖并打包
RUN npm install --registry https://registry.npm.taobao.org && npm run build

# 打包后的静态资源托管于 Nginx
# 使用stable-alpine版本的Nginx镜像
FROM nginx:stable-alpine

# 拷贝宿主机的nginx.conf和build阶段生成的dist目录至虚拟机对应目录
COPY --from=build /admin/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /admin/dist /usr/share/nginx/html
```

