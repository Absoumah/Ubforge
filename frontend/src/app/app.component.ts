import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { SlimSidebarComponent } from "./core/components/slim-sidebar/slim-sidebar.component";
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, SlimSidebarComponent, ToastContainerComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'frontend';
}
