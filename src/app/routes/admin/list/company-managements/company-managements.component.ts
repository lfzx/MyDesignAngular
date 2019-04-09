import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { SwalService } from '@core/swal.service';
import { HttpClient } from '@angular/common/http';
import { Company } from 'app/entity/company';

@Component({
  selector: 'app-admin-list-company-managements',
  templateUrl: './company-managements.component.html',
})
export class AdminListCompanyManagementsComponent implements OnInit {
  // url = `https://localhost:5001/api/passport/company`;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private msg: SwalService,
    private client: HttpClient,
    private modal: NzModalService) {


}

private url = 'passport/company';
rawData: any[];
users: any[] = [];
pageIndex = 1;
pageSize = 10;
total = 1;
loading = true;

user: Company;

searchValue = '';

addIsVisible = false;
editIsVisible = false;
detailIsVisible = false;

addForm: FormGroup;
editForm: FormGroup;
detailForm: FormGroup;

isEdit = false;


addOrdEditLoading = false;
authsLoading = false;

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
this.user = new Company();

this.addForm = this.fb.group({
companyName: [null, [Validators.required]],
organizationCode: [null, [Validators.required]],
companyUrl: [null],
personalNumber: [null, [Validators.required]],
companyDescription: [null, [Validators.required]],
email: [null, [Validators.required, Validators.email]],
status: ['1', [Validators.required]],
roleid: ['3'],
password: [null, Validators.required]
});

this.editForm = this.fb.group({
  companyName: [null, [Validators.required]],
  organizationCode: [null, [Validators.required]],
  companyUrl: [null],
  personalNumber: [null, [Validators.required]],
  companyDescription: [null, [Validators.required]],
  email: [null, [Validators.required, Validators.email]],
  status: ['1', [Validators.required]],
  roleid: ['3'],
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
const filterFunc = item => (this.searchEnable ? item.status == this.searchEnable : true);
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
.delete(`https://localhost:5001/api/passport/company/${user.companyId}`)
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
return (item.companyName.indexOf(this.searchValue) !== -1);
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
this.user = new Company();
this.user.status = 0;
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
this.client.post('passport/company/register', this.addForm.value).subscribe(
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
let id = this.user.companyId;
this.user = this.editForm.value;
this.user.companyId = id;
this.client.patch(`passport/company/${this.user.companyId}`, this.user).subscribe(
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

openDetail(data: any) {
  this.user = data;
  this.detailIsVisible = true;
  let flg = false;
  this.client.get(`passport/company/${this.user.companyId}`).subscribe(
    (items: any) => {
      if (items.msg === 'ok') {
        this.user = items.list;
      } else {
      this.msg.error('打开失败!' + '/br' + items.msg);
      this.modal.closeAll();
      }
    });
}

onSetCancel() {
  this.detailIsVisible = false;
}


}
