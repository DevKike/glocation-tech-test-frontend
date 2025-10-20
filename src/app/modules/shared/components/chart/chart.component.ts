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
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'Poppins',
              size: 12,
            },
            padding: 15,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          bodyFont: {
            family: 'Poppins',
            size: 13,
          },
          titleFont: {
            family: 'Poppins',
            size: 14,
            weight: 'bold',
          },
        },
      },
    };
  }
}
