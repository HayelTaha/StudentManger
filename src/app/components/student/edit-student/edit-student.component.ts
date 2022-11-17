import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IStudent } from 'src/app/models/IStudent';
import { AlertifyService } from 'src/app/service/alertify.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  public loading:boolean=false;
  public students:IStudent={}as IStudent;
  public errorMessage:string|null=null;
  public studentId:string|null=null;


  constructor(private StudentService:StudentService,private router: Router,
    private alertify: AlertifyService,private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.studentId=param.get('studentId');
    this.loadSinglStudent();
  });
}
  loadSinglStudent(){
    if(this.studentId){
     this.loading=true;
     this.StudentService.getStudentById(this.studentId).subscribe((data:IStudent)=>{
      this.students=data;
       this.loading=false;
      },(error)=>{
        this.alertify.error(error);
        this.loading=false;
    })
  }
}
  public submitUpdate(){
    if(this.studentId){
      this.StudentService.updateStudent(this.students,this.studentId).subscribe(()=>{
        this.alertify.success('Sucess Update')
        this.router.navigate(['/']).then();
      },(error)=>{
       this.alertify.error(error);
       this.router.navigate(['/students/edit/${this.studentId}']).then();
     })
    }
  }
}
