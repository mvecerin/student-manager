import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lesson } from 'src/app/model/lesson.model';

@Component({
  selector: 'app-lessons-dialog',
  templateUrl: './lessons-dialog.component.html',
  styleUrls: ['./lessons-dialog.component.css']
})
export class LessonsDialogComponent implements OnInit {

  form: FormGroup;
  title: string;
  edit: boolean;
  dataPassed: Lesson;

  constructor(public dialogRef: MatDialogRef <LessonsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, edit: boolean, data?: Lesson}
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
      title : new FormControl(null, Validators.required),
      maxScore : new FormControl(null, [Validators.required, Validators.max(100)])
    });
    if(this.edit) {
      this.form.patchValue({
        title: this.dataPassed.title,
        maxScore: this.dataPassed.maxScore
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
