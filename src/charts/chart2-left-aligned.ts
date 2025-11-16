import Chart from 'chart.js/auto';
import { fullLabels, salesData, colors, truncatedLabels } from '../data';

// 2. 改善版:左揃え + 30文字制限
export function createLeftAlignedChart() {
    const barCtx2 = document.getElementById('barChart2') as HTMLCanvasElement | null;
    if (!barCtx2) return;

    new Chart(barCtx2, {
        type: 'bar',
        data: {
            labels: truncatedLabels,
            datasets: [{
                label: '販売数(台)',
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
}
