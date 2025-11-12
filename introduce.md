# Chart.js グラフ改善の実践例

## Chart.js とは

Chart.jsは、HTML5 Canvasを使用したシンプルかつ柔軟なJavaScriptチャートライブラリです。

### 主な特徴
- **軽量** - 最小限の依存関係で動作
- **レスポンシブ** - デバイスサイズに自動対応
- **アニメーション対応** - スムーズなチャート描画
- **8種類のチャートタイプ** - 棒グラフ、折れ線グラフ、円グラフなど
- **高いカスタマイズ性** - フォント、色、レイアウトを細かく調整可能

公式サイト: https://www.chartjs.org/

## 本プロジェクトの目的

長い商品名を横棒グラフで表示する際の課題を解決し、最適な表示方法を探る実践例を示します。

### 対象となる課題
- 商品名が非常に長い（100文字以上）
- 最初の50文字が類似しており、区別がつきにくい
- Y軸ラベルが読みにくい、または横に伸びすぎる

## グラフ改善の5つのアプローチ

### 1. デフォルト表示（非常に長い商品名）

**特徴:**
- Chart.jsのデフォルト設定をそのまま使用
- 長い商品名を全文表示しようとする

**問題点:**
```javascript
labels: fullLabels,  // 100文字以上の商品名をそのまま使用
```
- Y軸ラベルが途中で切れる
- ラベルエリアが非常に広くなり、グラフ本体が圧迫される
- 最初の50文字が同じため、違いが見えにくい

---

### 2. 改善版：左揃え + 30文字制限

**改善ポイント:**
- ラベルを30文字に切り詰めて「...」を付加
- Y軸ラベルを左揃えに変更
- ツールチップで全文を表示

**実装例:**
```javascript
// ラベルを30文字に制限
const truncatedLabels = fullLabels.map(label => {
    return label.length > 30 ? label.substring(0, 30) + '...' : label;
});

// Y軸設定
y: {
    ticks: {
        align: 'start',     // 左揃え
        crossAlign: 'far'
    }
}

// ツールチップで全文表示
tooltip: {
    callbacks: {
        title: function(context) {
            return fullLabels[context[0].dataIndex];
        }
    }
}
```

**効果:**
- ラベルエリアの幅が一定になり、グラフが見やすくなる
- 左揃えにより、ラベルの開始位置が統一される
- マウスオーバーで全文が確認可能

---

### 3. 改善版：左揃え + 30文字制限 + コンパクト表示

**改善ポイント:**
- バーの太さを調整して、より多くの情報を画面に表示
- フォントサイズを最適化
- 全体の高さを250pxに制限

**実装例:**
```javascript
datasets: [{
    barPercentage: 0.6,      // カテゴリ幅に対するバーの割合を60%に
    categoryPercentage: 0.9   // 全体に対するカテゴリの割合を90%に
}]

// フォントサイズの調整
y: {
    ticks: {
        font: {
            size: 11  // 読みやすさを保ちつつコンパクトに
        }
    }
}
```

**効果:**
- バー間のスペースが適度になり、データ密度が向上
- 縦スクロールを減らせる
- 一覧性が向上

---

### 4. 改善版：フォントサイズ固定 + 横伸び防止

**改善ポイント:**
- CSS で canvas の幅を80%に制限
- フォントサイズを10pxに固定
- 細かいレイアウト調整（padding, lineHeight）

**実装例:**
```css
#barChart4 {
    width: 80% !important;
}
```

```javascript
y: {
    ticks: {
        font: {
            size: 10,
            lineHeight: 1.2
        },
        padding: 5,
        autoSkip: false  // ラベルの自動スキップを無効化
    }
}
```

**効果:**
- グラフが横に広がりすぎることを防止
- フォントサイズを固定することで、レイアウトが安定
- 画面サイズに関わらず一貫した表示

---

### 5. 改善版：中央寄せ + ツールチップ折り返し

**改善ポイント:**
- canvas を wrapper div で囲み、中央寄せ
- ツールチップのタイトルを50文字ごとに折り返し
- 読みやすさを最優先

**実装例:**
```html
<div class="canvas-wrapper">
    <canvas id="barChart5"></canvas>
</div>
```

```css
.canvas-wrapper {
    width: 80%;
    margin: 0 auto;  /* 中央寄せ */
}
```

```javascript
// ツールチップのタイトルを50文字ごとに折り返す関数
function wrapText(text, maxLength) {
    const lines = [];
    for (let i = 0; i < text.length; i += maxLength) {
        lines.push(text.substring(i, i + maxLength));
    }
    return lines;
}

tooltip: {
    callbacks: {
        title: function(context) {
            // 配列で返すと自動的に複数行表示される
            return wrapText(fullLabels[context[0].dataIndex], 50);
        }
    }
}
```

**効果:**
- グラフが中央に配置され、見た目が整う
- ツールチップが折り返されて読みやすくなる
- canvas自体は適切なサイズを保つ（間延びしない）

---

## まとめ

### 各アプローチの使い分け

| アプローチ | 推奨シーン |
|----------|----------|
| 1. デフォルト | 短いラベルの場合 |
| 2. 左揃え+30文字 | 基本的な改善が必要な場合 |
| 3. コンパクト表示 | データ数が多く一覧性が重要な場合 |
| 4. 横伸び防止 | 画面幅が限られている場合 |
| 5. 中央寄せ+折り返し | プレゼン資料など、視覚的な整合性が重要な場合 |

### 重要な設定項目

**Y軸のカスタマイズ:**
```javascript
y: {
    ticks: {
        align: 'start',      // 左揃え（start）/ 中央揃え（center）
        crossAlign: 'far',   // ラベルの配置位置
        font: { size: 10 },  // フォントサイズ
        autoSkip: false      // ラベルの自動スキップを無効化
    }
}
```

**バーの太さ調整:**
```javascript
datasets: [{
    barPercentage: 0.6,       // バーの太さ（0.0 - 1.0）
    categoryPercentage: 0.9   // カテゴリ間のスペース
}]
```

**ツールチップのカスタマイズ:**
```javascript
tooltip: {
    callbacks: {
        title: function(context) {
            // 配列で返すと複数行表示
            return ['1行目', '2行目', '3行目'];
        }
    }
}
```

## 参考リンク

- [Chart.js 公式ドキュメント](https://www.chartjs.org/docs/latest/)
- [Bar Chart Configuration](https://www.chartjs.org/docs/latest/charts/bar.html)
- [Axes Configuration](https://www.chartjs.org/docs/latest/axes/)
- [Tooltip Configuration](https://www.chartjs.org/docs/latest/configuration/tooltip.html)
