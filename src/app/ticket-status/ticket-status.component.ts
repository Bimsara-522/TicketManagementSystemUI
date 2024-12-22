import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-ticket-status',
  standalone: true,
  imports: [DashboardComponent], // Remove HttpClientModule from imports
  templateUrl: './ticket-status.component.html',
  styleUrls: ['./ticket-status.component.css']
})
export class TicketStatusComponent implements OnInit {
  ticketPoolSize: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStatus();
    setInterval(() => this.fetchStatus(), 2000); // Poll every 2 seconds
  }

  fetchStatus(): void {
    this.http.get<number>('http://localhost:8080/api/ticket-pool/status').subscribe(
      (data) => (this.ticketPoolSize = data),
      (error) => console.error('Error fetching ticket pool status:', error)
    );
  }
}
