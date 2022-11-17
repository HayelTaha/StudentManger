import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICours } from 'src/app/models/ICours';
import { AlertifyService } from 'src/app/service/alertify.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  public course:ICours={}as ICours;
  public errorMessage:string|null=null;
  public coursId:string|null=null;

  constructor(private CourseService:CourseService,
    private router: Router,private alertify: AlertifyService) { }
  ngOnInit(): void {

  }
  public createSubmite(){

    this.CourseService.creatCourse(this.course).subscribe(()=>{
      this.alertify.success('Sucess Save')
      this.router.navigate(['courses/view']).then();
    },error=>this.alertify.error(error))
   }

}
