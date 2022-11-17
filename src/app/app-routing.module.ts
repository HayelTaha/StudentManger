import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactMangerComponent } from './components/contact-manger/contact-manger.component';
import { AddCoursComponent } from './components/cours/add-cours/add-cours/add-cours.component';
import { EditCoursComponent } from './components/cours/edit-cours/edit-cours/edit-cours.component';
import { ViewCoursComponent } from './components/cours/view-cours/view-cours.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { ViewStudentComponent } from './components/student/view-student/view-student.component';
import { EnrollmentComponent } from './components/studentcours/enrollment/enrollment.component';
import { TeacherComponent } from './components/teacher/teacher/teacher.component';

const routes: Routes = [
  {path:'',redirectTo:'contacts/admin',pathMatch:'full'},
  {path:'contacts/admin',component:ContactMangerComponent},
  {path:'students/add',component:AddStudentComponent},
  {path:'students/edit/:studentId',component:EditStudentComponent},
  {path:'students/view/:studentId',component:ViewStudentComponent},
  {path:'courses/view',component:ViewCoursComponent},
  {path:'courses/add',component:AddCoursComponent},
  {path:'courses/edit/:courseId',component:EditCoursComponent},
  {path:'enrollment/manger',component:EnrollmentComponent},
  {path:'teacher/admin',component:TeacherComponent},



  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
