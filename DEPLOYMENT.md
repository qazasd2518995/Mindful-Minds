# 部署指南

## 本地開發

### 啟動應用

```bash
# 1. 進入專案目錄
cd mindful-mind-app

# 2. 安裝依賴（首次運行）
npm install

# 3. 啟動開發服務器（前端 + 後端）
npm run dev
```

應用將在以下地址運行：
- 前端：http://localhost:3000
- 後端 API：http://localhost:3001

### 測試 API

```bash
# 健康檢查
curl http://localhost:3001/api/health

# 測試聊天（需要後端運行）
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"你好"}]}'
```

## 生產環境部署

### 選項 1: Vercel（推薦）

1. **安裝 Vercel CLI**
```bash
npm i -g vercel
```

2. **登入 Vercel**
```bash
vercel login
```

3. **部署**
```bash
vercel
```

4. **配置環境變數**
在 Vercel 項目設置中添加：
- `GROQ_API_KEY`: 你的 Groq API 密鑰

5. **生產部署**
```bash
vercel --prod
```

### 選項 2: Railway

1. 安裝 Railway CLI
```bash
npm i -g @railway/cli
```

2. 登入並初始化
```bash
railway login
railway init
```

3. 添加環境變數
```bash
railway variables set GROQ_API_KEY=your_key_here
```

4. 部署
```bash
railway up
```

### 選項 3: Render

1. 連接 GitHub 倉庫
2. 創建新的 Web Service
3. 配置：
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. 添加環境變數：`GROQ_API_KEY`

### 選項 4: 傳統 VPS/Server

```bash
# 1. 克隆代碼到服務器
git clone <your-repo-url>
cd mindful-mind-app

# 2. 安裝依賴
npm install

# 3. 建構前端
npm run build

# 4. 使用 PM2 運行後端
npm install -g pm2
pm2 start server/index.js --name mindful-mind

# 5. 設置 Nginx 反向代理
# 參考下面的 Nginx 配置
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端靜態文件
    location / {
        root /path/to/mindful-mind-app/dist;
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Docker 部署

創建 `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

創建 `docker-compose.yml`:

```yaml
version: '3.8'
services:
  mindful-mind:
    build: .
    ports:
      - "3001:3001"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
      - PORT=3001
```

運行：
```bash
docker-compose up -d
```

## 環境變數

必須配置的環境變數：

- `GROQ_API_KEY`: Groq API 密鑰（已在代碼中預設）
- `PORT`: 服務器端口（默認 3001）
- `FRONTEND_URL`: 前端 URL（用於 CORS，默認 http://localhost:3000）

## 安全性建議

1. **不要在前端存儲 API 密鑰** - 已經通過後端代理實現
2. **啟用 HTTPS** - 在生產環境使用 SSL 證書
3. **設置 CORS 限制** - 只允許你的域名訪問 API
4. **定期更新依賴** - 運行 `npm audit` 檢查漏洞
5. **使用環境變數** - 不要提交 `.env` 文件到版本控制

## 監控與維護

### 日誌查看

```bash
# PM2 日誌
pm2 logs mindful-mind

# Docker 日誌
docker-compose logs -f
```

### 性能監控

```bash
# PM2 監控
pm2 monit

# 或使用 PM2 Plus
pm2 plus
```

### 更新應用

```bash
# 拉取最新代碼
git pull

# 安裝新依賴
npm install

# 重新建構
npm run build

# 重啟服務
pm2 restart mindful-mind
```

## 故障排除

### 問題：API 無法連接

- 檢查後端是否運行：`curl http://localhost:3001/api/health`
- 檢查 Groq API 密鑰是否正確
- 查看服務器日誌

### 問題：前端無法加載

- 確保運行了 `npm run build`
- 檢查 Nginx/代理配置
- 查看瀏覽器控制台錯誤

### 問題：Chat 功能不工作

- 確認 Groq API 密鑰有效
- 檢查網絡請求是否成功
- 查看後端日誌中的錯誤信息

## 效能優化

1. **啟用 Gzip 壓縮** - 在 Nginx 或服務器層面
2. **使用 CDN** - 託管靜態資源
3. **設置緩存頭** - 為靜態資源設置適當的緩存
4. **代碼分割** - Vite 已自動處理
5. **圖片優化** - 使用 WebP 格式

## 成本估算

- **Vercel Free Tier**: 免費（適合個人項目）
- **Railway**: ~$5/月（500 小時運行時間）
- **Render**: 免費層或 $7/月
- **VPS (DigitalOcean/Linode)**: $5-10/月

## 需要幫助？

- 查看 README.md 了解基本使用
- 檢查 GitHub Issues
- 聯繫支持團隊

---

祝部署順利！🚀
