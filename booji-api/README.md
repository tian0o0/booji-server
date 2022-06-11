## Booji.js服务端

### 技术
- NestJS
- TypeORM
- MySql
- Kafka
- ElasticSearch
- JWT
- PM2

### 核心功能
- [x] 数据上报
- [x] User模块
- [x] Project模块
- [x] Issue模块
- [x] Event模块
- [x] SourceMap模块
- [x] Search模块
- [x] Tag模块
- [ ] performance模块

### Dockerfile说明
```dockerfile
# 使用lts版本的Node镜像（注意：不使用更加轻量的alpine版本是因为agron2模块依赖python3，而alpine版本不包含python3）
FROM node:lts

# 拷贝宿主机当前目录至虚拟机/api目录（不存在则会自动创建）
COPY . /api

# 设置虚拟机工作目录（相当于`cd /api`）
WORKDIR /api

# 安装依赖及打包
RUN npm i -g @nestjs/cli pm2 --registry https://registry.npm.taobao.org \
  && npm install --registry https://registry.npm.taobao.org \
  && npm run build

# CMD表示容器启动时运行，开启后端服务
CMD npm run start
```

### 记录问题

#### 一、Nginx配置
1. 自定义日志格式

```nginx
http {
  // 取消注释下方Nginx默认配置，增加 $request_time 用于记录请求时间
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                     '"$http_user_agent" "$http_x_forwarded_for" $request_time';
  
  access_log  /usr/local/var/log/nginx/access.log  main;
}
```

2. 反向代理
```nginx
// 访问 `http://localhost/booji` 会代理至Booji的接口服务
// 设置自定义请求头`X-Real-IP`用于在接口服务中获取用户ip
// 设置接口访问的日志存放位置
server {
  listen 80;
  server_name localhost;
  location /booji {
    proxy_pass http://127.0.0.1:3333/booji;
    proxy_set_header X-Real-IP $remote_addr;
    access_log /usr/local/var/log/nginx/booji.access.log  main;
}
```
