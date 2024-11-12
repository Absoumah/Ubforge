import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { SlimSidebarComponent } from "./core/components/slim-sidebar/slim-sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, SlimSidebarComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'frontend';
}
