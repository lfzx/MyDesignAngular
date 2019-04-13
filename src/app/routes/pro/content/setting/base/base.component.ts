import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient, SettingsService } from '@delon/theme';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BaseComponent implements OnInit {

  avatar = '';
  loading = false;
  avatarUrl: string;

  userLoading = true;
  user: any;

  selectedValue = 1;
  role = +localStorage.getItem('roleid');

  constructor(
    private http: _HttpClient,
    private client: HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    public settings: SettingsService,
  ) {}

  ngOnInit(): void {
    if (this.role == 1) {
      this.getAdmin();
    } else if (this.role  == 2){
     this.getUser();
    } else {
      this.getCompany();
    }
  }

  // #endregion

  getUser(){
    this.client.get(`passport/${localStorage.getItem('uid')}`)
    .subscribe((item: any) => {
      this.settings.setUser(item.list);
      this.user = this.settings.user;
      this.avatarUrl = this.settings.user.avatar;
      console.log(this.user);
    this.userLoading = false;
    this.cdr.detectChanges();
    });
  }

  getCompany(){
    this.client.get(`passport/company/${localStorage.getItem('uid')}`)
      .subscribe((item: any) => {
      this.settings.setUser(item.list);
      this.user = this.settings.user;
      this.avatarUrl = this.settings.user.avatar;
      console.log(this.user);
    this.userLoading = false;
    this.cdr.detectChanges();
  });
}

getAdmin(){
  this.client.get(`passport/administrator/${localStorage.getItem('uid')}`)
  .subscribe((data: any) => {
    this.settings.setUser(data.list);
    this.user = this.settings.user;
    this.avatarUrl = this.settings.user.avatar;
    console.log(this.user);
    this.userLoading = false;
    this.cdr.detectChanges();
});
}


  save() {
    console.log(this.user);
    this.msg.success(JSON.stringify(this.user));
    return false;
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error(`包含文件格式不正确，只支持 jpg 格式`);
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error(`图片必须小于2MB`);
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src);
        resolve(width === height && width >= 300);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.loading = false;
        this.avatarUrl = img;
      });
    }
  }



}
