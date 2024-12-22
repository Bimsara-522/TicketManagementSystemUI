import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent {
  customers: any[] = [];

  constructor(private http: HttpClient) {
    this.getCustomers();
  }


  // Periodically refresh customer data
ngOnInit() {
  this.getCustomers();
  setInterval(() => this.getCustomers(), 5000); // Poll every 5 seconds
}

  // Fetch all customers
  getCustomers() {
    this.http.get<any[]>('http://localhost:8080/api/customers').subscribe(
      (response) => {
        this.customers = response;
      },
      (error) => {
        console.error('Error fetching customers:', error);
        alert('Failed to load customers.');
      }
    );
  }

  // Add a new customer
  addCustomer(name: string) {
    this.http.post('http://localhost:8080/api/ticket-pool/add-customer', { name }, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('Customer added successfully:', response);
        this.getCustomers(); // Refresh the customer list
        alert(response); // Display the response
      },
      error: (error) => {
        console.error('Error adding customer:', error);
        alert('Failed to add customer.');
      },
    });
  }
  

  // Remove an existing customer
  removeCustomer(id: number) {
    if (confirm(`Are you sure you want to remove customer ${id}?`)) {
        this.http.post<{ message: string }>(`http://localhost:8080/api/ticket-pool/remove-customer/${id}`, {}).subscribe(
            (response) => {
                console.log('Remove Customer Response:', response.message); // Log the success message
                this.getCustomers(); // Refresh the customer list after successful removal
                alert(response.message); // Show the success message from the response
            },
            (error) => {
                console.error('Error removing customer:', error); // Log the error for debugging
                alert('Failed to remove customer.'); // Show a generic error message
            }
        );
    }
}

}
