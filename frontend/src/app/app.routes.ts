import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelloWorldComponent } from './modules/hello-world/hello-world.component';
import { ProjectListComponent } from './modules/project/components/project-list/project-list.component';
import { ProjectFormComponent } from './modules/project/components/project-form/project-form.component';

export const routes: Routes = [
    // we'll keep here, for now
    { path: 'hello-world', component: HelloWorldComponent },

    // prod routes
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/new', component: ProjectFormComponent },
    { path: '', redirectTo: '/projects', pathMatch: 'full' }

    // TODO: add a 404 page
];
