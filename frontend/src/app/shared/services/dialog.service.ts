import { ApplicationRef, ComponentRef, createComponent, Injectable, Type } from '@angular/core';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private appRef: ApplicationRef) { }

    confirm(options: {
        title: string;
        message: string;
        confirmText?: string;
        cancelText?: string;
    }): Promise<boolean> {
        return new Promise((resolve) => {
            const dialogRef = this.createDialog(ConfirmationDialogComponent);
            const component = dialogRef.instance;

            Object.assign(component, options);

            component.confirm.subscribe(() => {
                this.removeDialog(dialogRef);
                resolve(true);
            });

            component.cancel.subscribe(() => {
                this.removeDialog(dialogRef);
                resolve(false);
            });
        });
    }

    private createDialog<T>(component: Type<T>): ComponentRef<T> {
        const componentRef = createComponent(component, {
            environmentInjector: this.appRef.injector
        });
        document.body.appendChild(componentRef.location.nativeElement);
        this.appRef.attachView(componentRef.hostView);
        return componentRef;
    }

    private removeDialog<T>(dialogRef: ComponentRef<T>): void {
        this.appRef.detachView(dialogRef.hostView);
        dialogRef.destroy();
    }
}