import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskFormComponent],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  taskForm?: FormGroup;
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(taskId).subscribe(task => {
      if (task) {
        this.task = task;
        this.taskForm = this.taskService.createTaskForm();
        this.taskForm.patchValue({
          ...task,
          assignedTo: task.assignedTo.map(user => user.id)
        });
      } else {
        this.router.navigate(['/tasks']);
      }
    });
  }

  onSave(): void {
    if (this.taskForm?.valid && this.task) {
      const updatedTask = this.taskService.mapFormToTask(this.taskForm.value);
      this.taskService.updateTask(this.task.id, updatedTask).subscribe(() => {
        this.router.navigate(['/tasks', this.task?.id]);
      });
    }
  }

  onCancel(): void {
    if (this.task) {
      this.router.navigate(['/tasks', this.task.id]);
    } else {
      this.router.navigate(['/tasks']);
    }
  }
}