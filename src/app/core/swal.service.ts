import { Injectable } from '@angular/core';
import swal, {SweetAlertType} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  success(msg: string, time?: number) {
    this.show(msg, 'success', time);
  }

  error(msg: string, time?: number) {
    this.show(msg, 'error', time);
  }

  warning(msg: string, time?: number) {
    this.show(msg, 'warning', time);
  }

  info(msg: string, time?: number) {
    this.show(msg, 'info', time);
  }

  question(msg: string, time?: number) {
    this.show(msg, 'question', time);
  }

  show(msg: string, type: SweetAlertType, time?: number) {
    const tmp = time === undefined ? 1000 : time;
    swal.fire({
      type: type,
      title: msg,
      showConfirmButton: false,
      timer: tmp
    });
  }

}
