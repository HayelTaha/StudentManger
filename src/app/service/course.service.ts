import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICours } from '../models/ICours';
import { IStudentEnroll } from '../models/IStudentEnroll';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  serverUrl=environment.apiUrl+'Courses/';
  public courses:ICours[]=[];
  public studentEnroll:IStudentEnroll[]=[];

  constructor(private httpClient:HttpClient) { }
  //get all Cours
  public getAllCourse():Observable<ICours[]>
  {
    return this.httpClient.get<ICours[]>(this.serverUrl).pipe(catchError(this.handleError));
  }
     //get singl Cours
  public getCourseById(courseId:string):Observable<ICours>
  {
       return this.httpClient.get<ICours>(this.serverUrl+courseId).pipe(catchError(this.handleError));
  }
  public creatCourse(courses:ICours):Observable<ICours>
  {
    return this.httpClient.post<ICours>(this.serverUrl,courses).pipe(catchError(this.handleError));
  }
 //delete Cours
 public deletCourse(coursId:number):Observable<{}>
 {
      return this.httpClient.delete<{}>(this.serverUrl+coursId).pipe(catchError(this.handleError));
 }
  //update Cours
  public updateCours(cours:ICours,courseId:string):Observable<ICours>
  {
  //  let dataUrl:string='${this.serverUrl}/courses/${coursId}'
    return this.httpClient.put<ICours>(this.serverUrl+courseId,cours).pipe(catchError(this.handleError));
  }
       //get singl Cours
  public studentEnrollCouse(courseId:string):Observable<IStudentEnroll>
  {
   return this.httpClient.get<IStudentEnroll>('https://localhost:7044/api/StudentEnrollCours/'+courseId).pipe(catchError(this.handleError));
  }
  //error meth
   public handleError(error:HttpErrorResponse){
    let errorMessage:string='';
    if(error.error instanceof ErrorEvent){
      errorMessage='Error:${error.error.message}'
    }
    else{
      errorMessage='Status:${error.status}\n Message:${error.message}';
    }
    return throwError(errorMessage)
  }

}
