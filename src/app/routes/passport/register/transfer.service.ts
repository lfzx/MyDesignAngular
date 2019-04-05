import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {
  step: 0 | 1 | 2 = 1;

  companyName: string;
  organizationCode: string;
  companyDescription: string;
  companyUrl: string;
  email: string;
  personalNumber: string;
  avatar: string;
  password: string;

  again() {
    this.step = 0;
  }

  constructor() {
    this.again();
  }
}
