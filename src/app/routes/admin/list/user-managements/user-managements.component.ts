import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { AdminUserManagementsEditComponent } from '../../userManagements/edit/edit.component';

@Component({
  selector: 'app-admin-list-user-managements',
  templateUrl: './user-managements.component.html',
})
export class AdminListUserManagementsComponent implements OnInit {
  url = `https://localhost:5001/api/passport`;
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '用户名'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '用户名', index: 'name' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '更新时间', type: 'date', index: 'updateTime' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/admin/form/${item.id}` },
        { text: '编辑', component: AdminUserManagementsEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
