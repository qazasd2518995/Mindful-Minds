# Vercel 環境變數設定指南

## 🎯 為什麼需要設定環境變數？

你的應用需要這些敏感資訊才能運作：
- **Groq API Key**: 用於 AI 對話功能
- **AWS 憑證**: 用於 DynamoDB 數據庫連接

為了安全，這些資訊不能直接寫在代碼中，而是要通過環境變數傳遞。

## 📝 需要設定的環境變數

| 變數名 | 用途 | 值 |
|--------|------|-----|
| `GROQ_API_KEY` | Groq AI API 密鑰 | (從 .env 複製) |
| `AWS_REGION` | AWS 區域 | `ap-southeast-2` |
| `AWS_ACCESS_KEY_ID` | AWS 存取金鑰 ID | (從 .env 複製) |
| `AWS_SECRET_ACCESS_KEY` | AWS 秘密存取金鑰 | (從 .env 複製) |
| `PORT` | 服務器端口 | `3001` |

## 🌐 方法 1：通過 Vercel 網頁界面（推薦）

### 步驟 1：登入 Vercel
1. 訪問 https://vercel.com/
2. 使用 GitHub 帳號登入

### 步驟 2：找到你的專案
1. 進入 Dashboard
2. 找到並點擊 `Mindful-Minds` 專案

### 步驟 3：進入設定頁面
1. 點擊頂部的 **Settings** 標籤
2. 在左側選單找到 **Environment Variables**

### 步驟 4：添加環境變數
對於每個環境變數：
1. 點擊 **Add New** 按鈕
2. 輸入變數名（例如：`GROQ_API_KEY`）
3. 輸入變數值（從你的 `.env` 文件複製）
4. 選擇環境：✅ **全選** (Production, Preview, Development)
5. 點擊 **Save**

重複以上步驟，直到添加完所有 5 個環境變數。

### 步驟 5：重新部署
1. 點擊頂部的 **Deployments** 標籤
2. 找到最新的部署
3. 點擊右側的 "..." 選單
4. 選擇 **Redeploy**
5. 等待部署完成（約 2-3 分鐘）

## 💻 方法 2：使用 Vercel CLI

```bash
# 安裝 Vercel CLI（如果還沒安裝）
npm install -g vercel

# 登入
vercel login

# 進入專案目錄
cd /Users/justin/SDGS/mindful-mind-app

# 連結專案
vercel link

# 設定環境變數
vercel env add GROQ_API_KEY production
# 貼上值後按 Enter

vercel env add AWS_REGION production
# 輸入: ap-southeast-2

vercel env add AWS_ACCESS_KEY_ID production
# 貼上值後按 Enter

vercel env add AWS_SECRET_ACCESS_KEY production
# 貼上值後按 Enter

vercel env add PORT production
# 輸入: 3001

# 為 Preview 和 Development 環境複製相同設定
vercel env pull
```

## ✅ 驗證設定是否成功

部署完成後，測試以下功能：

### 1. 測試健康檢查
訪問：`https://your-app-url.vercel.app/api/health`

應該看到：
```json
{
  "status": "ok",
  "message": "Mindful Mind API is running"
}
```

### 2. 測試用戶註冊
使用瀏覽器開發者工具或 Postman：
```bash
POST https://your-app-url.vercel.app/api/user
Content-Type: application/json

{
  "username": "TestUser"
}
```

應該返回：
```json
{
  "success": true,
  "username": "TestUser"
}
```

### 3. 測試 AI 對話
在應用中進入 Chat 頁面，發送消息測試 AI 回應。

## 🚨 常見問題排查

### 問題 1：500 錯誤 - "The security token included in the request is invalid"
**原因**: AWS 憑證未設定或設定錯誤

**解決方法**:
1. 檢查 Vercel 環境變數是否正確設定
2. 確保變數名稱完全匹配（大小寫敏感）
3. 重新部署應用

### 問題 2：AI 對話無回應
**原因**: Groq API Key 未設定

**解決方法**:
1. 檢查 `GROQ_API_KEY` 是否設定
2. 確認 API Key 有效
3. 檢查 API 額度是否用完

### 問題 3：部署後仍然不工作
**解決方法**:
1. 在 Vercel Dashboard 查看部署日誌
2. 檢查是否有紅色錯誤訊息
3. 確認所有環境變數都已設定並重新部署

## 📌 安全提醒

- ⚠️ **永遠不要**將 `.env` 文件提交到 Git
- ⚠️ **永遠不要**在公開的地方分享你的 API Keys
- ⚠️ **定期輪換** AWS 和 API 密鑰
- ✅ `.env` 文件已在 `.gitignore` 中，不會被提交

## 🎓 延伸學習

- [Vercel Environment Variables 官方文檔](https://vercel.com/docs/concepts/projects/environment-variables)
- [環境變數最佳實踐](https://12factor.net/config)

---

**設定完成後，你的應用就可以在 Vercel 上完整運行了！** 🎉
