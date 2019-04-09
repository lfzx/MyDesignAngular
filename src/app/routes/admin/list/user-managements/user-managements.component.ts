import { Component, OnInit, TemplateRef, ChangeDetectorRef, ViewChild} from '@angular/core';
import { User } from 'app/entity/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { STChange, STData, STComponent, STColumn } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { map, tap } from 'rxjs/operators';
import { SwalService } from '@core/swal.service';


@Component({
  selector: 'app-admin-list-user-managements',
  templateUrl: './user-managements.component.html',
})
export class AdminListUserManagementsComponent implements OnInit {

  constructor(
              public changeDetectorRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private msg: SwalService,
              private client: HttpClient,
              private modal: NzModalService) {


  }

  private url = 'passport';
  rawData: any[];
  users: any[] = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;

  user: User;

  searchValue = '';

  addIsVisible = false;
  editIsVisible = false;

  addForm: FormGroup;
  editForm: FormGroup;

  isEdit = false;


  addOrdEditLoading = false;

  // checkBox
  checkbox = true;
  allChecked = false;
  indeterminate = false;
  checkedNumber = 0;
  disabledButton = true;

  // 排序
// tslint:disable-next-line: member-ordering
  sortValue = null;
  sortName = null;
// tslint:disable-next-line: member-ordering
  filterEnable = [
    {text: '启用', value: '1', byDefault: true},
    {text: '禁用', value: '0'}
  ];
  searchEnable: number;

  ngOnInit() {
    this.user = new User();

    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      isEnable: ['1', [Validators.required]],
      roleId: ['2'],
      password: [null, Validators.required]
    });

    this.editForm = this.fb.group({
      name: [null],
      email: [null, [Validators.email]],
      isEnable: ['1'],
      roleId: ['2'],
      password: [null]
    });
    this.getUsers();
  }

  refreshStatus(): void {
    const allChecked = this.users.every(value => value.checked === true);
    const allUnChecked = this.users.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.users.some(value => value.checked);
    this.checkedNumber = this.users.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.users.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  clearCheck() {
    this.checkedNumber = 0;
    this.allChecked = false;
    this.indeterminate = false;
    this.disabledButton = true;
  }


  // 获取数据
  getUsers(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.client.get(this.url).subscribe((data: any) => {
      this.loading = false;
      this.total = data.total;
      this.rawData = data.list;
      this.users = data.list; // 初始化
    });
  }

  sort(sort: { key: string, value: string }): void {
    this.users = this.rawData; // 获得原始数据中的值
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  updateFilter(searchEnable: number): void {
    this.users = this.rawData;
    this.searchEnable = searchEnable;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (this.searchEnable ? item.isEnable == this.searchEnable : true);
    const data = this.users.filter(item => filterFunc(item));

    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.users = data.sort((a, b) =>
       (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.users = data;
    }
  }


  // 删除单个数据
  delete(user: any): void {
    this.users = this.users.filter(h => h !== user);
    this.client
      .delete(`https://localhost:5001/api/passport/${user.id}`)
      .subscribe((item: any) =>{
        if (item.msg === 'ok') {
          this.msg.success(item.msg + '删除成功！');
          this.getUsers();
        } else {
        this.msg.error('删除失败!' + '/br' + item.msg);
        this.getUsers();
      }
    });
  }

  // 批量删除数据
  remove() {
    // const data = this.users.filter(value => value.checked).map(i => i.id);
    // this.client.delete(this.url).subscribe(() => {
    //   this.getUsers();
    //   this.clearCheck();
    // });
  }


  // 通过name查询
  searchUseByrName(): void{
    const filterFunc = (item) => {
      return (item.name.indexOf(this.searchValue) !== -1);
    };
    const data = this.users.filter(item => filterFunc(item));
    this.users = data.sort((a, b) =>
     (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }


  // 打开添加弹出框
  openAddOrEdit(u?: any) {

    if (u != null || u != undefined) {
      this.isEdit = true;
      // 匹配表单的值
      this.editForm.patchValue(u);
      this.user = u;
      this.editIsVisible = true;
    } else {
      // 重置表单
      this.addForm.reset();
      this.user = new User();
      this.user.isEnable = 0;
      this.isEdit = false;
      this.addForm.patchValue(this.user);
      this.addIsVisible = true;
    }

  }

  onAddOrEditCancel() {
    if (this.isEdit) {
      this.editIsVisible = false;
    } else {
      this.addIsVisible = false;
    }

  }

  onAddSubmit() {
// tslint:disable-next-line: forin
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity()
    }
    if (this.addForm.valid) {

      this.addOrdEditLoading = true;
      this.client.post('passport/register', this.addForm.value).subscribe(
        (item: any) => {
          if (item.msg === 'ok') {
            this.msg.success(item.msg + '添加成功！');
            this.modal.closeAll();
            this.addOrdEditLoading = false;
            this.getUsers();
          } else{
          this.msg.error('添加失败!' + '/br' + item.msg);
          this.modal.closeAll();
          this.addOrdEditLoading = false;
          this.getUsers();
        }
      });
    }
  }

  onEditSubmit() {
// tslint:disable-next-line: forin
    for (const i in this.editForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity()
    }
    if (this.editForm.valid) {
      this.addOrdEditLoading = true;
      let id = this.user.id;
      this.user = this.editForm.value;
      this.user.id = id;
      this.client.patch(`passport/${this.user.id}`, this.user).subscribe(
        (item: any) => {
          if (item.msg === 'ok') {
            this.msg.success('编辑成功！' + item.msg);
            this.modal.closeAll();
            this.addOrdEditLoading = false;
            this.getUsers();
          } else{
          this.msg.error('编辑失败!' + '/br' + item.msg);
          this.modal.closeAll();
          this.addOrdEditLoading = false;
          this.getUsers();
        }
        });
    }
  }
}
