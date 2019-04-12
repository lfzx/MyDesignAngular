import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {
  step: 0 | 1 | 2 = 1;

// 仅作为显示,不允许编辑职位时更改
companyName: string;
organizationCode: string;
companyDescription: string;
companyUrl: string;

  // 要对其进行填写
  city: string;

  postName: string;
  postWorkPlace: string;
  postSalary: string;
  numberOfRecruits: string;
  postJobType: '全职' | '兼职' | '实习';
  get resumeJobType_str() {
    return this.postJobType === '全职' ? '全职' : this.postJobType === '兼职' ? '兼职' : '实习';
  }

  academicRequirements: string;
  postExperience: string;
  postDescription: string;
  postTelephoneNumber: string;
  postEmail: string;

  // 仅作为传值，不显示
  companyId: string;

  again() {
    this.step = 0;
    this.postJobType = '全职';

    this.companyId = localStorage.getItem('uid');
    this.companyName = localStorage.getItem('name');
    this.organizationCode = localStorage.getItem('code');
    this.companyDescription = localStorage.getItem('description');
    this.companyUrl = localStorage.getItem('url');
  }

  constructor() {
    this.again();
  }
}