FROM node:20-alpine

WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm ci

# アプリケーションファイルをコピー
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
