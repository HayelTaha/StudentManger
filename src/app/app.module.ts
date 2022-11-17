import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewStudentComponent } from './components/student/view-student/view-student.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactMangerComponent } from './components/contact-manger/contact-manger.component';
import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './service/alertify.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StudentService } from './service/student.service';
import { ViewCoursComponent } from './components/cours/view-cours/view-cours.component';
import { EditCoursComponent } from './components/cours/edit-cours/edit-cours/edit-cours.component';
import { AddCoursComponent } from './components/cours/add-cours/add-cours/add-cours.component';
import { EnrollmentComponent } from './components/studentcours/enrollment/enrollment.component';
import { ErrorInterceptorProvidor } from './service/error.interceptor';
import { TeacherComponent } from './components/teacher/teacher/teacher.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    NavbarComponent,
    ContactMangerComponent,
    PageNotFoundComponent,
    ViewCoursComponent,
    EditCoursComponent,
    AddCoursComponent,
    EnrollmentComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    AlertifyService,
    ErrorInterceptorProvidor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
