import { Component} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-vendor-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent {
  vendors: any[] = [];

  constructor(private http: HttpClient) {
    this.getVendors();
  }

// Periodically refresh vendor data
ngOnInit() {
  this.getVendors();
  setInterval(() => this.getVendors(), 5000); // Poll every 5 seconds
}

  getVendors() {
    this.http.get<any[]>('http://localhost:8080/api/vendors').subscribe(
      (response) => {
        this.vendors = response;
      },
      (error) => {
        console.error('Error fetching vendors:', error);
        alert('Failed to load vendors.');
      }
    );
  }

  addVendor(name: string) {
  this.http.post('http://localhost:8080/api/ticket-pool/add-vendor', { name }, { responseType: 'text' }).subscribe({
    next: (response) => {
      console.log('Vendor added successfully:', response);
      this.getVendors(); // Refresh the vendor list
      alert(response); // Display the response
    },
    error: (error) => {
      console.error('Error adding vendor:', error);
      alert('Failed to add vendor.');
    },
  });
}



  
  

removeVendor(id: number) {
  if (confirm(`Are you sure you want to remove vendor ${id}?`)) {
      this.http.post<{ message: string }>(`http://localhost:8080/api/ticket-pool/remove-vendor/${id}`, {}).subscribe(
          (response) => {
              console.log('Remove Vendor Response:', response.message); // Log the success message
              this.getVendors(); // Refresh the vendor list after successful removal
              alert(response.message); // Show the success message from the response
          },
          (error) => {
              console.error('Error removing vendor:', error); // Log the error for debugging
              alert('Failed to remove vendor.'); // Show a generic error message
          }
      );
  }
}



}