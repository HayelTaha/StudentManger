import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/Teacher.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  baseUrl=environment.apiUrl+'teachers/';

  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http.get<Teacher[]>(this.baseUrl);
  }

  postTeacher(Teacher: Teacher) {
    return this.http.post<Teacher>(this.baseUrl, Teacher);
  }
  putTeacher(Teacher: Teacher ,id:any) {
    return this.http.put<Teacher>(this.baseUrl+id,Teacher);
  }
  deleteTeacher(id:string) {
    return this.http.delete(this.baseUrl+id);
  }
}
