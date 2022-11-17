import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStudent } from '../models/IStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  serverUrl=environment.apiUrl+'students/';
  public students:IStudent[]=[];

  constructor(private httpClient:HttpClient) { }
  //get all student
  public getAllStudent():Observable<IStudent[]>
  {
    return this.httpClient.get<IStudent[]>(this.serverUrl);
  }
     //get singl Student
  public getStudentById(studentId:string):Observable<IStudent>
  {
       return this.httpClient.get<IStudent>(this.serverUrl+studentId);
  }
  public creatStudent(student:IStudent):Observable<IStudent>
  {
    return this.httpClient.post<IStudent>(this.serverUrl,student);
  }
 public CreatStudent(model:any){
    return this.httpClient.post(this.serverUrl,model);
  }

 //delete student
 public deletStudent(studentId:string):Observable<{}>
 {
      return this.httpClient.delete<{}>(this.serverUrl+studentId);
 }

  //update student
  public updateStudent(student:IStudent,studentId:string):Observable<IStudent>
  {
  //  let dataUrl:string='${this.serverUrl}/students/${studentId}'
    return this.httpClient.put<IStudent>(this.serverUrl+studentId,student);
  }
  //error meth
  //  public handleError(error:HttpErrorResponse){
  //   let errorMessage:string='';
  //   if(error.error instanceof ErrorEvent){
  //     errorMessage='Error:${error.error.message}'

  //   }
  //   else{
  //     errorMessage='Status:${error.status}\n Message:${error.message}';
  //   }
  //   return throwError(errorMessage)
  // }
}
