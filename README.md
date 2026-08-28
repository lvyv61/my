# 个人作品集网站

一个开箱即用、零依赖的个人作品集单页网站。纯 HTML / CSS / JavaScript 编写，无需安装任何依赖或构建工具，改完内容刷新就能预览，部署到任意静态托管平台即可上线。

## 功能

- 深色 / 浅色主题切换（自动记忆你的偏好）
- 响应式布局，适配手机、平板与桌面
- 杂志画廊式作品墙：非对称错落布局、展签式图文卡片、分类筛选
- 作品灯箱：点击卡片弹出大图，支持左右切换与键盘操作（Esc / 方向键）
- 丰富动效：Hero 逐字浮现、滚动进度条、章节文字模糊浮现、统计数字滚动计数、
  滚动字幕带、鼠标柔光、按钮扫光、返回顶部
- 所有动效均尊重系统的「减少动态效果」设置，触屏设备自动简化
- 联系表单（提交后调用你的邮件客户端）
- 内容集中配置：个人信息与作品都在 `js/main.js` 顶部，一处修改、全站生效

## 目录结构

```text
.
├── index.html          # 页面结构
├── css/style.css       # 全部样式（主题变量、响应式、动画）
├── js/main.js          # 配置 + 交互（改这里的内容）
└── assets/favicon.svg  # 站点图标
```

## 自定义

### 1. 个人信息

打开 `js/main.js`，修改文件顶部的 `CONFIG` 对象：

- `name` / `initials`：你的名字与首字母（头像占位）
- `role`、`intro`、`bio2`、`tagline`：职业头衔与自我介绍
- `email`：联系邮箱（导航中的邮箱按钮和表单都会自动使用它）
- `stats`、`skills`、`tools`、`socials`：数据、技能、工具与社交链接

### 2. 作品

修改 `PROJECTS` 数组即可增删作品。每个作品支持：

| 字段 | 说明 |
| --- | --- |
| `title` | 作品名称 |
| `category` | 分类，用于筛选按钮 |
| `year` | 年份 |
| `desc` | 一句话介绍 |
| `tags` | 标签数组 |
| `cover` | 封面：可以是渐变（如 `"linear-gradient(135deg, #ff9a62, #ff5e7a)"`），也可以是图片路径（如 `"assets/photo.jpg"`） |
| `link` | 案例链接；留空 `""` 则卡片不可点击 |

### 3. 头像与照片

当前头像为姓名首字母圆形，无需图片。想换成真实照片时，可以把 `index.html` 中

```html
<div class="avatar" id="avatar" aria-hidden="true">LY</div>
```

替换为 `<img class="avatar" src="assets/avatar.jpg" alt="我的照片">`，并在 `style.css` 中给 `.avatar` 去掉文字样式即可。

### 4. 站点图标

把 `assets/favicon.svg` 换成你自己的 SVG，或替换为 `favicon.png` / `favicon.ico` 并同步修改 `index.html` 中的引用。

## 本地预览

任选一种方式（推荐前两种，能正确加载样式与脚本）：

- Python：在项目目录运行 `python -m http.server 8000`，然后访问 <http://localhost:8000>
- VS Code：安装 Live Server 插件，右键 `index.html` → Open with Live Server
- Node.js：运行 `npx serve .`

直接双击打开 `index.html` 也可以浏览，但部分浏览器可能限制本地脚本加载，建议使用上面的本地服务器方式。

## 部署

- **GitHub Pages**：把代码推送到 GitHub 仓库，在 Settings → Pages 中选择分支即可
- **Netlify**：登录 <https://app.netlify.com/drop>，直接把整个文件夹拖进去
- **Vercel**：导入仓库后按默认配置部署
- 也可以部署到任意支持静态文件的服务器（Nginx、OSS 等）

部署后记得把 `CONFIG.email` 和 `socials` 换成真实联系方式。
