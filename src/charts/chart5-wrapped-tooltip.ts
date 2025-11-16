import Chart from 'chart.js/auto';
import { fullLabels, salesData, colors, truncatedLabels } from '../data';

// ツールチップのタイトルを50文字ごとに折り返す関数
function wrapText(text: string, maxLength: number): string[] {
    const lines: string[] = [];
    for (let i = 0; i < text.length; i += maxLength) {
        lines.push(text.substring(i, i + maxLength));
    }
    return lines;
}

// 5. 改善版:中央寄せ + ツールチップ折り返し
export function createWrappedTooltipChart() {
    const barCtx5 = document.getElementById('barChart5') as HTMLCanvasElement | null;
    if (!barCtx5) return;

    new Chart(barCtx5, {
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
}
