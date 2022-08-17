<h1 align="center">Booji Server</h1>
<div align="center">
<img src="https://raw.githubusercontent.com/tian0o0/pic/master/booji.png" width="80">
</div>

<p align="center">为Booji SDK提供服务，支持Docker一键部署</p>

### 特性

#### 1.booji-api（服务端）

> `Nest.js + MySql + Kafka + ElasticSearch`

- 数据上报.
- 基础服务.

#### 2.booji-admin（开放平台）

> `React Hooks + Vite + Tailwind CSS`

- 新建项目（appKey）
- 数据可视化

#### 3.私有化部署

> 首先需要安装Docker


克隆本项目:
```sh
git clone git@github.com:tian0o0/booji-server.git && cd booji-server
```
> - 注意修改生产环境地址`VITE_HOST`
> - 其它配置例如`Dockerfile`/`nginx.conf`/`docker-compose.yml`等可根据需要自行修改

进入项目后仅需一行命令即可完成部署:
```shell
docker-compose up -d
```



### Reference
[Booji SDK](https://github.com/tian0o0/booji/blob/master/README.md)

