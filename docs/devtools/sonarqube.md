# 在 Windows 10 本机上使用 SonarQube 分析 Python 代码

> 参考文档: [SonarPython](https://docs.sonarqube.org/display/PLUG/SonarPython)

::: warning 所用版本说明
SonarQube-7.3
Sonar-Scanner-3.2.0.1227
MySQl 5.7.23
JDK: 1.8.0_181
:::

## 启动 SonarQube

打开命令行并进入`sonarqube-7.3\bin\windows-x86-64\`目录,然后运行`StartSonar.bat`,当最后一行的最后输出为`SonarQube is up`的时候打开浏览器访问`http://127.0.0.1:9000/`,看到如下界面即说明启动成功:

![SonarQube-about](/imgs/sonarqube-about.png)

然后使用账号/密码`admin/admin`登陆出现如下页面(弹出窗点skip):

![SonarQube-Projects](/imgs/sonarqube-projects.png)

然后就可以退出用户并`Ctrl+C`结束程序程序了.

## 配置数据库(这里使用的是MySQL)

首先创建一个名为`sonar`的数据库.

然后打开`sonarqube-7.3\conf\sonar.properties`文件,将`sonar.jdbc.url=jdbc:mysql:....`那一行取消注释,并在下面添加:

```
sonar.jdbc.username=你的数据库用户名
sonar.jdbc.password=对应的密码
sonar.sourceEncoding=UTF-8
```

然后再次运行`StartSonar.bat`并登录`admin`.然后安装如下步骤安装汉化包:

![install-chinese-pack](/imgs/install-chinese-pack.png)

安装完后重启`SonarQube`并重新登录.

## 配置 Sonar Scanner

打开`sonar-scanner-3.2.0.1227-windows\conf\`文件夹下的`sonar-scanner.properties`文件并将以下两行取消注释:

```
sonar.host.url=http://localhost:9000
sonar.sourceEncoding=UTF-8
```

然后将`Sonar-Scanner`的`bin`目录添加到环境变量(添加后可以使用`sonar-scanner -v`验证).

然后在需要分析的Python项目的根目录创建一个`sonar-project.properties`文件并输入以下内容:

```
# must be unique in a given SonarQube instance
sonar.projectKey=flaskmovie
# this is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
sonar.projectName=Flask Movie
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
# This property is optional if sonar.modules is set.
sonar.sources=./

sonar.language=py

sonar.sourceEncoding=UTF-8

```

然后在项目根目录下运行`sonar-scanner`即可.

运行完毕之后便可到页面中查看分析结果.
