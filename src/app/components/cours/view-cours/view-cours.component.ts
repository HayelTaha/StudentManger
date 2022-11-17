import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICours } from 'src/app/models/ICours';
import { IStudentEnroll } from 'src/app/models/IStudentEnroll';
import { AlertifyService } from 'src/app/service/alertify.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-view-cours',
  templateUrl: './view-cours.component.html',
  styleUrls: ['./view-cours.component.css']
})
export class ViewCoursComponent implements OnInit {
 public btnSaveShow:boolean = false;
  public loading:boolean=false;

  public courses:ICours[]=[];
  public errorMessage:string|null=null;
  public coursId:string|null=null;
  public studentEnroll:IStudentEnroll={}as IStudentEnroll;




  constructor(private activatedRoute:ActivatedRoute,
     private CourseService:CourseService,private router: Router,
    private alertify: AlertifyService) { }

     ngOnInit(): void {
      this.loadCourse();
      this.CourseService.getAllCourse().subscribe((data:ICours[])=>{
        this.courses=data;
      });
    }
    loadCourse(){
        this.loading=true;
        this.CourseService.getAllCourse().subscribe((data:ICours[])=>{
         this.courses=data;
         this.loading=false;
        },(error)=>{
         this.errorMessage=error;
         this.loading=false;
      })

  }
 public getStudentEnrollCourse(courseId:string){
    this.CourseService.studentEnrollCouse(courseId).subscribe((data:IStudentEnroll)=>{
      this.studentEnroll=data;
  })
}

  public deletCourse(coursId:number ){
    this.CourseService.deletCourse(coursId).subscribe((data:{})=>{
      this.alertify.success('Sucess Delete')
      this.loadCourse();
    },error=>this.alertify.error(error));
  }

  searchCourse(event: any) {
    let filteredCours: ICours[] = [];
    if (event === '') {
      this.courses = this.courses;
      this.loadCourse();
    } else {
      filteredCours = this.courses.filter((val, index) => {
        let targetKey = val.courseName.toLowerCase() + '' + val.teacherName.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.courses = filteredCours;
    }
  }

}
