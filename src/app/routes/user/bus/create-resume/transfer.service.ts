import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {
  step: 0 | 1 | 2 = 1;

  resumeAvatar: string;
  familyAddress: string;
  resumeTelephoneNumber: string;
  birth: string;

  resumeExperience: string;
  skill: string;

  resumePostName: string;
  resumeJobType: '全职' | '兼职' | '实习';
  get resumeJobType_str() {
    return this.resumeJobType === '全职' ? '全职' : this.resumeJobType === '兼职' ? '兼职' : '实习';
  }
  resumeSalary: string;
  resumeWorkPlace: string;

  userId: string;
  name: string;
  email: string;

  gender: string;
  school: string;
  entranceTime: string;
  graduationTime: string;
  profession: string;
  academic: string;

  again() {
    this.step = 0;
    this.resumeJobType = '全职';

    this.userId = localStorage.getItem('uid');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.gender = localStorage.getItem('gender');

    this.school = localStorage.getItem('school');
    this.entranceTime = localStorage.getItem('entranceTime');
    this.graduationTime = localStorage.getItem('graduationTime');
    this.profession = localStorage.getItem('profession');
    this.academic = localStorage.getItem('academic');
  }

  constructor() {
    this.again();
  }
}