import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReleaseStatus } from '../../models/release';

@Component({
  selector: 'app-release-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './release-form.component.html',
  styleUrl: './release-form.component.scss'
})
export class ReleaseFormComponent implements OnInit {

  releaseForm: FormGroup;
  releaseStatuses = Object.values(ReleaseStatus);

  constructor(private fb: FormBuilder) {
    this.releaseForm = this.fb.group({
      version: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      releaseDate: ['', [Validators.required]],
      status: [ReleaseStatus.PLANNED, [Validators.required]],
      projectId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    //TODO: Implement onSubmit method
    console.log(this.releaseForm.value);
  }
}
