import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DocumentationService } from '../../services/documentation.service';
import { Documentation, DocumentCategory, DocumentStatus } from '../../models/documentation';
import { DocumentationItemComponent } from '../documentation-item/documentation-item.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-documentation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentation-list.component.html',
  styleUrls: ['./documentation-list.component.scss']
})
export class DocumentationListComponent implements OnInit {
  docs$: Observable<Documentation[]>;
  categories = Object.values(DocumentCategory);
  selectedCategory: DocumentCategory | null = null;

  constructor(
    private docService: DocumentationService,
    private router: Router
  ) {
    this.docs$ = this.docService.getDocs();
  }

  ngOnInit(): void { }

  createDoc(): void {
    this.router.navigate(['/documentation/create']);
  }

  filterByCategory(category: DocumentCategory | null): void {
    this.selectedCategory = category;
    this.docs$ = category ?
      this.docService.getDocsByCategory(category) :
      this.docService.getDocs();
  }
}