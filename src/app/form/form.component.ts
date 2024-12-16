import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  reportForm: FormGroup;
  
  responseMessage: string = '';

  constructor(private fb: FormBuilder,private reportService : ReportService) {
    this.reportForm = this.fb.group({
      unit: ['', Validators.required],
      invoice1: ['', Validators.required],
      invoice2: ['', Validators.required],
      dataSource: this.fb.group({
        url: ['', [Validators.required, Validators.pattern('')]],
        username: ['', Validators.required],
        password: ['', Validators.required]
      }),
      parameters: this.fb.group({
        reportTitle: ['', Validators.required],
        Param1: [''],
        Param2: [''],
        Param3: ['']
      }),
      reports: this.fb.array([
        this.createReport()
      ])
    });
  }

  createReport(): FormGroup {
    return this.fb.group({
      reportPath: ['', Validators.required],
      parameters: this.fb.group({
        Param1: [''],
        Param2: [''],
        reportTitle: ['']
      })
    });
  }

  get reports(): FormArray {
    return this.reportForm.get('reports') as FormArray;
  }

  addReport() {
    this.reports.push(this.createReport());
  }

  removeReport(index: number) {
    this.reports.removeAt(index);
  }

  onSubmit() {
    if (this.reportForm.valid) {
      console.log(this.reportForm.value)
      this.reportService.generateReports(this.reportForm.value).subscribe(
        response => {
          this.responseMessage = `Success: ${response}`;
        },
        error => {
          this.responseMessage = `Error: ${error.message}`;
        }
      );
    } else {
      this.responseMessage = 'Please fill in all required fields.';
    }
  }
}
