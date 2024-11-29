import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Release } from '../../models/release';
import { ReleaseService } from '../../services/release.service';

@Component({
  selector: 'app-release-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.scss']
})
export class ReleaseListComponent implements OnInit {
  releases$: Observable<Release[]>;

  constructor(
    private releaseService: ReleaseService,
    private router: Router
  ) {
    this.releases$ = this.releaseService.getReleases();
  }

  ngOnInit(): void { }

  createRelease(): void {
    this.router.navigate(['/releases/new']);
  }
}