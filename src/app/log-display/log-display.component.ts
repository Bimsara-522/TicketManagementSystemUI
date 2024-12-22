import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css']
})
export class LogDisplayComponent implements OnInit {
  logs: string[] = [];
  isLoading = false; // For loading indicator

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLogs();
    setInterval(() => this.fetchLogs(), 2000);
  }

  fetchLogs(): void {
    this.isLoading = true;
    this.http.get<string[]>('http://localhost:8080/api/logs').subscribe(
      (data) => {
        this.logs = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching logs:', error);
        alert('Failed to fetch logs. Please try again later.');
        this.isLoading = false;
      }
    );
  }

  // refreshLogs(): void {
  //   this.fetchLogs();
  // }
}
