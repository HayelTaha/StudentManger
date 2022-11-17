import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/models/IStudent';
import { AlertifyService } from 'src/app/service/alertify.service';
import { StudentService } from 'src/app/service/student.service';


@Component({
  selector: 'app-contact-manger',
  templateUrl: './contact-manger.component.html',
  styleUrls: ['./contact-manger.component.css']
})
export class ContactMangerComponent implements OnInit {
  public students:IStudent[]=[];
  public errorMessage:string|null=null;
  public loading:boolean=false;

  constructor(private StudentService:StudentService, private alertify: AlertifyService) { }

  ngOnInit(): void {

    this.loadingStudent();
  }
  loadingStudent(){
    this.loading=true;
    this.StudentService.getAllStudent().subscribe((student:IStudent[])=>{
      this.students=student;
      this.loading=false;
   },(error)=>{
      this.alertify.error(error);
      this.loading=false;
   });
  }
  public deletStudent(studentId:string ){
    //this.alertify.confirm('هل أنت متأكد من حذف تلك الرسالة',()=>{
    this.StudentService.deletStudent(studentId).subscribe((data:{})=>{
      this.alertify.success('تم حذف الرسالة بنجاح');
      this.loadingStudent();
    },error=>this.alertify.error(error+'Filed to delete data'));

 //})
  }
  searchStudents(event: any) {
    let filteredStudent: IStudent[] = [];
    if (event === '') {
      this.students = this.students;
      this.loadingStudent();
    } else {
      filteredStudent = this.students.filter((val, index) => {
        let targetKey = val.firstName.toLowerCase() + '' + val.lastName.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.students = filteredStudent;
    }
  }
}
