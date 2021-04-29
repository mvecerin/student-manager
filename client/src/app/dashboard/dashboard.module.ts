import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { StudentsComponent } from './students/students.component';
import { LessonsComponent } from './lessons/lessons.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonComponent } from './lessons/lesson/lesson.component';
import { DefaultPipe } from './default.pipe';
import { LessonsDialogComponent } from './lessons/lessons-dialog/lessons-dialog.component';
import { StudentsDialogComponent } from './students/students-dialog/students-dialog.component';


@NgModule({
  declarations: [DashboardComponent, StudentsComponent, LessonsComponent, LessonComponent, DefaultPipe, LessonsDialogComponent, StudentsDialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  //providers: [DashboardService]
})
export class DashboardModule { }
