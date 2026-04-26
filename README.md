# MyBlog Portfolio

簡単な個人技術ブログです。アウトプット用でアピール用です。zennやqiitaを使わず自分で作って投稿している理由は、アプリを作る練習のためと、クソ記事で汚さないためです。５回くらい作り直してるので、Nextjsの構成には少し自信があります。余談ですがこのアプリを作る過程でかなりNextjsが上達しました！

## 技術スタック

| レイヤー       | 技術                                                           |
| -------------- | -------------------------------------------------------------- |
| フロントエンド | Next.js 16 / React 19 / TypeScript / Tailwind CSS / Node.js 24 |
| バックエンド   | Laravel 13 / PHP 8.5 / Laravel Sanctum                         |
| データベース   | PostgreSQL                                                     |
| インフラ       | Laravel Cloud（バックエンド） / Vercel（フロントエンド）       |

## 機能

- 記事一覧（キーワード検索・タグ絞り込み）
- 記事詳細（Markdownレンダリング）
- 管理画面：記事の作成・編集・削除・下書き管理
- タグ管理
- 管理者認証（メール＋パスワード）

## デプロイ先

| サービス        | URL                                                             |
| --------------- | --------------------------------------------------------------- |
| フロントエンド  | https://my-blog-portfolio-frotned-uze3.vercel.app               |
| バックエンドAPI | https://myblog-portfolio-backend-main-mhns9h.free.laravel.cloud |

## ディレクトリ構成

```
.
├── backend/        # Laravel
├── frontend/       # Next.js
└── docker/         # ローカル開発用
```

## ローカル開発

### 1. 環境変数の設定

```bash
cp backend/.env.example backend/.env
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

## ローカルアクセス先

| サービス        | URL                   |
| --------------- | --------------------- |
| フロントエンド  | http://localhost:3000 |
| バックエンドAPI | http://localhost:8080 |
