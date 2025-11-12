import Chart from 'chart.js/auto';

// 共通の商品名データ
const fullLabels = [
    '【2024年最新モデル】高性能ワイヤレスノイズキャンセリング Bluetooth5.3対応 プレミアムオーバーイヤーヘッドホン - ブラック/スタンダードエディション',
    '【2024年最新モデル】高性能ワイヤレスノイズキャンセリング Bluetooth5.3対応 プレミアムオーバーイヤーヘッドホン - ホワイト/限定カラーエディション',
    '【2024年最新モデル】高性能ワイヤレスノイズキャンセリング Bluetooth5.3対応 プレミアムオーバーイヤーヘッドホン - シルバー/プロフェッショナルエディション',
    '【2024年最新モデル】高性能ワイヤレスノイズキャンセリング Bluetooth5.3対応 プレミアムオーバーイヤーヘッドホン - ネイビーブルー/スポーツエディション',
    '【2024年最新モデル】高性能ワイヤレスノイズキャンセリング Bluetooth5.3対応 プレミアムオーバーイヤーヘッドホン - ローズゴールド/デラックスエディション'
];

const salesData = [1250, 890, 1560, 720, 2100];

const colors = [
    { bg: 'rgba(54, 162, 235, 0.7)', border: 'rgba(54, 162, 235, 1)' },
    { bg: 'rgba(255, 99, 132, 0.7)', border: 'rgba(255, 99, 132, 1)' },
    { bg: 'rgba(192, 192, 192, 0.7)', border: 'rgba(192, 192, 192, 1)' },
    { bg: 'rgba(52, 73, 94, 0.7)', border: 'rgba(52, 73, 94, 1)' },
    { bg: 'rgba(255, 192, 203, 0.7)', border: 'rgba(255, 192, 203, 1)' }
];

// 1. デフォルト表示
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: fullLabels,
        datasets: [{
            label: '販売数（台）',
            data: salesData,
            backgroundColor: colors.map(c => c.bg),
            borderColor: colors.map(c => c.border),
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        return context[0].label;
                    }
                }
            }
        }
    }
});

// 2. 改善版：左揃え + 30文字制限
const barCtx2 = document.getElementById('barChart2').getContext('2d');

// ラベルを30文字に制限
const truncatedLabels = fullLabels.map(label => {
    return label.length > 30 ? label.substring(0, 30) + '...' : label;
});

new Chart(barCtx2, {
    type: 'bar',
    data: {
        labels: truncatedLabels,
        datasets: [{
            label: '販売数（台）',
            data: salesData,
            backgroundColor: colors.map(c => c.bg),
            borderColor: colors.map(c => c.border),
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                ticks: {
                    align: 'start',  // 左揃え
                    crossAlign: 'far'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        // ツールチップでは全文を表示
                        return fullLabels[context[0].dataIndex];
                    }
                }
            }
        }
    }
});

// 3. 改善版：左揃え + 30文字制限 + コンパクト表示
const barCtx3 = document.getElementById('barChart3').getContext('2d');

new Chart(barCtx3, {
    type: 'bar',
    data: {
        labels: truncatedLabels,
        datasets: [{
            label: '販売数（台）',
            data: salesData,
            backgroundColor: colors.map(c => c.bg),
            borderColor: colors.map(c => c.border),
            borderWidth: 2,
            barPercentage: 0.6,      // カテゴリ幅に対するバーの割合を60%に
            categoryPercentage: 0.9  // 全体に対するカテゴリの割合を90%に
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
            padding: {
                left: 5,
                right: 10,
                top: 5,
                bottom: 5
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                ticks: {
                    align: 'start',  // 左揃え
                    crossAlign: 'far',
                    font: {
                        size: 11
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 11
                    },
                    padding: 10
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        // ツールチップでは全文を表示
                        return fullLabels[context[0].dataIndex];
                    }
                }
            }
        }
    }
});

// 4. 改善版：フォントサイズ固定 + 横伸び防止
const barCtx4 = document.getElementById('barChart4').getContext('2d');

new Chart(barCtx4, {
    type: 'bar',
    data: {
        labels: truncatedLabels,
        datasets: [{
            label: '販売数（台）',
            data: salesData,
            backgroundColor: colors.map(c => c.bg),
            borderColor: colors.map(c => c.border),
            borderWidth: 2,
            barPercentage: 0.6,
            categoryPercentage: 0.9
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
            padding: {
                left: 5,
                right: 10,
                top: 5,
                bottom: 5
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 10
                    },
                    padding: 5
                }
            },
            y: {
                ticks: {
                    align: 'start',
                    crossAlign: 'far',
                    font: {
                        size: 10,
                        lineHeight: 1.2
                    },
                    textStrokeWidth: 0,
                    padding: 5,
                    autoSkip: false
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 11
                    },
                    padding: 10
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        return fullLabels[context[0].dataIndex];
                    }
                }
            }
        }
    }
});

// 5. 改善版：中央寄せ + ツールチップ折り返し
const barCtx5 = document.getElementById('barChart5').getContext('2d');

// ツールチップのタイトルを50文字ごとに折り返す関数
function wrapText(text, maxLength) {
    const lines = [];
    for (let i = 0; i < text.length; i += maxLength) {
        lines.push(text.substring(i, i + maxLength));
    }
    return lines;
}

new Chart(barCtx5, {
    type: 'bar',
    data: {
        labels: truncatedLabels,
        datasets: [{
            label: '販売数（台）',
            data: salesData,
            backgroundColor: colors.map(c => c.bg),
            borderColor: colors.map(c => c.border),
            borderWidth: 2,
            barPercentage: 0.6,
            categoryPercentage: 0.9
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                ticks: {
                    align: 'start',
                    crossAlign: 'far',
                    font: {
                        size: 11
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 11
                    },
                    padding: 10
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        // 50文字ごとに折り返して配列で返す
                        return wrapText(fullLabels[context[0].dataIndex], 50);
                    }
                }
            }
        }
    }
});
