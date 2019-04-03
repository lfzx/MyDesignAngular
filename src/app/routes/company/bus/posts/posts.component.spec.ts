import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyBusPostsComponent } from './posts.component';

describe('CompanyBusPostsComponent', () => {
  let component: CompanyBusPostsComponent;
  let fixture: ComponentFixture<CompanyBusPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBusPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBusPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
