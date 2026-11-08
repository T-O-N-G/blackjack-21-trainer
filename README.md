# Blackjack Lab · 21点练习室

[English](README.en.md) | 简体中文

一个简洁的 Blackjack（二十一点）学习与训练网页，帮助你理解基础策略，并练习每一次决策。无需安装依赖，不涉及真钱。

![Blackjack Lab 英文界面：牌桌、策略提示和训练记录](Screenshot.jpg)

## 开始使用

下载或克隆本仓库，双击根目录的 [`index.html`](index.html) 即可在浏览器中游玩，无需服务器或联网。

## 功能

- **学习模式**：完整模拟牌局，提示基础策略及理由，支持要牌、停牌、加倍和分牌。
- **训练模式**：先选择再看解析，记录正确率、决策次数和连续答对次数，支持错题复习。
- **中英文切换**：右上角切换 English / 中文，切换时保留当前牌局和训练进度。
- **本地持久化**：语言偏好和训练记录保存在浏览器的 localStorage 中。首次打开使用浏览器首选语言，中文显示中文，其余显示英文；之后优先恢复手动选择的语言。

语言偏好使用 `bj-lab-language-v1`，训练记录使用 `bj-lab-v1`。重置训练记录不会清除语言偏好。清除浏览器数据会删除记录；浏览器限制本地文件存储时，持久化可能不可用。

## 练习规则

6 副牌，每局重洗；庄家软 17 停牌（S17）；美式底牌，先查 Blackjack；首两张可加倍，分牌后可加倍；最多 4 手；分 A 后只补一张且不再分；无投降和保险。Blackjack 赔付 3:2，分牌后的 21 按普通 21 计算。

训练模式每题评估一次决策，不以单局输赢判断策略。基础策略旨在改善长期期望结果，不能保证获胜。

策略参考：[Wizard of Odds · 4–8 副牌基础策略](https://wizardofodds.com/games/blackjack/strategy/4-decks/)（S17，无投降）。

## 项目文件

- `index.html`：内联 CSS 和 JavaScript 的独立本地版本。
- `dist/index.html`：引用独立资源的页面。
- `dist/style.css`：页面样式。
- `dist/game.js`：游戏逻辑、基础策略和训练记录。
- `dist/i18n.js`：中英文翻译和语言偏好。

修改 `dist/` 后，需要将 CSS、`i18n.js` 和 `game.js` 重新内联到根目录 `index.html`，保持两个版本同步。

## Contributors

- [T-O-N-G](https://github.com/T-O-N-G) — 项目创意、需求与反馈。
- Codex (OpenAI) — AI 编程助手，参与实现、界面迭代、翻译与验证。
