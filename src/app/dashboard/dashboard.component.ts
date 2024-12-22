import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('vendorChart', { static: true }) vendorChartRef!: ElementRef;
  @ViewChild('customerChart', { static: true }) customerChartRef!: ElementRef;

  vendorChart!: Chart;
  customerChart!: Chart;
  ticketPoolSize: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.createCharts();
    this.fetchData();

    // Real-time updates every 5 seconds
    setInterval(() => this.fetchData(), 5000);
  }

  createCharts(): void {
    // Create Vendor Chart
    this.vendorChart = new Chart(this.vendorChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: [], // Placeholder for labels
        datasets: [
          {
            label: 'Tickets Added',
            data: [], // Placeholder for data
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true },
    });

    // Create Customer Chart
    this.customerChart = new Chart(this.customerChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: [], // Placeholder for labels
        datasets: [
          {
            label: 'Tickets Purchased',
            data: [], // Placeholder for data
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true },
    });
  }

  fetchData(): void {
    // Fetch Vendor Analytics
    this.http.get<any[]>('http://localhost:8080/api/analytics/vendors').subscribe({
      next: (data) => {
        const labels = data.map((vendor) => vendor.vendorName);
        const values = data.map((vendor) => vendor.ticketsAdded);

        // Update Vendor Chart
        this.vendorChart.data.labels = labels;
        this.vendorChart.data.datasets[0].data = values;
        this.vendorChart.update();
      },
      error: (err) => console.error('Failed to fetch vendor analytics', err),
    });

    // Fetch Customer Analytics
    this.http.get<any[]>('http://localhost:8080/api/analytics/customers').subscribe({
      next: (data) => {
        const labels = data.map((customer) => customer.customerName);
        const values = data.map((customer) => customer.ticketsPurchased);

        // Update Customer Chart
        this.customerChart.data.labels = labels;
        this.customerChart.data.datasets[0].data = values;
        this.customerChart.update();
      },
      error: (err) => console.error('Failed to fetch customer analytics', err),
    });

    // Fetch Ticket Pool Status
    /*this.http.get<number>('http://localhost:8080/api/analytics/pool').subscribe({
      next: (data) => (this.ticketPoolSize = data),
      error: (err) => console.error('Failed to fetch ticket pool status', err),
    });*/
  }
}
