import Chart from 'chart.js/auto';
import { fullLabels, salesData, colors } from '../data';

// 1. デフォルト表示
export function createDefaultChart() {
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement | null;
    if (!barCtx) return;

    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: fullLabels,
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
}
