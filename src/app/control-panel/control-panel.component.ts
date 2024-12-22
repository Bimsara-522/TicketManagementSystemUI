import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  // Dynamic values bound to the form
  requestBody = {
    totalTickets: 0,
    maxTicketCapacity: 0,
    ticketReleaseRate: 0,
    releaseInterval: 0,
    customerRetrievalRate: 0,
    retrievalInterval: 0
  };

  constructor(private http: HttpClient) {}

  startSystem(): void {
    this.http.post('http://localhost:8080/api/ticket-pool/start', this.requestBody, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('System started successfully:', response);
        alert(response); // Display the plain text response
      },
      (error) => {
        console.error('Error starting system:', error);
        alert('Failed to start the system. Please try again.');
      }
    );
  }

  stopSystem(): void {
    this.http.post('http://localhost:8080/api/ticket-pool/stop', {}, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log(response);
        alert(response); // Display the plain text response
      },
      (error) => {
        console.error('Error stopping system:', error);
        alert('Failed to stop the system. Please try again.');
      }
    );
  }
  

  resetSystem(): void {
    this.http.post('http://localhost:8080/api/ticket-pool/reset', {}, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('System reset successfully:', response);
        alert(response);
      },
      (error) => {
        console.error('Error resetting system:', error);
        alert('Failed to reset the system. Please try again.');
      }
    );
  }
  

  saveConfig(): void {
    this.http.post('http://localhost:8080/api/config/save-config', {}, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('Configuration saved:', response);
        alert(response);
      },
      (error) => {
        console.error('Error saving configuration:', error);
        alert('Failed to save configuration. Please try again.');
      }
    );
  }
  
  loadConfig(): void {
    this.http.get('http://localhost:8080/api/config/load-config', { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('Configuration loaded:', response);
        alert(response);
      },
      (error) => {
        console.error('Error loading configuration:', error);
        alert('Failed to load configuration. Please try again.');
      }
    );
  }
}
