import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ControlPanelComponent } from "../control-panel/control-panel.component";

@Component({
  selector: 'app-config',
  imports: [ReactiveFormsModule, ControlPanelComponent],
  standalone: true,
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  configForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.configForm = this.fb.group({
      totalTickets: [''],
      ticketReleaseRate: [''],
      releaseInterval: [''],
      customerRetrievalRate: [''],
      retrievalInterval: [''],
      maxTicketCapacity: ['']
    });
  }

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/config', this.configForm.value, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('Configuration saved:', response);
        alert(response);
      },
      (error) => {
        console.error('Error setting configuration:', error);
        alert('Failed to set configuration. Please try again.');
      }
    );
  }
}