import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStudent } from 'src/app/models/IStudent';
import { AlertifyService } from 'src/app/service/alertify.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public loading:boolean=false;
  public students:IStudent={}as IStudent;
  public errorMessage:string|null=null;
  public studentId:string|null=null;
  constructor(private StudentService:StudentService,private router: Router,
    private alertify: AlertifyService) { }
  ngOnInit(): void {
  }
  public createSubmite(){

    this.StudentService.creatStudent(this.students).subscribe(()=>{
      this.alertify.success('Sucess Add')
      this.router.navigate(['/']).then();
    },error=>this.alertify.error(error))
  }

}
