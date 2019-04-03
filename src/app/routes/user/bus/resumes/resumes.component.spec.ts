import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBusResumesComponent } from './resumes.component';

describe('UserBusResumesComponent', () => {
  let component: UserBusResumesComponent;
  let fixture: ComponentFixture<UserBusResumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBusResumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBusResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
