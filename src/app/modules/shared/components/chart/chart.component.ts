import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnChanges {
  @Input() type: 'line' | 'bar' | 'pie' | 'doughnut' = 'bar';
  @Input() data: any;
  @Input() options: any;
  @Input() width: string = '100%';
  @Input() height: string = '300px';

  chartData: any;
  chartOptions: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['options']) {
      this.chartData = this.data;
      this.chartOptions = this.options || this.getDefaultOptions();
    }
  }

  getDefaultOptions() {
    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'Poppins',
              size: window.innerWidth < 768 ? 10 : 12,
            },
            padding: window.innerWidth < 768 ? 10 : 15,
            usePointStyle: true,
            boxWidth: window.innerWidth < 768 ? 8 : 12,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: window.innerWidth < 768 ? 8 : 12,
          bodyFont: {
            family: 'Poppins',
            size: window.innerWidth < 768 ? 11 : 13,
          },
          titleFont: {
            family: 'Poppins',
            size: window.innerWidth < 768 ? 12 : 14,
            weight: 'bold',
          },
        },
      },
      scales:
        this.type === 'bar' || this.type === 'line'
          ? {
              y: {
                ticks: {
                  font: {
                    size: window.innerWidth < 768 ? 9 : 11,
                  },
                },
              },
              x: {
                ticks: {
                  font: {
                    size: window.innerWidth < 768 ? 9 : 11,
                  },
                },
              },
            }
          : undefined,
    };
  }
}
