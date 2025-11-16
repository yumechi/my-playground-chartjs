import Chart from 'chart.js/auto';
import { fullLabels, salesData, colors, truncatedLabels } from '../data';

// 6. 改善版:項目数に応じて自動的に高さを調整
export function createAutoHeightChart() {
    const container = document.getElementById('barChart6Container');
    const barCtx6 = document.getElementById('barChart6') as HTMLCanvasElement | null;
    if (!barCtx6 || !container) return;

    // 項目数に応じて高さを計算
    // 1項目あたり50pxとして、最小200px、最大1000pxに制限
    const itemHeight = 50; // 1項目あたりのピクセル数
    const minHeight = 200;
    const maxHeight = 1000;
    const calculatedHeight = Math.min(Math.max(salesData.length * itemHeight, minHeight), maxHeight);

    // コンテナの高さを設定
    container.style.height = `${calculatedHeight}px`;

    new Chart(barCtx6, {
        type: 'bar',
        data: {
            labels: truncatedLabels,
            datasets: [{
                label: '販売数(台)',
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
                            // ツールチップでは全文を表示
                            return fullLabels[context[0].dataIndex];
                        }
                    }
                }
            }
        }
    });
}
