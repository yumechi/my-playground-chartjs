import Chart from 'chart.js/auto';
import { fullLabels, salesData, colors, truncatedLabels } from '../data';

// 3. 改善版:左揃え + 30文字制限 + コンパクト表示
export function createCompactChart() {
    const barCtx3 = document.getElementById('barChart3') as HTMLCanvasElement | null;
    if (!barCtx3) return;

    new Chart(barCtx3, {
        type: 'bar',
        data: {
            labels: truncatedLabels,
            datasets: [{
                label: '販売数(台)',
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
}
