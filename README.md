# Mindful Mind - 心靈健康助手

一個全面的心理健康和正念應用程式，提供 AI 驅動的對話支持、情緒追蹤、冥想練習等功能。

## ✨ 主要功能

- 🤖 **AI 心理健康助手** - 使用 Groq API (Llama 3.1) 提供 24/7 情緒支持和建議
- 💙 **情緒追蹤** - 記錄和分析你的每日心情，了解情緒模式
- 🧘 **冥想與呼吸練習** - 引導式冥想和呼吸練習，幫助放鬆身心
- 📖 **每日日記** - 記錄生活點滴，培養感恩心態
- 📊 **數據分析儀表板** - 視覺化你的心理健康趨勢
- 📚 **資源庫** - 豐富的心理健康文章、音頻和影片資源

## 🛠️ 技術棧

### 前端
- React 18
- React Router v6
- Tailwind CSS
- Recharts (數據視覺化)
- Lucide React (圖標)
- Framer Motion (動畫)
- Vite (建構工具)

### 後端
- Node.js + Express
- Groq SDK (AI 對話)
- CORS 支持

### 數據存儲
- LocalStorage (前端數據持久化)

## 🚀 快速開始

### 前置需求

- Node.js 18+
- npm 或 yarn

### 安裝

1. **克隆專案**
```bash
cd mindful-mind-app
```

2. **安裝依賴**
```bash
npm install
```

3. **配置環境變數**
```bash
cp .env.example .env
# 編輯 .env 文件，添加你的 Groq API 密鑰（已預設）
```

### 開發模式運行

**同時啟動前端和後端：**
```bash
npm run dev
```

這會啟動：
- 前端開發服務器：http://localhost:3000
- 後端 API 服務器：http://localhost:3001

**或分別啟動：**
```bash
# 終端 1 - 前端
npm run dev:client

# 終端 2 - 後端
npm run dev:server
```

### 生產環境建構

```bash
# 建構前端
npm run build

# 啟動生產服務器
npm start
```

## 📁 專案結構

```
mindful-mind-app/
├── src/                      # 前端源碼
│   ├── components/           # React 組件
│   │   └── Layout.jsx       # 主要佈局組件
│   ├── pages/               # 頁面組件
│   │   ├── Home.jsx         # 登入/首頁
│   │   ├── Dashboard.jsx    # 儀表板
│   │   ├── Chat.jsx         # AI 對話頁面
│   │   ├── MoodTracker.jsx  # 情緒追蹤
│   │   ├── Meditation.jsx   # 冥想練習
│   │   ├── Journal.jsx      # 日記
│   │   └── Resources.jsx    # 資源庫
│   ├── App.jsx              # 主應用組件
│   ├── main.jsx             # 應用入口
│   └── index.css            # 全局樣式
├── server/                   # 後端源碼
│   └── index.js             # Express 服務器 + Groq API
├── public/                   # 靜態資源
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── package.json             # 依賴和腳本
```

## 🔑 API 端點

### POST `/api/chat`
發送消息給 AI 助手

**請求體：**
```json
{
  "messages": [
    { "role": "user", "content": "我感到焦慮" }
  ]
}
```

**響應：**
```json
{
  "message": "我理解你的感受..."
}
```

### GET `/api/health`
健康檢查端點

**響應：**
```json
{
  "status": "ok",
  "message": "Mindful Mind API is running"
}
```

## 🎨 UI/UX 特色

- 🎨 **精美漸變設計** - 使用柔和的紫色、藍色、粉色漸變
- 💎 **毛玻璃效果** - 現代化的 glassmorphism 設計
- 📱 **完全響應式** - 適配所有設備尺寸
- ✨ **流暢動畫** - 使用 Framer Motion 和 CSS 動畫
- 🌈 **直觀導航** - 清晰的側邊欄和頂部導航

## 🔐 隱私與安全

- ✅ 所有用戶數據存儲在瀏覽器本地（LocalStorage）
- ✅ 不會上傳個人數據到服務器
- ✅ AI 對話通過安全的 HTTPS 連接
- ⚠️ 本應用不能替代專業醫療服務

## 🌐 部署

### Vercel 部署（推薦）

1. 安裝 Vercel CLI
```bash
npm i -g vercel
```

2. 部署
```bash
vercel
```

3. 配置環境變數
在 Vercel 項目設置中添加：
- `GROQ_API_KEY`

### 其他平台

可部署到：
- Netlify
- Railway
- Render
- Heroku

**注意：** 需要支持 Node.js 服務器的平台（前後端一起部署）或分別部署前後端。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## ⚠️ 免責聲明

本應用僅供參考和自我照顧使用，不能替代專業的心理健康服務。如果你正經歷嚴重的心理健康問題，請尋求專業協助。

### 緊急求助專線（台灣）

- 全國自殺防治專線：**1925**
- 生命線：**1995**
- 張老師專線：**1980**

## 👨‍💻 作者

使用 ❤️ 和 Claude Code 創建

---

**開始照顧你的心靈健康吧！** 🌸
