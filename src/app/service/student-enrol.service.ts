import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStudentEnrollList } from '../models/IStudentEnrollList';

@Injectable({
  providedIn: 'root'
})
export class StudentEnrolService {
  serverUrl=environment.apiUrl+'StudentEnrollCours/';
  public studentEnrollList:IStudentEnrollList[]=[];

  constructor(private httpClient:HttpClient) { }


 public getEnrollmentList():Observable<IStudentEnrollList[]>
{
  return this.httpClient.get<IStudentEnrollList[]>(this.serverUrl).pipe(catchError(this.handleError));
}
// Create New EnrollMent
public creatStudentEnrollment(studentEnrollList:IStudentEnrollList):Observable<IStudentEnrollList>
{
  return this.httpClient.post<IStudentEnrollList>(this.serverUrl,studentEnrollList);
}
 //delete Cours
 public deletEnrollment(id:number):Observable<{}>
 {
      return this.httpClient.delete<{}>(this.serverUrl+id).pipe(catchError(this.handleError));
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

