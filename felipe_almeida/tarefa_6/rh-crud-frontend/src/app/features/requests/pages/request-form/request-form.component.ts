import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-form.component.html',
})
export class RequestFormComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  requestService = inject(RequestService);

  form: FormGroup = this.fb.group({
    employeeName: ['', Validators.required],
    description: ['', Validators.required],
    type: ['', Validators.required],
  });

  isEdit = false;
  id!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEdit = true;
        this.id = idParam;
        this.requestService.getById(this.id).subscribe((data) => {
          this.form.patchValue(data);
        });
      }
    });
  }

  submit(): void {
    console.log('Formulário enviado:', this.form.value);

    if (this.form.invalid) return;

    const payload = this.form.value;

    if (this.isEdit) {
      this.requestService.update(this.id, payload).subscribe(() => {
        this.router.navigate(['/requests']);
      });
    } else {
      this.requestService.create(payload).subscribe(() => {
        this.router.navigate(['/requests']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/requests']);
  }
}


