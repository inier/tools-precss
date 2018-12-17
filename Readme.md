## TOOLS-PRECSS

该工具用于CSS框架的通用处理。



### 环境配置

#### 1.安装nodejs

######  1.启用cnpm镜像（http://npm.taobao.org）

npm install cnpm -g --registry=https://registry.npm.taobao.org

>  npm全局安装，最终被安装到C:\Users\Administrator\AppData\Roaming\npm\node_modules\（默认情况下）

#### 2.安装git

#### 3.安装bower

cnpm install -g bower

#### 4.安装gulp

cnpm install gulp --save-dev

#### 一键安装

cnpm install



### 开发部署

1.开发模式： dest/[项目名-版本号-beta]

-gulp deploy
-访问：http://localhost:30000/demo/base.html

-修改src目录中指定项目中的文件，会自动完成热更新。

2.生产模式： dest/[项目名-版本号-dev]

-gulp publish



### 安装报错处理

###### 1. MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”。

错误原因：缺少windows构建插件

解决方法：npm install --global --production windows-build-tools  （全局安装windows构建工具）



