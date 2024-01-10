import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit {
  ngAfterViewInit() {
    const chartElement = document.getElementById('order-chart') as HTMLCanvasElement;

    if (chartElement) {
      const context = chartElement.getContext('2d');

      if (context) {
        new Chart(context, {
          type: 'line',
          data: {
            labels: this.generateNDays(7),
            datasets: [
              {
                label: 'Active',
                data: this.generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgb(59 130 246 / .05)',
                tension: 0.2,
              },
              {
                label: 'Completed',
                data: this.generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgb(16 185 129 / .05)',
                tension: 0.2,
              },
              {
                label: 'Canceled',
                data: this.generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(244, 63, 94)',
                borderColor: 'rgb(244, 63, 94)',
                backgroundColor: 'rgb(244 63 94 / .05)',
                tension: 0.2,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }

  generateNDays(n: number) {
    const data = [];
    for (let i = 0; i < n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push(
        date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      );
    }
    return data;
  }

  generateRandomData(n: number) {
    const data = [];
    for (let i = 0; i < n; i++) {
      data.push(Math.round(Math.random() * 10));
    }
    return data;
  }
}
