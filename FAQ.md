### 可能遇到的问题

#### docker拉取iamge过慢
设置国内镜像源，修改`/etc/docker/daemon.json`。
```sh
"registry-mirrors": [
    "https://ustc-edu-cn.mirror.aliyuncs.com/",
    "https://hub-mirror.c.163.com/"
],
```
改完后重启docker:
```sh
service docker restart
```

#### docker-compose up报错：unknown flag: iidfile

版本问题，一开始使用 `pip3 install docker-compose` 安装的版本是`1.29.2`，后来降级成`1.26.2`，命令如下
```sh
sudo pip3 install -U --upgrade pip

pip3 install docker-compose==1.26.2
```

推荐使用以下方式直接安装：
```sh
# 1、下载软件包
curl -L https://github.com/docker/compose/releases/download/1.26.2/docker-compose-`uname -s `-`uname -m` > /usr/local/bin/docker-compose

# 2、添加可执行权限
chmod +x /usr/local/bin/docker-compose

# 3、检查安装
docker-compose -v
```


#### docker-compose up报错："node:lts-alpine AS build" is not a valid repository/tag: invalid reference format
版本问题，centos7默认安装docker版本（1.13.1）过低，需要重新卸载安装：
```sh
# 在这之前可以设置国内镜像
yum install docker-ce
```

#### vite build报错：FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory

node内存溢出导致，可手动增加node内存 [(参考)](https://rollupjs.org/guide/en/#error-javascript-heap-out-of-memory)

> 如果服务器的内存过小比如只有2G，那么增加node内存也几乎没用，可能需要升级服务器...