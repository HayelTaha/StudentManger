import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IStudent } from 'src/app/models/IStudent';
import { IStudentEnroll } from 'src/app/models/IStudentEnroll';
import { AlertifyService } from 'src/app/service/alertify.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  public loading:boolean=false;
  public student:IStudent={}as IStudent;
  public errorMessage:string|null=null;
  public studentId:string|null=null;

  constructor(private activatedRoute:ActivatedRoute,
    private alertify: AlertifyService, private StudentService:StudentService,private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.studentId=param.get('studentId');
    });
    this.loadSinglContact();
  }
  loadSinglContact(){
    if(this.studentId){
      this.loading=true;
      this.StudentService.getStudentById(this.studentId).subscribe((data:IStudent)=>{
       this.student=data;
       this.loading=false;
      },(error)=>{
        this.alertify.error(error);
        this.loading=false;
    })
  }
}
/**
 * isNotEmpty
 */
 public isNotEmpty() {
  return Object.keys(this.student).length>0;
 }
}
