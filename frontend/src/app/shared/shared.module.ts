import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
    imports: [
        CommonModule,
        UserAvatarComponent
    ],
    exports: [
        UserAvatarComponent
    ]
})
export class SharedModule { }