# Chart.js プレイグラウンド

このプロジェクトは Chart.js を試すためのプレイグラウンドです。

## 環境

- Node.js: v24 (mise経由でセットアップ)
- Chart.js: ^4.5.1

## セットアップ

```bash
# mise で Node.js v24 をインストール
mise use node@24

# 依存関係のインストール
npm install

# ビルド
npm run build
```

## 使用方法

ビルド後、`dist/index.html` をブラウザで開いて、Chart.jsのサンプルを確認できます。

## GitHub Pagesへのデプロイ

mainブランチにプッシュすると、GitHub Actionsが自動的にビルドしてGitHub Pagesにデプロイします。

リポジトリの Settings > Pages で Source を「GitHub Actions」に設定してください。

## プロジェクト構成

- `index.html`: サンプルのHTMLファイル（ソース）
- `package.json`: npm設定ファイル
- `.github/workflows/deploy.yml`: GitHub Actions設定
- `dist/`: ビルド出力ディレクトリ（GitHub Pagesで公開）
