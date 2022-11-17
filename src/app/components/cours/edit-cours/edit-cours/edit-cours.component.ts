import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICours } from 'src/app/models/ICours';
import { AlertifyService } from 'src/app/service/alertify.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css']
})
export class EditCoursComponent implements OnInit {
  public loading:boolean=false;
  public course:ICours={}as ICours;
  public errorMessage:string|null=null;
  public courseId:string|null=null;

  constructor(private CourseService:CourseService,private router: Router,
    private alertify: AlertifyService,private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.courseId=param.get('courseId');
    this.loadSinglCourse();
  });
  }
  loadSinglCourse(){
    if(this.courseId){
     this.loading=true;
     this.CourseService.getCourseById(this.courseId).subscribe((data:ICours)=>{
      this.course=data;
       this.loading=false;
      },(error)=>{
       this.errorMessage=error;
       this.loading=false;
    })
  }
}
public submitUpdate(){
  if(this.courseId){
    this.CourseService.updateCours(this.course,this.courseId).subscribe(()=>{
      this.router.navigate(['/courses/view']).then();
      this.alertify.success('تم حذف الرسالة بنجاح');
    },(error)=>{
      this.alertify.error(error);
      this.router.navigate(['/courses/edit/${this.courseId}']).then();
   })
  }
}
}
