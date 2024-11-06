import { Routes } from '@angular/router';
import { HelloWorldComponent } from './modules/hello-world/hello-world.component';

export const routes: Routes = [
    { path: 'hello-world', component: HelloWorldComponent },
    { path: '', redirectTo: '/hello-world', pathMatch: 'full' }
];
