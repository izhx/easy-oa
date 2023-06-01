<p align="center">
  <picture>
    <img alt="EasyOA Logo" src="resources/assets/easyoa-128.png" width="48" height="48" style="max-width: 100%;">
  </picture>
  <br/>
</p>


# EasyOA

每天阅读论文，经常各种pdf链接满天飞，很头疼。根据自己的需求，编写了 `EasyOA` 插件，它可以：
1. PDF页面重命名为论文标题，方便标签页管理和搜索，让你的历史记录和 [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) 页面更清爽；
2. 单击图标返回摘要页，摆脱手动修改URL。

Reading papers every day, I often receive various PDF links, which can be quite overwhelming. To meet my own needs, I developed the `EasyOA` plugin, which can:
1. Rename PDF pages with the paper title for easier tab management and searching, make your browser history and [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) page clean.
2. Return to the abstract page with a single click on the icon, eliminating the need for manually modifying the URL.


<p align="center">
  <picture>
    <img alt="English Demo" src="https://user-images.githubusercontent.com/26690193/230275829-f3655b7b-8676-4c85-87af-7f8113f394c4.png" style="max-width: 100%;">
  </picture>
  <br/>
</p>


目前支持的OA网站有 / Currently supported OA websites:
- arxiv.org
- openreview.net
- aclantology.org
- openaccess.thecvf.com
- proceedings.mlr.press
- papers.nips.cc


可能的开发计划 / Possible future developments:
1. Download PDF with custom filename in the abstract page.
2. link arxiv for abstract pages on ojs.aaai.org.
3. Edge & Firefox.


## 安装 / Install

Chrome 应用商店链接 [EasyOA](https://chrome.google.com/webstore/detail/easyoa/bggnhcjegnfpaepmdfojmfhgocleiohm).

可以在 [release](https://github.com/izhx/easy-oa/releases) 页面下载 `crx文件` 手动安装最新版本。

> 如果要 debug 或者贡献代码，可以下载或克隆到本地，以开发者模式手动安装，参见 [How to install the unpacked extension in Chrome](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/) (安装时选择本项目下的 `./chrome` 文件夹).

Chrome app store link [EasyOA](https://chrome.google.com/webstore/detail/easyoa/bggnhcjegnfpaepmdfojmfhgocleiohm).

You can download `crx file` from the [release](https://github.com/izhx/easy-oa/releases) page and install the latest version manually.

> For debugging or contributing, you can clone it to your local machine and install it in developer mode.
Refer to [How to install the unpacked extension in Chrome](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/) (select the `./chrome` folder of this repo).


## 致谢 / Acknowledgments

Some lines are borrowed from [j3soon/arxiv-utils](https://github.com/j3soon/arxiv-utils), many thanks!
