import Chart from 'chart.js/auto';
import { fullLabels, salesData, colors, truncatedLabels } from '../data';

// 4. 改善版:フォントサイズ固定 + 横伸び防止
export function createFixedFontChart() {
    const barCtx4 = document.getElementById('barChart4') as HTMLCanvasElement | null;
    if (!barCtx4) return;

    new Chart(barCtx4, {
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
}
