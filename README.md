# 归潮群岛：雾海来信

THE LETTERS BETWEEN TIDES

**[点击开始游玩](https://jijie616.github.io/-/)**

一款在浏览器中游玩的原创三维叙事冒险。电脑使用键盘与鼠标，手机使用触屏摇杆、交互按钮与手势。无需登录游戏账号，每位玩家有自己的本地进度。

本仓库保存经过构建的公开游玩版本，可用于 GitHub Pages 或 Render Static Site。发布文件位于 `docs/`，模型和图片均随站点提供，不依赖 ChatGPT 登录。

## GitHub Pages 发布

在仓库的 Settings → Pages 中选择 Deploy from a branch，然后选择 `main` 分支与 `/docs` 文件夹。保存并等候部署完成后，将 Pages 提供的网址分享给朋友。

## Render 发布

在 Render 新建 Static Site 并连接本仓库。Build Command 填写 `node tools/verify-static.mjs`，Publish Directory 填写 `docs`。也可用仓库里的 `render.yaml` 创建 Blueprint。选择静态网站服务即可，无需数据库或运行游戏服务器。

## 手机和电脑

电脑可使用新版 Edge、Chrome 或 Safari；iPhone 建议使用 Safari，安卓建议使用新版 Chrome 或系统浏览器。请在完整浏览器里打开链接。三维场景的流畅度取决于设备与浏览器，老旧设备可能无法运行。

## 存档接续

进度自动保存在当前设备的当前浏览器里。换网址、换浏览器或换设备前，在游戏设置中「导出航行存档」，再到新网址的设置中导入文件。新旧网址不会自动共享存档，也没有云端同步。无需把自己的存档发送给其他玩家。

## 内容版本

包含完整寻母主线、三种灯网选择、第一篇隐藏尾声、拾得记录、推理手记和存档保护。发布文件不含玩家的存档、回信或私人手记。

运行 `node tools/verify-static.mjs` 可核对全部发布文件与相对路径。第三方许可见 `docs/THIRD_PARTY_NOTICES.txt`。
