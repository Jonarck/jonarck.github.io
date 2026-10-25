# 建筑视觉语汇实验 · 2026-10-25

本次在用户已认可的玻璃版主页上做视觉实验。个人简介、教育、论文分类与作者身份、项目和博客内容均保持原状。没有提交、推送或部署。

## 查看与保存

- 实验版：http://127.0.0.1:4180/
- 原玻璃版：http://127.0.0.1:4181/
- 研究板与原图档案：http://127.0.0.1:4182/
- 研究板也可直接打开：`tools/ui-preview/architecture-references/index.html`。
- 修改前完整源码：`tools/ui-preview/snapshots/glass-2026-10-25/source/`。
- 修改前冻结的静态站：`tools/ui-preview/snapshots/glass-2026-10-25/preview/`。
- 校验清单与恢复说明：同目录的 `manifest.json`、`RESTORE.txt`。
- 打包备份：`tools/ui-preview/snapshots/glass-2026-10-25.zip`。

备份包含当时未提交的 Astro 迁移文件，不依赖旧 Git HEAD。安全恢复方式是将 `source/` 复制到新目录，再运行 `npm ci` 和 `npm run build`；无需覆盖或删除当前工作区。上述预览、备份与参考照片在已忽略的本地目录中，生产构建不会包含它们。来源元数据单独保存在 `docs/design-studies/architecture-references.json`。

重新启动本地对照服务：

```powershell
node tools/ui-preview/static-server.mjs dist 4180
node tools/ui-preview/static-server.mjs tools/ui-preview/snapshots/glass-2026-10-25/preview 4181
node tools/ui-preview/static-server.mjs tools/ui-preview/architecture-references 4182
```

每行在独立终端运行。实验版代码修改后需重新构建。

## 提取规则

目标是把建筑的比例、光线、材料和结构关系变成一套界面规则。先确定主次，再提取形状：一个主几何构件、一种玻璃材质、一套有规律的留白，以及少量彩色强调。

| 建筑与资料 | 观察依据 | 本次转译 | 约束 |
| --- | --- | --- | --- |
| [朗香教堂，柯布西耶基金会](https://www.fondationlecorbusier.fr/oeuvre-architecture/realisations-chapelle-notre-dame-du-haut-ronchamp-france-1950-1955/) | 厚白墙、深屋盖与尺度不同的彩色开口形成明暗和厚薄对照 | 暖白阅读面、薄亮边、小尺度红蓝赭色光口 | 非均匀形态留给装饰，正文保持稳定可读 |
| [拉图雷特修道院，柯布西耶基金会](https://www.fondationlecorbusier.fr/oeuvre-architecture/realisations-couvent-sainte-marie-de-la-tourette-eveux-sur-larbresle-france-1953-1960/) | 基金会记载 ondulatoires 由不等距竖框形成波动，柯布西耶与泽纳基斯合作设计；照片可观察彩色采光构件 | 首屏玻璃屏的非均匀间距、窄色条、少量几何节奏 | 网页间距是独立设计，不声称复现 Modulor；保持重复的秩序 |
| [京都站官方设计说明](https://www.kyoto-station-building.co.jp/about/history/) | 官方描述中央大厅如谷地，向东西延伸段丘，玻璃与金属覆盖中央中庭 | 扩大两栏间隙，中轴淡线、边缘低对比网格、保留透明材料 | 维持网站导航简洁；大空间的层次通过留白表达 |
| [泽纳基斯档案：Ruled Surfaces](https://www.iannis-xenakis.org/en/ruled-surfaces/) | 飞利浦馆运用直纹曲面；两组直线可生成双曲抛物面 | 首屏原创双曲抛物面、细线网格、半透明壳体与轻阴影 | 原创建模研究，不是飞利浦馆复原；不加自动旋转或持续动画 |

京都站夜景的参考来源为参与项目的 [Lighting Planners Associates](https://www.lighting.co.jp/en/projects/kyoto-station-building/)。朗香补充高清照片来自 [Paul Clemence 的摄影系列](https://www.archdaily.com/1182164/paul-clemences-new-photo-series-explores-light-and-materiality-at-le-corbusiers-ronchamp-chapel)。飞利浦馆历史照片由 [Wouter Hagens 摄于 1958 年](https://commons.wikimedia.org/wiki/File:Expo58_building_Philips.jpg)，按来源页所列 CC BY-SA 3.0 署名。

## 屏幕配色

| 用途 | 色值 |
| --- | --- |
| 页面暖白 | `#F2F0E9` |
| 玻璃的雾绿灰 | `#DCE7DF` |
| 石墨文字 | `#293331` |
| 灰蓝光口 | `#456A86` |
| 陶红光口 | `#A14D40` |
| 赭黄光口 | `#B39554` |

这些色值是依据照片中的色彩关系，为网页对比度、透明叠色和长时间阅读重新配制的颜色。它们不是建筑原始漆色、标准色卡或经过校色测量的结果。研究板中的 70/18/8/4 面积比例是设计控制目标，不是自动提取的像素统计。

## 实施范围

- `src/styles/architecture.css` 独立覆盖玻璃版材料与布局；原 `glass.css` 保留。
- `src/components/ArchitecturalStudy.astro` 构建原创 SVG：曲面 `z=(x²−y²)/2`，两组直线满足 `x+y=c` 与 `x−y=c`，以圆形定义域裁切后投影到二维。
- 首屏替换原圆环构件。暖色玻璃、收紧的圆角、较宽栏间空隙和章节色条应用到现有内容结构。
- 全站继承新材料，支持 light/dark/system。图形为装饰，对辅助技术隐藏，非交互且不影响键盘顺序。
- `prefers-reduced-transparency` 下隐藏几何装饰并恢复不透明背景；保留既有减弱动态效果设置。
- 参考原图仅存在本地研究板，未复制到 `public/`，不增加主页图片请求或生产资源体积。

## 原图档案

`tools/ui-preview/architecture-references/images/` 存放下载的原文件；`references.json` 标注实际像素尺寸、作者、原图地址、来源页、权利说明与 SHA-256。长边不足 1920 px 的图片明确标为辅助参考，没有放大冒充高清。

共收集 13 张原图，6 张长边达到 1920 px，四座建筑均有高清参考。京都站日光网架图为 3072 × 2304 px，见 [Commons 原图来源页](https://commons.wikimedia.org/wiki/File:Kyoto_Station_interior_roof_architecture.jpeg)；原图页将作者推定为 Zuzu，并列出 CC BY-SA 3.0 许可。

官方图库中部分照片没有开放许可；它们仅用于本地视觉研究，未作为网站公开素材。每张图的具体说明见来源清单。

## 验证

- `npm run build`：Astro/TypeScript 零错误、零警告，静态构建成功。
- `npm run verify`：页面、站内链接、图片、元数据、RSS、站点地图与旧 About 地址检查通过。
- 6 个页面 × 6 个屏幕宽度（320–1440 px）：无横向溢出、图片加载正常、导航状态与标题结构正常。
- 检查浅色、深色和手机排版；研究板原图、来源链接及原版本对照可用。
