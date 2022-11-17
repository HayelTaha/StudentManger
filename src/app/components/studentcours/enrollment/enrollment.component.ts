import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICours } from 'src/app/models/ICours';
import { IStudent } from 'src/app/models/IStudent';
import { IStudentEnrollList } from 'src/app/models/IStudentEnrollList';
import { AlertifyService } from 'src/app/service/alertify.service';
import { CourseService } from 'src/app/service/course.service';
import { StudentEnrolService } from 'src/app/service/student-enrol.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  public students:IStudent[]=[];
  public courses:ICours[]=[];
  public studentEnrollList:IStudentEnrollList[]=[];
  public enrollList:IStudentEnrollList={}as IStudentEnrollList;

  public errorMessage:string|null=null;

  constructor(private StudentService:StudentService,
    private alertify: AlertifyService,
    private activatedRoute:ActivatedRoute,
    private StudentEnrolService:StudentEnrolService,
    private CourseService:CourseService,private router: Router) { }


  ngOnInit(): void {
 this.loadingStudent();
 this.loadCourse();
 this.getEnrollment();
  }
  loadingStudent(){
    this.StudentService.getAllStudent().subscribe((student:IStudent[])=>{
      this.students=student;
   },(error)=>{
    this.errorMessage=error;
   });
  }
  loadCourse(){
    this.CourseService.getAllCourse().subscribe((data:ICours[])=>{
     this.courses=data;
    },(error)=>{
     this.alertify.error(error)
     })
}

getEnrollment(){
  this.StudentEnrolService.getEnrollmentList().subscribe((studentEnrollList:IStudentEnrollList[])=>{
    this.studentEnrollList=studentEnrollList;
 },(error)=>{
  this.alertify.error(error)
});
}

public createSubmite()
{
  this.StudentEnrolService.creatStudentEnrollment(this.enrollList).subscribe(()=>{
    this.alertify.success('Sucess Save')
    this.getEnrollment();
  },error=>this.alertify.error(error))
 }


 public deletEnrollment(id:number ){
    // this.alertify.confirm('هل أنت متأكد من حذف تلك الرسالة',()=>{
  this.StudentEnrolService.deletEnrollment(id).subscribe((data:{})=>{
    this.alertify.success('Sucess Delete')
    this.getEnrollment();
  },error=>this.alertify.error(error));
   //})
}
searchStudents(event: any) {
  let filteredStudent: IStudentEnrollList[] = [];
  if (event === '') {
    this.studentEnrollList = this.studentEnrollList;
    this.getEnrollment();
  } else {
    filteredStudent = this.studentEnrollList.filter((val, index) => {
      let targetKey = val.firstName.toLowerCase() + '' + val.courseName.toLowerCase()+''+val.courseId;
      let searchKey = event.toLowerCase();
      return targetKey.includes(searchKey);
    });
    this.studentEnrollList = filteredStudent;
  }
}
}
