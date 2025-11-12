# Chart.js プレイグラウンド

このプロジェクトは Chart.js を試すためのプレイグラウンドです。

## デモ

GitHub Pages でデプロイされます: `https://<username>.github.io/my-playground-chartjs/`

## 環境

- Node.js: v24 (mise経由でセットアップ)
- Chart.js: ^4.5.1

## セットアップ

```bash
# mise で Node.js v24 をインストール
mise use node@24

# 依存関係のインストール
npm install
```

## スクリプト

- `npm run dev`: Vite開発サーバーを起動
- `npm run build`: 本番用にビルドして`dist`ディレクトリに出力
- `npm run preview`: ビルド後のプレビューサーバーを起動
- `npm run clean`: `dist`ディレクトリを削除

## ローカルで確認

### 開発時

開発サーバーを起動してブラウザで確認：

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開く

### ビルド後の確認

ビルド後、プレビューサーバーで確認：

```bash
npm run build
npm run preview
```

ブラウザで http://localhost:4173 を開く

**注意**: `dist/index.html`を直接ブラウザで開くとCORSエラーが発生します。必ずプレビューサーバーを使用してください。

## デプロイ

mainブランチにプッシュすると、自動的にGitHub Pagesにデプロイされます。

### GitHub Pagesの設定

リポジトリの Settings > Pages で以下を確認してください：

- Source: GitHub Actions

## プロジェクト構成

```
.
├── index.html              # エントリーポイントHTML
├── main.js                 # メインJavaScriptファイル
├── package.json            # npm設定
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions設定
└── dist/                   # ビルド出力（gitignore）
```

## サンプル内容

横棒グラフで長い商品名を表示する5つの異なるアプローチを比較：

1. **デフォルト表示（非常に長い商品名）** - 最初50文字が類似している商品名をそのまま表示
2. **改善版：左揃え + 30文字制限** - ラベルを左揃えにし、最大30文字で切り捨て（ツールチップで全文表示）
3. **改善版：左揃え + 30文字制限 + コンパクト表示** - バーの高さと全体サイズを最適化（全体250px、barPercentage: 0.6）
4. **改善版：フォントサイズ固定 + 横伸び防止** - フォントサイズを10pxに固定し、横伸びを防止（width: 80%）
5. **改善版：中央寄せ + ツールチップ折り返し** - キャンバスを中央寄せし、ツールチップを50文字で折り返し表示
