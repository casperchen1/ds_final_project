# 使用輕量版的 Node.js 作為基礎映像檔
FROM node:20-alpine

# 設定容器內的工作目錄
WORKDIR /app

# 先複製 package.json 與 package-lock.json (若有) 並安裝依賴
COPY package*.json ./
RUN npm install

# 複製前端所有程式碼到容器內
COPY . .

# 暴露前端開發伺服器的 Port
# (備註：傳統 Create React App 預設為 3000，若是 Vite 預設為 5173，請依據你的實際狀況調整)
EXPOSE 5173

# 啟動前端開發伺服器
CMD ["npm", "run", "dev"]