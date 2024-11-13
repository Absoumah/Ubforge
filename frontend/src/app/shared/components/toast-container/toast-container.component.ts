import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast.model';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.getToasts().subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  onToastClosed(id: number): void {
    this.toastService.remove(id);
  }
}