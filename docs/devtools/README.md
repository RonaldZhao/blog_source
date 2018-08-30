# Win10 安装 Chocolatey 和 Vim

> 参考: [Installing Chocolatey](https://chocolatey.org/install#install-with-powershellexe)

## 说明

::: tip 安装环境
OS: windows 10 专业版 1803(OS Build 17134.228)
终端: PowerShell 2.0(在`控制面板->程序->启用或关闭xxx`中开启)
:::

::: warning 注意
请使用管理员权限打开PowerShell
:::

## 安装Chocolatey

1. 打开`PowerShell`后请先执行`Get-ExecutionPolicy`确保返回的不是`Restricted`, 如果是请执行`Set-ExecutionPolicy AllSigned`或`Set-ExecutionPolicy Bypass -Scope Process`.

2. 拷贝如下命令并执行:

```bash
PS C:\Windows\system32> Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
Getting latest version of the Chocolatey package for download.
Getting Chocolatey from https://chocolatey.org/api/v2/package/chocolatey/0.10.11.
Downloading 7-Zip commandline tool prior to extraction.
Extracting C:\Users\xxx\AppData\Local\Temp\chocolatey\chocInstall\chocolatey.zip to C:\Users\zzgda\AppData\Local\Temp\chocolatey\chocInstall...
Installing chocolatey on this machine
Creating ChocolateyInstall as an environment variable (targeting 'Machine')
  Setting ChocolateyInstall to 'C:\ProgramData\chocolatey'
WARNING: It's very likely you will need to close and reopen your shell
  before you can use choco.
Restricting write permissions to Administrators
We are setting up the Chocolatey package repository.
The packages themselves go to 'C:\ProgramData\chocolatey\lib'
  (i.e. C:\ProgramData\chocolatey\lib\yourPackageName).
A shim file for the command line goes to 'C:\ProgramData\chocolatey\bin'
  and points to an executable in 'C:\ProgramData\chocolatey\lib\yourPackageName'.

Creating Chocolatey folders if they do not already exist.

WARNING: You can safely ignore errors related to missing log files when
  upgrading from a version of Chocolatey less than 0.9.9.
  'Batch file could not be found' is also safe to ignore.
  'The system cannot find the file specified' - also safe.
chocolatey.nupkg file not installed in lib.
 Attempting to locate it from bootstrapper.
PATH environment variable does not have C:\ProgramData\chocolatey\bin in it. Adding...
WARNING: Not setting tab completion: Profile file does not exist at 'C:\Users\xxx\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1'.
Chocolatey (choco.exe) is now ready.
You can call choco from anywhere, command line or powershell by typing choco.
Run choco /? for a list of functions.
You may need to shut down and restart powershell and/or consoles
 first prior to using choco.
Ensuring chocolatey commands are on the path
Ensuring chocolatey.nupkg is in the lib folder
PS C:\Windows\system32> choco
Chocolatey v0.10.11
Please run 'choco -?' or 'choco <command> -?' for help menu.
PS C:\Windows\system32> # 输出如上则说明安装成功
```

## 安装Vim

> 当提示输入的时候输入`Y`然后回车即可.

```bash
PS C:\Windows\system32> choco install vim
Chocolatey v0.10.11
Installing the following packages:
vim
By installing you accept licenses for the packages.
Progress: Downloading vim 8.0.604... 100%

vim v8.0.604 [Approved]
vim package files install completed. Performing other installation steps.
The package vim wants to run 'chocolateyInstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[N]o/[P]rint): Y

Downloading vim
  from 'https://sourceforge.net/projects/cream/files/Vim/8.0.604/gvim-8-0-604.exe/download'
Progress: 100% - Completed download of C:\Users\xxx\AppData\Local\Temp\chocolatey\vim\8.0.604\vimInstall.exe (9.22 MB).
Download of vimInstall.exe (9.22 MB) completed.
Installing vim...
vim has been installed.
Adding the vim installation directory to PATH …
PATH environment variable does not have C:\Program Files (x86)\vim\vim80 in it. Adding...
  vim may be able to be automatically uninstalled.
Environment Vars (like PATH) have changed. Close/reopen your shell to
 see the changes (or in powershell/cmd.exe just type `refreshenv`).
 The install of vim was successful.
  Software installed as 'exe', install location is likely default.

Chocolatey installed 1/1 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
PS C:\Windows\system32>
```

安装完毕后需要重新启动`PowerShell`.

## 验证

```bash
PS C:\Windows\system32> choco list --localonly
Chocolatey v0.10.11
chocolatey 0.10.11
vim 8.0.604
2 packages installed.
PS C:\Windows\system32> vim --version
# 这里会输出一大堆版本相关信息, 但是不重要, 有就OK
PS C:\Windows\system32>
```

**Done!, Have fun.**
