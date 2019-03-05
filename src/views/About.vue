<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>id is {{id}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MvvmObj from '../mvvm-test';

@Component
export default class About extends Vue {
  @Prop(String) private id!: string;

  private sss: string = `
    想要在vscode里面显示我的git信息，git-bash就可以显示，但是觉得不够美观，
    在学习vscode的功能时，看到别人的集成终端是这样的，心向往之，决定也要搞一个，记录一下历程

    用的电脑是淘宝上组的，系统是windows7的，已经内置了powershell2.0，
    查看poweshell版本使用 $PSVersionTable.PSVersion 命令，
    除了上述命令外，也可在命令行中输入Get-Host | Select-Object Version 命令查看当前版本号
    需要更新到poweshell3.0+，下载地址如下
    http://download.microsoft.com/download/E/7/6/E76850B8-DA6E-4FF5-8CCE-A24FC513FD16/Windows6.1-KB2506143-x64.msu
    更新完powershell后需要安装psget，这个是PowerShell搜索安装模块的工具，下载步骤如下
    1.打开powershell，输入如下命令 Set-ExecutionPolicy RemoteSigned
    2.直接执行安装代码，(new-object Net.WebClient).DownloadString("http://psget.net/GetPsGet.ps1") | iex
    ----
    https://github.com/PowerShell/PowerShell

    windows系统限制，最高可以升到4.0，下载4.0版本，
    （https://www.microsoft.com/zh-CN/download/details.aspx?id=40855），
    点击下载，选择下载Windows6.1-KB2819745-x64-MultiPkg.msu

    https://github.com/JanDeDobbeleer/oh-my-posh
    iex ((new-object net.webclient).DownloadString(
    'https://raw.githubusercontent.com/pecigonzalo/Oh-My-Posh/master/install.ps1'))

    https://www.microsoft.com/en-us/download/details.aspx?id=51451
    下载了PackageManagement_x64.msi

    之后再运行
    我认为是poweshellGet并没有集成在我的powershell里面，但是我通过命令下载报500错误，
    网上也没找到解决方案，于是去到powershell的github，找到poweshellGet

    Install-Module posh-git -Scope CurrentUser -AllowPrerelease -Force

    下载终于完成了，我们可以手动启动oh-my-posh，命令如下
    Import-Module oh-my-posh，就会变成如下图这个样子了

    当然你必须安装了git，在此不多赘述

    但这只是手动创建，我们想让其自动化，我们可以输入 $profile 可以得到如下信息，
    这是配置文件的路径，编辑该文件，如果文件不存在就手动创建一个，在其中输入
    Import-Module oh-my-posh

    因为我们缺少专用的字体
    这跟目标还差一步就是设置主题Set-Theme Agnoster
    字体，选择powerline，https://github.com/powerline/fonts

    Install-Module oh-my-posh -Scope CurrentUser

    下载之后有的字体显示不出来，我以前用过连体字在这个电脑并没有配置。
    想着是不是这个问题，下了一个Fira Code字体
    https://github.com/tonsky/FiraCode


    npm install -g posh-git

    下载scoop
    更改脚本执行策略

    以管理员身份运行powershell
    允许执行任何脚本
    Set-ExecutionPolicy Bypass

    Install-Module posh-git -Scope CurrentUser
    Install-Module oh-my-posh -Scope CurrentUse

    安装和配置wmf5.1
    https://docs.microsoft.com/zh-cn/powershell/wmf/5.1/install-configure
  `;

  /**
   * mounted
   */
  public mounted() {
    function callback(newValue: any, oldValue: any) {
      console.log(newValue, oldValue);
    }
    const data = {
      a: 200,
      level1: {
        b: 'str',
        c: [1, 2, 3],
        level2: {
          d: 90,
        },
      },
    };
    const mv: MvvmObj = new MvvmObj(data, callback);

    data.a = 300;
    data.level1.b = 'sssss';
    data.level1.level2.d = 888;
    data.level1.c.push(4);
  }
}
</script>

