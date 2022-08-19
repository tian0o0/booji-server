<h1 align="center">Booji Server</h1>
<div align="center">
<img src="https://raw.githubusercontent.com/tian0o0/pic/master/booji.png" width="200">
</div>

<p align="center">为Booji SDK提供服务，支持Docker一键部署</p>

## 服务端：booji-api

> 数据上报、基础服务

- 项目基于`NestJS`搭建
- `MySQL`负责存储项目基础数据，例如`用户、项目、ISSUE`等
- `ElasticSearch`负责存储`EVENT`并提供搜索服务
- 上报数据会经由`Kafka`队列消费后入库，一来可以降低数据库写的压力、二来可以确保数据双写的一致性问题（弱一致性）

## 开放平台：booji-admin

> 新建项目、数据可视化

- 项目基于`React`搭建
- 构建工具链基于`Vite`
- 样式基于`Tailwind CSS`（实践证明，完成一个前端项目甚至不用写一行CSS）

## Docker私有化部署

> 服务基于`docker-compose`进行编排，`Booji`提供以下服务：
> - `booji-mysql`
> - `booji-zookeeper`
> - `booji-kafka`
> - `booji-es`
> - `booji-kibana`
> - `booji-api`
> - `booji-admin`


#### 1.克隆项目
```sh
git clone git@github.com:tian0o0/booji-server.git && cd booji-server
```

#### 2.修改配置

> - 注意修改生产环境地址`VITE_HOST`
> - 其它配置例如`Dockerfile`/`nginx.conf`/`docker-compose.yml`等可根据需要自行修改

#### 3.开启服务
```shell
docker-compose up -d
```

### Reference
[Booji SDK](https://github.com/tian0o0/booji/blob/master/README.md)

