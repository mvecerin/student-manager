import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.css']
})
export class StudentsDialogComponent implements OnInit {

  form: FormGroup;
  title: string;
  edit: boolean;
  dataPassed: Student;

  constructor(public dialogRef: MatDialogRef <StudentsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, edit: boolean, data?: Student}
  ) {
    this.title = this.data.title;
    this.edit = this.data.edit;
    this.dataPassed = this.data.data;
  }

  ngOnInit(): void {
    this.makeForm();
  }

  makeForm() {
      this.form = new FormGroup({
      fName : new FormControl(null, Validators.required),
      lName : new FormControl(null, Validators.required),
      jmbag : new FormControl(null, Validators.required)
    });
    if(this.edit) {
      this.form.patchValue({
        fName: this.dataPassed.fName,
        lName: this.dataPassed.lName,
        jmbag: this.dataPassed.jmbag
      });
    }
  }

  close() {
    let dataOutput: any;

    this.edit
    ? dataOutput = Object.assign(this.dataPassed, this.form.value)
    : dataOutput = this.form.value;

    this.dialogRef.close(dataOutput);
  }

}
