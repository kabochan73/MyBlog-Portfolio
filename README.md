# MyBlog Portfolio

個人技術ブログ。記事の投稿・管理ができる管理者1名のシングルユーザー構成。

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | Next.js 16 / React 19 / TypeScript / Tailwind CSS |
| バックエンド | Laravel / PHP 8.4 / Laravel Sanctum |
| データベース | MySQL 8.0 |
| インフラ | Docker / Nginx |

## 機能

- 記事一覧（キーワード検索・タグ絞り込み）
- 記事詳細（Markdownレンダリング）
- 管理画面：記事の作成・編集・削除・下書き管理
- タグ管理
- 管理者認証（メール＋パスワード）

## ディレクトリ構成

```
.
├── backend/        # Laravel
├── frontend/       # Next.js
└── docker/
    ├── php/        # PHP 8.4-fpm + Composer
    ├── nginx/      # Nginxリバースプロキシ
    ├── mysql/      # MySQL設定
    └── node/       # Node.js 20
```

## 起動方法

### 1. 環境変数の設定

```bash
cp backend/.env.example backend/.env
```

`backend/.env` のDB設定を確認：

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=myblog
DB_USERNAME=laravel
DB_PASSWORD=secret
```

### 2. Dockerコンテナ起動

```bash
docker compose up -d --build
```

### 3. Laravelの初期セットアップ

```bash
# マイグレーション
docker compose exec backend php artisan migrate

# 管理者アカウント作成
docker compose exec backend php artisan db:seed
```

## アクセス先

| サービス | URL |
|---|---|
| フロントエンド | http://localhost:3000 |
| バックエンドAPI | http://localhost:8080 |
| MySQL | localhost:3306 |
