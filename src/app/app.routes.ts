import { Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { VendorManagementComponent } from './vendor-management/vendor-management.component';
import { LogDisplayComponent } from './log-display/log-display.component';
import { TicketStatusComponent } from './ticket-status/ticket-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'config', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'customers', component: CustomerManagementComponent },
  { path: 'vendors', component: VendorManagementComponent },
  { path: 'logs', component: LogDisplayComponent },
  { path: 'status', component: TicketStatusComponent },
];
