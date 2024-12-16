import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      unit: ['', Validators.required],
      invoice1: ['', Validators.required],
      invoice2: ['', Validators.required],
      databaseUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      reportName: ['', Validators.required],
      reportPath: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
