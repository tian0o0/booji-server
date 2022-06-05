## Booji.js服务端

> 项目基于`NestJS + TypeORM + MYSQL`

[Swagger 接口文档地址](http://118.31.127.122/docs)

## 功能

- [x] User模块
- [x] Project模块
- [x] Issue模块
- [x] Event模块
- [x] SourceMap模块

## 记录问题

### 一、Nginx配置
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
