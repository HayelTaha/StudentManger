import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Teacher } from 'src/app/models/Teacher.model';
import { AlertifyService } from 'src/app/service/alertify.service';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addTeacherButton') addTeacherButton: any;

  title = 'TeacherManger';

  teacherForm: FormGroup;

  teachers: Teacher[];
  teachersToDisplay: Teacher[];

  teacherobj: Teacher = new Teacher;

  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'PhD',
  ];
   teacherId:any;
  btnUpdateShow:boolean = false;
  btnAddShow:boolean = true;
  constructor( private fb: FormBuilder,private teacherService: TeacherService,private alertify: AlertifyService)
  {
    this.teacherForm = fb.group({});
    this.teachers = [];
    this.teachersToDisplay = this.teachers;
  }
  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });

  this.loadingData();
  }
loadingData(){
  this.teacherService.getTeachers().subscribe((res) => {
    this.teachersToDisplay = res;
    this.teachers=res;
  });
}
  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }

  addTeacher() {

    let teacher: Teacher = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthdate: this.BirthDay.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    if(this.btnAddShow){
      this.teacherService.postTeacher(teacher).subscribe((res) => {
        this.teachers.unshift(res);
        this.clearForm();
       this.btnUpdateShow=false;
       this.loadingData();
       this.alertify.success('SucessFull Add');
      },error=>this.alertify.error(error));
    }
    if(this.btnUpdateShow){
      this.teacherService.putTeacher(teacher,this.teacherId).subscribe((res) => {
        this.teachers.unshift(res);
        this.clearForm();
        this.loadingData();
        this.alertify.success('SucessFull Update');
      },error=>this.alertify.error(error));
    }
  }
   removeTeacher(id: any) {
        this.teacherService.deleteTeacher(id).subscribe((res) => {
          this.alertify.success('SucessFull Delete');
          this.loadingData();
        },error=>this.alertify.error(error));
      }

  editTeacher(event: any) {

    this.setForm(event);
   // this.removeTeacher(event.id)
   this.UpdateShowBtn();
    this.addTeacherButton.nativeElement.click();
  }

  setForm(emp: Teacher) {
    this.teacherId=emp.id;
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.BirthDay.setValue(emp.birthdate);
    this.Gender.setValue(emp.gender);

    let educationIndex = 0;
    this.educationOptions.forEach((val, index) => {
      if (val === emp.education) educationIndex = index;
    });
    this.Education.setValue(educationIndex);

    this.Company.setValue(emp.company);
    this.JobExperience.setValue(emp.jobExperience);
    this.Salary.setValue(emp.salary);
    this.fileInput.nativeElement.value = '';
    this.SaveShowBtn();
  }

  searchTeachers(event: any) {
    let filteredTeachers: Teacher[] = [];

    if (event === '') {
      this.teachersToDisplay = this.teachers;
    } else {
      filteredTeachers = this.teachers.filter((val, index) => {
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.teachersToDisplay = filteredTeachers;
    }
  }
  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.fileInput.nativeElement.value = '';
  }

  public get FirstName(): FormControl {
    return this.teacherForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.teacherForm.get('lastname') as FormControl;
  }
  public get BirthDay(): FormControl {
    return this.teacherForm.get('birthday') as FormControl;
  }
  public get Gender(): FormControl {
    return this.teacherForm.get('gender') as FormControl;
  }
  public get Education(): FormControl {
    return this.teacherForm.get('education') as FormControl;
  }
  public get Company(): FormControl {
    return this.teacherForm.get('company') as FormControl;
  }
  public get JobExperience(): FormControl {
    return this.teacherForm.get('jobExperience') as FormControl;
  }
  public get Salary(): FormControl {
    return this.teacherForm.get('salary') as FormControl;
  }
  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnAddShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnAddShow = true;
  }
}
