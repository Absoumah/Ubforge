// documentation-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentationService } from '../../services/documentation.service';
import { Documentation } from '../../models/documentation';
import { DocumentationItemComponent } from '../documentation-item/documentation-item.component';

@Component({
  selector: 'app-documentation-list',
  standalone: true,
  imports: [CommonModule, DocumentationItemComponent],
  templateUrl: './documentation-list.component.html',
  styleUrls: ['./documentation-list.component.scss']
})
export class DocumentationListComponent implements OnInit {
  docs$: Observable<Documentation[]>;

  constructor(
    private docService: DocumentationService,
    private router: Router
  ) {
    this.docs$ = this.docService.getDocs();
  }

  ngOnInit(): void {}

  createDoc(): void {
    this.router.navigate(['/documentation/create']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/documentation/edit', id]);
  }

  onDelete(id: number): void {
    this.docService.deleteDoc(id);
  }
}